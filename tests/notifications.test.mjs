import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {eq} from 'drizzle-orm';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import {createSessionToken} from '../server/player/identity.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase,stableId} from '../server/db/seed.ts';
import {localDateAt,previousLocalDate} from '../server/config/game-rules.ts';

const now=new Date('2026-09-28T04:00:00Z'),secret='notifications-session-secret-at-least-32-characters',pepper='notifications-pepper-at-least-32-characters',cronSecret='notifications-cron-secret-at-least-24-chars';let pg,db,app,playerId,cookie,pushCalls;
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});playerId=stableId('player:minh-demo');cookie=`lifeos_session=${createSessionToken({playerId,role:'DEMO'},secret,now)}`;pushCalls=[];app=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:secret,PLAYER_CODE_PEPPER:pepper,CRON_SECRET:cronSecret,VAPID_PUBLIC_KEY:'public-key',VAPID_PRIVATE_KEY:'private-key'}),now:()=>now,notificationPushSender:async(subscription,payload)=>{pushCalls.push({subscription,payload});}});});
after(async()=>{await pg?.close();});
const send=(path,{method='GET',body,withCookie=true,authorizedCron=false}={})=>app.request('/api'+path,{method,headers:{...(withCookie?{cookie}:{}),...(body===undefined?{}:{'content-type':'application/json'}),...(authorizedCron?{authorization:`Bearer ${cronSecret}`}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});

test('push subscriptions are session-scoped and cannot be claimed from another player',async()=>{
 const subscription={endpoint:'https://push.example/subscription/one',keys:{p256dh:'A'.repeat(44),auth:'B'.repeat(24)}};assert.equal((await send('/notifications/subscription',{method:'POST',body:subscription,withCookie:false})).status,401);assert.equal((await send('/notifications/subscription',{method:'POST',body:subscription})).status,201);assert.equal((await send('/notifications/subscription',{method:'POST',body:subscription})).status,201);
 const other=randomUUID();await db.insert(schema.players).values({id:other,codeDigest:'notifications-other-player'});await db.insert(schema.profiles).values({playerId:other,displayName:'Other',dailyXpDate:'2026-09-28'});const otherCookie=`lifeos_session=${createSessionToken({playerId:other,role:'GUEST'},secret,now)}`,claimed=await app.request('/api/notifications/subscription',{method:'POST',headers:{cookie:otherCookie,'content-type':'application/json'},body:JSON.stringify(subscription)});assert.equal(claimed.status,409);
 const disabled=await send('/notifications/subscription',{method:'DELETE',body:{endpoint:subscription.endpoint}});assert.equal(disabled.status,200);const [stored]=await db.select().from(schema.pushSubscriptions).where(eq(schema.pushSubscriptions.endpoint,subscription.endpoint));assert.ok(stored.disabledAt);
});

test('daily rollover is cron-protected, timezone-aware and idempotent',async()=>{
 await db.update(schema.profiles).set({dailyXp:73,dailyXpDate:'2026-09-27',streak:4,longestStreak:9,lastQuestCompletedDate:'2026-09-25'}).where(eq(schema.profiles.playerId,playerId));const unauthorized=await send('/cron/daily-rollover',{method:'GET'});assert.equal(unauthorized.status,401);
 const first=await send('/cron/daily-rollover',{method:'GET',authorizedCron:true});assert.equal(first.status,200);let [profile]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,playerId));assert.equal(profile.dailyXpDate,'2026-09-28');assert.equal(profile.dailyXp,0);assert.equal(profile.streak,0);const second=await send('/cron/daily-rollover',{method:'GET',authorizedCron:true});assert.equal((await second.json()).updated,0);[profile]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,playerId));assert.equal(profile.longestStreak,9);
});

test('streak date arithmetic uses calendar days across daylight-saving transitions',()=>{
 const afterSpringForward=new Date('2026-03-08T12:00:00Z'),localDay=localDateAt(afterSpringForward,'America/New_York');assert.equal(localDay,'2026-03-08');assert.equal(previousLocalDate(localDay),'2026-03-07');
});

test('morning reminders skip completed days and send at most one notification per local date',async()=>{
 const journeyId=(await db.select({id:schema.journeys.id}).from(schema.journeys).where(eq(schema.journeys.playerId,playerId)).limit(1))[0].id;await db.update(schema.profiles).set({dailyXpDate:'2026-09-27',lastQuestCompletedDate:'2026-09-27'}).where(eq(schema.profiles.playerId,playerId));await db.insert(schema.pushSubscriptions).values({playerId,endpoint:'https://push.example/subscription/reminder',p256dh:'C'.repeat(44),auth:'D'.repeat(24),createdAt:now});
 assert.equal((await send('/cron/morning-reminder',{method:'GET'})).status,401);await send('/cron/morning-reminder',{method:'GET',authorizedCron:true});assert.equal(pushCalls.length,1);const [saved]=await db.select().from(schema.notifications).where(eq(schema.notifications.playerId,playerId));assert.equal(saved.status,'SENT');assert.equal(saved.localDate,'2026-09-28');const again=await send('/cron/morning-reminder',{method:'GET',authorizedCron:true});assert.equal((await again.json()).sent,0);assert.equal(pushCalls.length,1);
 await db.update(schema.profiles).set({lastQuestCompletedDate:'2026-09-28'}).where(eq(schema.profiles.playerId,playerId));const skipped=await send('/cron/morning-reminder',{method:'GET',authorizedCron:true});assert.equal((await skipped.json()).skipped>=1,true);assert.equal(pushCalls.length,1);void journeyId;
});
