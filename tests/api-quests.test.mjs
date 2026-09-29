import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase} from '../server/db/seed.ts';

let pg,db,app;
const pepper='player-code-test-pepper-at-least-32-characters';
const now=new Date('2026-09-28T04:00:00.000Z');
const env=loadEnv({NODE_ENV:'test',SESSION_SECRET:'session-test-secret-at-least-32-characters',PLAYER_CODE_PEPPER:pepper});
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});app=createApp({db,env,now:()=>now});});
after(async()=>{await pg?.close();});
const cookieOf=response=>(response.headers.get('set-cookie')||'').split(';')[0];
async function player(){const response=await app.request('/api/player',{method:'POST'});assert.ok([200,201].includes(response.status));return {cookie:cookieOf(response),playerId:(await response.json()).player.id};}
async function quest(playerId,{xpReward=25,status='AVAILABLE'}={}){
 const journeyId=randomUUID(),chapterId=randomUUID(),questId=randomUUID(),stepId=randomUUID();
 await db.insert(schema.journeys).values({id:journeyId,playerId,title:'Test journey',goal:'Practice',minutesPerDay:30,createdAt:now});
 await db.insert(schema.chapters).values({id:chapterId,journeyId,title:'Test chapter',orderIndex:0});
 await db.insert(schema.quests).values({id:questId,journeyId,playerId,chapterId,type:'PRACTICE',title:'Test quest',xpReward,minutes:15,status,orderIndex:0,source:'TEMPLATE'});
 await db.insert(schema.questSteps).values({id:stepId,questId,orderIndex:0,content:'Try an example'});
 return {journeyId,chapterId,questId,stepId};
}
const send=(path,{method='POST',cookie,body}={})=>app.request('/api'+path,{method,headers:{...(cookie?{cookie}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});

test('quest routes require a session and hide another player quest as missing',async()=>{
 const owner=await player(),other=await player(),ids=await quest(owner.playerId);
 assert.equal((await send(`/quests/${ids.questId}/start`)).status,401);
 assert.equal((await send(`/quests/${ids.questId}/start`,{cookie:other.cookie})).status,404);
});

test('quest start, step and note mutations validate input and keep ownership server-side',async()=>{
 const user=await player(),ids=await quest(user.playerId);
 const malformed=await app.request(`/api/quests/${ids.questId}/start`,{method:'POST',headers:{cookie:user.cookie,'content-type':'application/json'},body:'{' });assert.equal(malformed.status,400);
 assert.equal((await send(`/quests/${ids.questId}/start`,{cookie:user.cookie,body:{playerId:user.playerId,status:'COMPLETED'}})).status,400);
 assert.equal((await send(`/quests/${ids.questId}/start`,{cookie:user.cookie})).status,200);
 const badStep=await send(`/quests/${ids.questId}/steps/${ids.stepId}`,{method:'PATCH',cookie:user.cookie,body:{completed:true,xp:500}});assert.equal(badStep.status,400);
 const step=await send(`/quests/${ids.questId}/steps/${ids.stepId}`,{method:'PATCH',cookie:user.cookie,body:{completed:true}});assert.equal(step.status,200);assert.equal((await step.json()).step.completed,true);
 const huge=await send(`/quests/${ids.questId}/note`,{method:'PUT',cookie:user.cookie,body:{content:'x'.repeat(20001)}});assert.equal(huge.status,400);
 const note=await send(`/quests/${ids.questId}/note`,{method:'PUT',cookie:user.cookie,body:{content:'My observation'}});assert.equal(note.status,200);assert.equal((await note.json()).note.content,'My observation');
});

test('completion applies daily cap and streak once, ignores attempted reward injection',async()=>{
 const user=await player(),ids=await quest(user.playerId,{xpReward:25});
 await db.update(schema.profiles).set({xp:99,dailyXp:115,dailyXpDate:'2026-09-28',streak:3,longestStreak:5,lastQuestCompletedDate:'2026-09-27'}).where((await import('drizzle-orm')).eq(schema.profiles.playerId,user.playerId));
 await send(`/quests/${ids.questId}/start`,{cookie:user.cookie});
 const injected=await send(`/quests/${ids.questId}/complete`,{cookie:user.cookie,body:{xp:999999,coins:999999,rank:'Master'}});assert.equal(injected.status,400);
 const complete=await send(`/quests/${ids.questId}/complete`,{cookie:user.cookie});assert.equal(complete.status,200);const result=await complete.json();
 assert.equal(result.xpAwarded,5);assert.equal(result.progress.totalXp,104);assert.equal(result.progress.level,2);assert.equal(result.progress.dailyXp,120);assert.equal(result.progress.streak,4);assert.equal(result.progress.longestStreak,5);
 const repeated=await send(`/quests/${ids.questId}/complete`,{cookie:user.cookie});assert.equal((await repeated.json()).xpAwarded,0);
 assert.equal((await db.select().from(schema.xpLedger).where((await import('drizzle-orm')).eq(schema.xpLedger.playerId,user.playerId))).length,1);
});

test('daily rollover resets cap and a fresh completion starts the next streak day',async()=>{
 const user=await player(),ids=await quest(user.playerId,{xpReward:20});
 await db.update(schema.profiles).set({xp:50,dailyXp:120,dailyXpDate:'2026-09-27',streak:4,longestStreak:6,lastQuestCompletedDate:'2026-09-27'}).where((await import('drizzle-orm')).eq(schema.profiles.playerId,user.playerId));
 await send(`/quests/${ids.questId}/start`,{cookie:user.cookie});const response=await send(`/quests/${ids.questId}/complete`,{cookie:user.cookie});const body=await response.json();
 assert.equal(body.xpAwarded,20);assert.equal(body.progress.dailyXp,20);assert.equal(body.progress.streak,5);assert.equal(body.progress.longestStreak,6);
 const [profile]=await db.select().from(schema.profiles).where((await import('drizzle-orm')).eq(schema.profiles.playerId,user.playerId));assert.equal(profile.dailyXpDate,'2026-09-28');
});

test('concurrent completion requests create one XP award and one ledger entry',async()=>{
 const user=await player(),ids=await quest(user.playerId,{xpReward:25});await send(`/quests/${ids.questId}/start`,{cookie:user.cookie});
 const responses=await Promise.all([send(`/quests/${ids.questId}/complete`,{cookie:user.cookie}),send(`/quests/${ids.questId}/complete`,{cookie:user.cookie})]);
 const bodies=await Promise.all(responses.map(response=>response.json()));assert.ok(responses.every(response=>response.status===200));
 assert.equal(bodies.reduce((sum,body)=>sum+body.xpAwarded,0),25);
 assert.equal((await db.select().from(schema.xpLedger).where((await import('drizzle-orm')).eq(schema.xpLedger.playerId,user.playerId))).length,1);
});

test('completion still succeeds with zero XP when the daily cap is already full',async()=>{
 const user=await player(),ids=await quest(user.playerId,{xpReward:20});
 await db.update(schema.profiles).set({xp:140,dailyXp:120,dailyXpDate:'2026-09-28'}).where((await import('drizzle-orm')).eq(schema.profiles.playerId,user.playerId));
 await send(`/quests/${ids.questId}/start`,{cookie:user.cookie});const response=await send(`/quests/${ids.questId}/complete`,{cookie:user.cookie});const body=await response.json();
 assert.equal(response.status,200);assert.equal(body.quest.status,'COMPLETED');assert.equal(body.xpAwarded,0);assert.equal(body.progress.totalXp,140);assert.equal(body.progress.dailyXp,120);
});

test('skip awards no XP and completed quest notes cannot be rewritten',async()=>{
 const user=await player(),ids=await quest(user.playerId);
 const skipped=await send(`/quests/${ids.questId}/skip`,{cookie:user.cookie});assert.equal(skipped.status,200);assert.equal((await skipped.json()).quest.status,'SKIPPED');
 assert.equal((await send(`/quests/${ids.questId}/complete`,{cookie:user.cookie})).status,409);
 const next=await quest(user.playerId);await send(`/quests/${next.questId}/start`,{cookie:user.cookie});await send(`/quests/${next.questId}/complete`,{cookie:user.cookie});
 assert.equal((await send(`/quests/${next.questId}/note`,{method:'PUT',cookie:user.cookie,body:{content:'late edit'}})).status,409);
});
