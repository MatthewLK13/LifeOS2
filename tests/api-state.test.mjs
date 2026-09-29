import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import {seedDatabase} from '../server/db/seed.ts';
import {stableId} from '../server/db/seed.ts';
import * as schema from '../server/db/schema.ts';
import {eq} from 'drizzle-orm';

let pg,db,app;
const pepper='player-code-test-pepper-at-least-32-characters';
const now=new Date('2026-09-28T04:00:00.000Z');
before(async()=>{pg=new PGlite();db=drizzle(pg);await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});app=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:'session-test-secret-at-least-32-characters',PLAYER_CODE_PEPPER:pepper}),now:()=>now});});
after(async()=>{await pg?.close();});
const send=(path,{method='GET',cookie}={})=>app.request('/api'+path,{method,headers:{...(cookie?{cookie}:{})}});
const sessionCookie=response=>(response.headers.get('set-cookie')||'').split(';')[0];

test('aggregate state requires a valid session and sends private no-store responses',async()=>{
 const missing=await send('/state');assert.equal(missing.status,401);assert.equal((await missing.json()).error.code,'SESSION_REQUIRED');assert.equal(missing.headers.get('cache-control'),'no-store');
 const bad=await send('/state',{cookie:'lifeos_session=bad.signature'});assert.equal(bad.status,401);
});

test('new guest receives complete empty personal state with the global knowledge catalog',async()=>{
 const created=await send('/player',{method:'POST'});const state=await send('/state',{cookie:sessionCookie(created)});assert.equal(state.status,200);
 const body=await state.json();assert.equal(body.profile.displayName,'Scribe');assert.equal(body.activeJourney,null);assert.deepEqual(body.journeys,[]);assert.deepEqual(body.quests,[]);
 assert.equal(body.knowledge.domains.length,20);assert.equal(body.knowledge.concepts.length,664);assert.deepEqual(body.knowledge.progress,[]);assert.equal(body.progress.totalXp,0);assert.equal(body.progress.dailyXpCap,120);
 assert.ok(Array.isArray(body.achievements));assert.ok(Array.isArray(body.milestones));assert.ok(Array.isArray(body.inventory));assert.deepEqual(body.preferences,{streak:true,inference:true,reducedMotion:false});
});

test('demo aggregate state contains seeded history but never backend evidence or credentials',async()=>{
 await db.insert(schema.messages).values({id:stableId('state-test:internal-message'),conversationId:stableId('conversation:minh:sample'),role:'SYSTEM',content:'internal prompt that must not reach the browser',status:'COMPLETE',createdAt:now});
 await db.update(schema.quests).set({metadata:{checks:[0],originalType:'Learn',privateEvaluationKey:'secret-rubric'}}).where(eq(schema.quests.id,stableId('quest:minh-rag:0:0')));
 await db.update(schema.chapters).set({metadata:{topics:['RAG Architecture'],requires:[],optional:false,secretPrompt:'hidden chapter instruction'}}).where(eq(schema.chapters.id,stableId('chapter:minh-rag:0')));
 const demo=await send('/player/demo',{method:'POST'});const state=await send('/state',{cookie:sessionCookie(demo)});assert.equal(state.status,200);
 const body=await state.json();assert.equal(body.profile.displayName,'Minh');assert.equal(body.progress.totalXp,250);assert.equal(body.activeJourney.templateKey,'rag');assert.ok(body.quests.some(q=>q.status==='COMPLETED'));assert.equal(body.knowledge.domains.length,20);assert.ok(body.knowledge.progress.length>0);
 assert.equal(body.achievements.length,3);assert.equal(body.milestones.length,2);assert.equal(body.inventory.length,3);assert.ok(body.conversation.messages.length>0);assert.equal(body.memoryCandidates.length,0);
 const keys=[];const collect=value=>{if(Array.isArray(value))return value.forEach(collect);if(value&&typeof value==='object')for(const [key,child] of Object.entries(value)){keys.push(key);collect(child);}};collect(body);
 assert.ok(!keys.some(key=>/codeDigest|confidence|signalCounts|evidence/i.test(key)));
 assert.doesNotMatch(JSON.stringify(body),/PLAYER_CODE|reserved-demo-identity/);
 assert.doesNotMatch(JSON.stringify(body),/privateEvaluationKey|secret-rubric|secretPrompt|hidden chapter instruction/);
 assert.ok(!body.conversation.messages.some(message=>message.role==='SYSTEM'||message.content.includes('internal prompt')));
});

test('daily XP rolls over by the player timezone without mutating the profile on read',async()=>{
 const demo=await send('/player/demo',{method:'POST'});const laterApp=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:'session-test-secret-at-least-32-characters',PLAYER_CODE_PEPPER:pepper}),now:()=>new Date('2026-09-29T00:30:00.000Z')});
 const later=await laterApp.request('/api/state',{headers:{cookie:sessionCookie(demo)}});assert.equal(later.status,200);assert.equal((await later.json()).progress.dailyXp,0);
 const sameDay=await send('/state',{cookie:sessionCookie(demo)});assert.equal((await sameDay.json()).progress.dailyXp,10);
});

test('aggregate state calculates domain rank from server concept levels and keeps it separate from XP level',async()=>{
 const created=await send('/player',{method:'POST'}),cookie=sessionCookie(created),player=(await (await send('/player/me',{cookie})).json()).player;
 for(let index=0;index<5;index++)await db.insert(schema.conceptProgress).values({playerId:player.id,conceptId:stableId(`concept:java-${index}`),level:'UNDERSTANDING',signalCounts:{UNDERSTANDING:2},firstSeenAt:now,updatedAt:now});
 const response=await send('/state',{cookie}),body=await response.json(),javaRank=body.knowledge.ranks.find(rank=>rank.domainId==='java');
 assert.equal(body.progress.level,1);assert.equal(javaRank.rank,'Adept');
});
