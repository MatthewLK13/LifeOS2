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

const now=new Date('2026-09-28T04:00:00Z'),secret='progression-session-secret-at-least-32-characters',pepper='progression-pepper-at-least-32-characters';let pg,db,app,playerId,cookie;
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});playerId=stableId('player:minh-demo');cookie=`lifeos_session=${createSessionToken({playerId,role:'DEMO'},secret,now)}`;app=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:secret,PLAYER_CODE_PEPPER:pepper}),now:()=>now});});
after(async()=>{await pg?.close();});
const send=(path,{method='GET',body,withCookie=true}={})=>app.request('/api'+path,{method,headers:{...(withCookie?{cookie}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});

test("achievement, milestone, and inventory reads require a session and return only the player's unlock state",async()=>{
 assert.equal((await send('/achievements',{withCookie:false})).status,401);const achievements=await (await send('/achievements')).json(),milestones=await (await send('/milestones')).json(),items=await (await send('/inventory')).json();assert.ok(achievements.achievements.some(item=>item.key==='first_steps'&&item.unlockedAt));assert.ok(milestones.milestones.some(item=>item.key==='quests_10'));assert.ok(items.items.some(item=>item.key==='avatar_scribe'&&item.owned));assert.ok(items.items.some(item=>item.key==='title_pathfinder'&&!item.owned));
});

test('inventory purchase and equipment are transactional, owner-scoped, and cosmetic-only',async()=>{
 const titleId=stableId('item:title_pathfinder'),before=await (await send('/state')).json(),locked=await send(`/inventory/${titleId}/equip`,{method:'POST'});assert.equal(locked.status,404);
 const unlocked=await send(`/inventory/${titleId}/unlock`,{method:'POST'});assert.equal(unlocked.status,201);assert.equal((await send(`/inventory/${titleId}/unlock`,{method:'POST'})).status,200);assert.equal((await send(`/inventory/${titleId}/equip`,{method:'POST'})).status,200);
 const after=await (await send('/state')).json();assert.equal(after.profile.titleItemId,titleId);assert.equal(after.progress.totalXp,before.progress.totalXp);assert.deepEqual(after.knowledge.progress,before.knowledge.progress);
 const paidId=randomUUID();await db.insert(schema.inventoryItems).values({id:paidId,key:'test_paid_frame',category:'FRAME',name:'Paid Frame',description:'Test',rarity:'RARE',priceCoins:100000,assetKey:'frames/test.svg',active:true});const coins=after.profile.coins,insufficient=await send(`/inventory/${paidId}/unlock`,{method:'POST'});assert.equal(insufficient.status,409);assert.equal((await (await send('/state')).json()).profile.coins,coins);
 const player2=randomUUID();await db.insert(schema.players).values({id:player2,codeDigest:'unrelated-player-digest'});await db.insert(schema.profiles).values({playerId:player2,displayName:'Other',dailyXpDate:'2026-09-28'});const cookie2=`lifeos_session=${createSessionToken({playerId:player2,role:'GUEST'},secret,now)}`,foreign=await app.request(`/api/inventory/${titleId}/equip`,{method:'POST',headers:{cookie:cookie2}});assert.equal(foreign.status,404);
});

test('new guest receives the three base avatars and starts equipped with the Scribe',async()=>{
 const response=await app.request('/api/player',{method:'POST'});assert.equal(response.status,201);const current=await app.request('/api/player/me',{headers:{cookie:response.headers.get('set-cookie').split(';')[0]}}),identity=await current.json(),stateResponse=await app.request('/api/state',{headers:{cookie:response.headers.get('set-cookie').split(';')[0]}}),state=await stateResponse.json();assert.equal(identity.player.displayName,'Scribe');assert.equal(state.inventory.filter(item=>item.category==='AVATAR').length,3);assert.equal(state.profile.avatarItemId,stableId('item:avatar_scribe'));
});
