import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {eq} from 'drizzle-orm';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import {createSessionToken} from '../server/player/identity.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase,stableId} from '../server/db/seed.ts';

const secret='assessment-session-secret-at-least-32-characters',pepper='assessment-pepper-at-least-32-characters',now=new Date('2026-09-28T04:00:00Z');
let pg,db,app,playerId,cookie,captured=[];
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});playerId=stableId('player:minh-demo');cookie=`lifeos_session=${createSessionToken({playerId,role:'DEMO'},secret,now)}`;});
after(async()=>{await pg?.close();});
function setup(provider){const env=loadEnv({NODE_ENV:'test',SESSION_SECRET:secret,PLAYER_CODE_PEPPER:pepper,GEMINI_API_KEY:'server-key'});app=createApp({db,env,now:()=>now,aiProvider:provider});}
const send=(path,{method='GET',body,withCookie=true}={})=>app.request('/api'+path,{method,headers:{...(withCookie?{cookie}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
const assessmentProvider={async generateStructured(request){captured.push(request);if(request.purpose==='ASSESSMENT'&&request.prompt.includes('Generate'))return {data:{title:'Java reference types',questions:Array.from({length:3},(_,i)=>({question:`Which word creates object ${i+1}?`,choices:['new','class','this','void'],answerIndex:0,explanation:'new constructs an instance.',conceptName:'Object instantiation',domainName:'Java'}))},usage:{inputTokens:80,outputTokens:40},model:'gemini-3.5-flash-lite'};return {data:{verdict:'STRONG',feedback:'Your explanation connects identity and references clearly.',misconceptions:[],signals:[{conceptName:'Object references',suggestedDomainName:'Java',signalType:'UNDERSTANDING',confidence:.85,reasonShort:'Explains aliasing accurately.'}]},usage:{inputTokens:100,outputTokens:50},model:'gemini-3.5-flash-lite'};}};

test('assessment routes require account session and create a bounded AI quiz variation',async()=>{
 captured=[];setup(assessmentProvider);assert.equal((await send('/assessments',{method:'POST',body:{subtype:'QUIZ',topic:'Java references',prompt:'Check object references'},withCookie:false})).status,401);
 const response=await send('/assessments',{method:'POST',body:{subtype:'QUIZ',topic:'Java references',prompt:'Check object references'}});assert.equal(response.status,201);const {assessment}=await response.json();assert.equal(assessment.subtype,'QUIZ');assert.equal(assessment.content.questions.length,3);assert.equal(assessment.content.questions[0].answerIndex,undefined);assert.equal(captured[0].purpose,'ASSESSMENT');
});

test('AI short-window limit is shared with Companion usage and leaves core routes available',async()=>{
 captured=[];setup(assessmentProvider);await db.insert(schema.aiUsage).values(Array.from({length:10},(_,i)=>({playerId,provider:'gemini',model:'test-model',purpose:'COMPANION',inputTokens:1,outputTokens:1,estimatedCostMicros:1,createdAt:new Date(now.getTime()-i*1000)})));
 const limited=await send('/assessments',{method:'POST',body:{subtype:'QUIZ',topic:'Java',prompt:'Explain classes'}});assert.equal(limited.status,429);assert.equal((await limited.json()).error.code,'AI_RATE_LIMITED');assert.equal(captured.length,0);
 assert.equal((await send('/health')).status,200);
 await db.delete(schema.aiUsage).where(eq(schema.aiUsage.playerId,playerId));
});

test('quiz answers are deterministically graded by the server and persist an attempt and learning signal',async()=>{
 setup(assessmentProvider);const created=await (await send('/assessments',{method:'POST',body:{subtype:'QUIZ',topic:'Java references',prompt:'Check object references'}})).json();
 const wrong=await send(`/assessments/${created.assessment.id}/submit`,{method:'POST',body:{answers:[1,1,1]}});assert.equal(wrong.status,200);assert.equal((await wrong.json()).result.verdict,'NEEDS_WORK');
 const right=await send(`/assessments/${created.assessment.id}/submit`,{method:'POST',body:{answers:[0,0,0]}});const result=(await right.json()).result;assert.equal(result.verdict,'STRONG');assert.equal(result.correctCount,3);assert.equal(result.totalCount,3);
 const attempts=await db.select().from(schema.assessmentAttempts).where(eq(schema.assessmentAttempts.assessmentId,created.assessment.id));assert.equal(attempts.length,2);assert.ok(attempts.every(attempt=>attempt.structuredResult.correctCount!==undefined));
 const signals=await db.select().from(schema.knowledgeSignals).where(eq(schema.knowledgeSignals.playerId,playerId));assert.ok(signals.some(signal=>signal.sourceType==='QUIZ'&&signal.signalType==='UNDERSTANDING'));
});

test('written and code-review answers receive structured feedback without executing submitted code',async()=>{
 captured=[];setup(assessmentProvider);const code=await (await send('/assessments',{method:'POST',body:{subtype:'CODE_REVIEW',topic:'Java references',prompt:'Review this reference explanation'}})).json();
 const answer='class Demo {\n  Object first;\n  Object second;\n  void assign() { second = first; }\n}';const response=await send(`/assessments/${code.assessment.id}/submit`,{method:'POST',body:{answer}});assert.equal(response.status,200);assert.equal((await response.json()).result.verdict,'STRONG');assert.match(captured.at(-1).prompt,/Never execute, compile, or run/);assert.ok((await db.select().from(schema.assessmentAttempts)).some(attempt=>attempt.answerText===answer));
});

test('assessment pasted payloads over 200 KB are rejected in UTF-8 bytes',async()=>{
 setup(assessmentProvider);const written=await (await send('/assessments',{method:'POST',body:{subtype:'WRITTEN',topic:'Java',prompt:'Explain references'}})).json();
 const tooLarge='é'.repeat(102_401),response=await send(`/assessments/${written.assessment.id}/submit`,{method:'POST',body:{answer:tooLarge}});assert.equal(response.status,413);assert.equal((await response.json()).error.code,'ASSESSMENT_TOO_LARGE');
});

test('failed assessment generation creates no records and assessment quests remain manually completable',async()=>{
 setup({async generateStructured(){throw new Error('provider unavailable');}});const before=(await db.select().from(schema.assessments)).length,response=await send('/assessments',{method:'POST',body:{subtype:'QUIZ',topic:'Java',prompt:'Explain inheritance'}});assert.equal(response.status,502);assert.equal((await db.select().from(schema.assessments)).length,before);
 const state=await (await send('/state')).json(),quest=state.quests.find(item=>item.status==='AVAILABLE');assert.ok(quest);const complete=await send(`/quests/${quest.id}/complete`,{method:'POST',body:{}});assert.equal(complete.status,200);
});
