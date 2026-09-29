import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {eq} from 'drizzle-orm';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase} from '../server/db/seed.ts';

let pg,db,app;
const pepper='player-code-test-pepper-at-least-32-characters',now=new Date('2026-09-28T04:00:00.000Z');
const env=loadEnv({NODE_ENV:'test',SESSION_SECRET:'session-test-secret-at-least-32-characters',PLAYER_CODE_PEPPER:pepper});
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});app=createApp({db,env,now:()=>now});});
after(async()=>{await pg?.close();});
const send=(path,{method='GET',cookie,body}={})=>app.request('/api'+path,{method,headers:{...(cookie?{cookie}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
const cookieOf=response=>(response.headers.get('set-cookie')||'').split(';')[0];
async function player(){const response=await send('/player',{method:'POST'});return {id:(await response.json()).player.id,cookie:cookieOf(response)};}
async function manualJourney(playerId){
 const journeyId=randomUUID(),chapterId=randomUUID(),questIds=[randomUUID(),randomUUID(),randomUUID()];
 await db.insert(schema.journeys).values({id:journeyId,playerId,title:'Manual journey',goal:'Practice',status:'ACTIVE',version:1,minutesPerDay:60,templateKey:'python',createdAt:now});
 await db.insert(schema.chapters).values({id:chapterId,journeyId,title:'Manual chapter',orderIndex:0});
 for(let i=0;i<questIds.length;i++)await db.insert(schema.quests).values({id:questIds[i],journeyId,playerId,chapterId,type:'PRACTICE',title:`Activity ${i}`,xpReward:20,minutes:45,status:i===0?'AVAILABLE':i===1?'COMPLETED':'IN_PROGRESS',orderIndex:i,source:'TEMPLATE',...(i===1?{completedAt:now}:i===2?{startedAt:now}:{})});
 return {journeyId,chapterId,questIds};
}

test('journey proposal routes require session and validate template generation strictly',async()=>{
 assert.equal((await send('/journeys/generate',{method:'POST',body:{templateKey:'java',minutesPerDay:30,experienceLevel:'beginner'}})).status,401);
 const user=await player();
 assert.equal((await send('/journeys/generate',{method:'POST',cookie:user.cookie,body:{templateKey:'missing',minutesPerDay:30,experienceLevel:'beginner'}})).status,400);
 assert.equal((await send('/journeys/generate',{method:'POST',cookie:user.cookie,body:{templateKey:'java',minutesPerDay:30,experienceLevel:'beginner',playerId:user.id,xpReward:9999}})).status,400);
 const created=await send('/journeys/generate',{method:'POST',cookie:user.cookie,body:{templateKey:'java',minutesPerDay:30,experienceLevel:'beginner'}}),proposal=(await created.json()).proposal,other=await player();
 assert.equal((await send(`/proposals/${proposal.id}/accept`,{method:'POST',cookie:other.cookie})).status,404);
});

test('template generation remains a pending preview until explicit acceptance',async()=>{
 const user=await player(),generated=await send('/journeys/generate',{method:'POST',cookie:user.cookie,body:{templateKey:'java',minutesPerDay:45,experienceLevel:'beginner',goal:'Build a Java service'}});assert.equal(generated.status,201);
 const proposal=(await generated.json()).proposal;assert.equal(proposal.status,'PENDING');assert.equal(proposal.type,'CREATE');assert.equal(proposal.preview.chapters.length,10);
 const before=await (await send('/state',{cookie:user.cookie})).json();assert.equal(before.activeJourney,null);assert.deepEqual(before.journeys,[]);
 const list=await (await send('/journeys',{cookie:user.cookie})).json();assert.equal(list.proposals.length,1);
 const accepted=await send(`/proposals/${proposal.id}/accept`,{method:'POST',cookie:user.cookie});assert.equal(accepted.status,200);assert.equal((await accepted.json()).journey.version,2);
 const after=await (await send('/state',{cookie:user.cookie})).json();assert.equal(after.activeJourney.templateKey,'java');assert.equal(after.activeJourney.goal,'Build a Java service');assert.equal(after.activeJourney.chapters.length,10);assert.ok(after.quests.length>0);assert.match(after.quests[0].metadata.resource,/^https:\/\//);
 const revisions=await db.select().from(schema.roadmapRevisions).where(eq(schema.roadmapRevisions.journeyId,after.activeJourney.id));assert.equal(revisions.length,1);
});

test('rejecting a CREATE preview leaves no active journey',async()=>{
 const user=await player(),response=await send('/journeys/generate',{method:'POST',cookie:user.cookie,body:{templateKey:'python',minutesPerDay:30,experienceLevel:'some'}});const proposal=(await response.json()).proposal;
 const rejected=await send(`/proposals/${proposal.id}/reject`,{method:'POST',cookie:user.cookie});assert.equal(rejected.status,200);assert.equal((await rejected.json()).status,'REJECTED');
 const state=await (await send('/state',{cookie:user.cookie})).json();assert.equal(state.activeJourney,null);assert.deepEqual(state.journeys,[]);
});

test('pacing proposal splits only long AVAILABLE quests and conserves XP',async()=>{
 const user=await player(),fixture=await manualJourney(user.id);
 const proposalResponse=await send(`/journeys/${fixture.journeyId}/proposals`,{method:'POST',cookie:user.cookie,body:{type:'PACING',minutesPerDay:15}});assert.equal(proposalResponse.status,201);const proposal=(await proposalResponse.json()).proposal;
 const accepted=await send(`/proposals/${proposal.id}/accept`,{method:'POST',cookie:user.cookie});assert.equal(accepted.status,200);const body=await accepted.json();assert.equal(body.journey.version,2);
 const quests=await db.select().from(schema.quests).where(eq(schema.quests.journeyId,fixture.journeyId));
 assert.equal(quests.filter(q=>q.status==='COMPLETED').length,1);assert.equal(quests.filter(q=>q.status==='IN_PROGRESS').length,1);
 const parts=quests.filter(q=>q.title.startsWith('Activity 0'));assert.equal(parts.length,3);assert.ok(parts.every(q=>q.minutes<=15));assert.equal(parts.reduce((sum,q)=>sum+q.xpReward,0),20);
 assert.equal(quests.find(q=>q.id===fixture.questIds[1]).xpReward,20);assert.equal(quests.find(q=>q.id===fixture.questIds[2]).startedAt.toISOString(),now.toISOString());
 assert.equal(quests.find(q=>q.id===fixture.questIds[1]).orderIndex,1);assert.equal(quests.find(q=>q.id===fixture.questIds[2]).orderIndex,2);
 const revisions=await db.select().from(schema.roadmapRevisions).where(eq(schema.roadmapRevisions.journeyId,fixture.journeyId));assert.equal(revisions.length,1);assert.equal(revisions[0].versionTo,2);
});

test('stale pacing proposal conflicts and title/goal changes require acceptance',async()=>{
 const user=await player(),fixture=await manualJourney(user.id);
 const first=await send(`/journeys/${fixture.journeyId}/proposals`,{method:'POST',cookie:user.cookie,body:{type:'PACING',minutesPerDay:30}});
 const second=await send(`/journeys/${fixture.journeyId}/proposals`,{method:'POST',cookie:user.cookie,body:{type:'PACING',minutesPerDay:45}});
 const firstId=(await first.json()).proposal.id,secondId=(await second.json()).proposal.id;
 assert.equal((await send(`/proposals/${firstId}/accept`,{method:'POST',cookie:user.cookie})).status,200);
 const stale=await send(`/proposals/${secondId}/accept`,{method:'POST',cookie:user.cookie});assert.equal(stale.status,409);assert.equal((await stale.json()).error.code,'PROPOSAL_STALE');
 const modify=await send(`/journeys/${fixture.journeyId}/proposals`,{method:'POST',cookie:user.cookie,body:{type:'MODIFY',title:'A clearer title',goal:'Practice with projects'}});assert.equal(modify.status,201);const modifyId=(await modify.json()).proposal.id;
 const before=await db.select().from(schema.journeys).where(eq(schema.journeys.id,fixture.journeyId));assert.equal(before[0].title,'Manual journey');
 assert.equal((await send(`/proposals/${modifyId}/accept`,{method:'POST',cookie:user.cookie})).status,200);
 const after=await db.select().from(schema.journeys).where(eq(schema.journeys.id,fixture.journeyId));assert.equal(after[0].title,'A clearer title');assert.equal(after[0].goal,'Practice with projects');assert.equal(after[0].version,3);
});

test('journeys are unlimited and finish/archive preserve completed history',async()=>{
 const user=await player();
 for(let i=0;i<4;i++){const response=await send('/journeys/generate',{method:'POST',cookie:user.cookie,body:{templateKey:'python',minutesPerDay:30,experienceLevel:'beginner'}});const proposal=(await response.json()).proposal;assert.equal((await send(`/proposals/${proposal.id}/accept`,{method:'POST',cookie:user.cookie})).status,200);}
 const state=await (await send('/state',{cookie:user.cookie})).json();assert.equal(state.journeys.filter(j=>j.status==='ACTIVE').length,4);
 const activeId=state.activeJourney.id;const finished=await send(`/journeys/${activeId}/finish`,{method:'POST',cookie:user.cookie});assert.equal(finished.status,200);
 const afterFinish=await (await send('/state',{cookie:user.cookie})).json();assert.ok(afterFinish.quests.some(q=>q.journeyId===activeId));
 const another=afterFinish.journeys.find(j=>j.status==='ACTIVE');const archived=await send(`/journeys/${another.id}/archive`,{method:'POST',cookie:user.cookie});assert.equal(archived.status,200);
});

test('concurrent proposal acceptance creates one version and one revision',async()=>{
 const user=await player(),fixture=await manualJourney(user.id),created=await send(`/journeys/${fixture.journeyId}/proposals`,{method:'POST',cookie:user.cookie,body:{type:'PACING',minutesPerDay:30}}),proposal=(await created.json()).proposal;
 const responses=await Promise.all([send(`/proposals/${proposal.id}/accept`,{method:'POST',cookie:user.cookie}),send(`/proposals/${proposal.id}/accept`,{method:'POST',cookie:user.cookie})]);
 assert.deepEqual(responses.map(response=>response.status).sort(),[200,409]);
 assert.equal((await db.select().from(schema.roadmapRevisions).where(eq(schema.roadmapRevisions.journeyId,fixture.journeyId))).length,1);
});
