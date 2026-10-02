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
import {seedDatabase} from '../server/db/seed.ts';
import {stableId} from '../server/db/seed.ts';

const pepper='ai-test-pepper-at-least-32-characters',secret='ai-test-session-secret-at-least-32-characters',now=new Date('2026-09-28T04:00:00.000Z');
let pg,db,app,playerId,cookie;
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});playerId=stableId('player:minh-demo');cookie=`lifeos_session=${createSessionToken({playerId,role:'DEMO'},secret,now)}`;});
after(async()=>{await pg?.close();});
function setup({provider,overrides={}}={}){const env=loadEnv({NODE_ENV:'test',SESSION_SECRET:secret,PLAYER_CODE_PEPPER:pepper,GEMINI_API_KEY:'server-key',...overrides});app=createApp({db,env,now:()=>now,aiProvider:provider});}
const send=(path,{method='GET',body}={})=>app.request('/api'+path,{method,headers:{cookie,...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
async function readEvents(response){const reader=response.body.getReader(),decoder=new TextDecoder();let raw='';while(true){const {done,value}=await reader.read();if(done)break;raw+=decoder.decode(value,{stream:true});}return raw;}

test('chat route persists user and only saves a complete assistant response with usage',async()=>{
 let captured;
 setup({provider:{async *streamChat(input){captured=input;yield {text:'A clear '};yield {text:'answer.',usage:{inputTokens:120,outputTokens:20}};}}});
 const response=await send('/companion/chat',{method:'POST',body:{message:'Explain Java classes'}});assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/text\/event-stream/);
 const events=await readEvents(response);assert.match(events,/event: token/);assert.match(events,/event: done/);assert.equal(captured.messages.at(-1).content,'Explain Java classes');assert.equal(captured.messages.filter(item=>item.content==='Explain Java classes').length,1);
 const messages=await db.select().from(schema.messages);assert.ok(messages.some(row=>row.role==='USER'&&row.content==='Explain Java classes'));assert.ok(messages.some(row=>row.role==='ASSISTANT'&&row.content==='A clear answer.'));
 const usage=await db.select().from(schema.aiUsage).where(eq(schema.aiUsage.playerId,playerId));assert.equal(usage.at(-1).inputTokens,120);assert.equal(usage.at(-1).outputTokens,20);assert.equal(usage.at(-1).purpose,'COMPANION');
});

test('chat failure keeps the user message but never stores a partial assistant reply',async()=>{
 setup({provider:{async *streamChat(){yield {text:'partial secret reply',usage:{inputTokens:50,outputTokens:4}};throw new Error('provider raw error');}}});
 const before=(await db.select().from(schema.messages)).length,usageBefore=(await db.select().from(schema.aiUsage)).length,response=await send('/companion/chat',{method:'POST',body:{message:'Tell me about RAG'}});const events=await readEvents(response);assert.match(events,/event: error/);const rows=await db.select().from(schema.messages),usage=await db.select().from(schema.aiUsage);assert.equal(rows.length,before+1);assert.equal(usage.length,usageBefore+1);assert.ok(rows.some(row=>row.role==='USER'&&row.content==='Tell me about RAG'));assert.ok(!rows.some(row=>row.content==='partial secret reply'));
});

test('meaningful learning chat stores validated signals and pending memories; only confirmed memory is exposed to later context',async()=>{
 let captured;
 setup({provider:{async *streamChat(){yield {text:'An interface defines a contract for implementations.'};yield {usage:{inputTokens:100,outputTokens:20}};},async generateStructured(request){captured=request;return {data:{signals:[{conceptName:'Interfaces',suggestedDomainName:'Java',signalType:'UNDERSTANDING',confidence:.85,reasonShort:'Explains the role of a contract.'}],memoryCandidates:[{text:'Learns best by building small projects.',confidence:.92}]},usage:{inputTokens:80,outputTokens:30},model:'gemini-3.5-flash-lite'};}}});
 const response=await send('/companion/chat',{method:'POST',body:{message:'Explain why Java interfaces are useful and how classes implement their contracts.'}});await readEvents(response);
 assert.equal(captured.purpose,'KNOWLEDGE_ANALYSIS');const signals=await db.select().from(schema.knowledgeSignals).where(eq(schema.knowledgeSignals.playerId,playerId));assert.ok(signals.some(row=>row.signalType==='UNDERSTANDING'&&row.sourceType==='CHAT'));
 const pending=(await db.select().from(schema.memories).where(eq(schema.memories.playerId,playerId))).find(row=>row.status==='PENDING');assert.ok(pending);
 const before=await (await send('/state')).json();assert.ok(before.memoryCandidates.some(item=>item.id===pending.id));
 await send(`/memories/${pending.id}/confirm`,{method:'POST'});let followupInput;
 setup({provider:{async *streamChat(input){followupInput=input;yield {text:'I will tailor that.'};yield {usage:{inputTokens:100,outputTokens:10}};}}});await readEvents(await send('/companion/chat',{method:'POST',body:{message:'How should I practice this concept with a project?'}}));assert.ok(followupInput.system.includes('Learns best by building small projects.'));
});

test('chat route requires a session, validates strict input, and budget rejection leaves health available',async()=>{
 setup({provider:{async *streamChat(){yield {text:'unused'};}},overrides:{DEMO_AI_WEEKLY_TOKEN_LIMIT:'1'}});
 const unauthorized=await app.request('/api/companion/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:'hi'})});assert.equal(unauthorized.status,401);
 assert.equal((await send('/companion/chat',{method:'POST',body:{message:'hello',playerId}})).status,400);
 const exhausted=await send('/companion/chat',{method:'POST',body:{message:'Explain recursion'}});assert.equal(exhausted.status,429);assert.equal((await exhausted.json()).error.code,'AI_PLAYER_BUDGET_EXHAUSTED');assert.equal((await send('/health')).status,200);
});

test('aborting an in-flight chat saves the user request but not partial assistant text',async()=>{
 setup({provider:{async *streamChat(_input,signal){yield {text:'unfinished words'};await new Promise(resolve=>signal.addEventListener('abort',resolve,{once:true}));throw new DOMException('Aborted','AbortError');}}});
 const abort=new AbortController(),request=app.request('/api/companion/chat',{method:'POST',headers:{cookie,'content-type':'application/json'},body:JSON.stringify({message:'Explain interfaces'}) ,signal:abort.signal}),response=await request,reader=response.body.getReader();
 const first=await reader.read();assert.match(new TextDecoder().decode(first.value),/unfinished words/);abort.abort();let remainder='';try{while(true){const item=await reader.read();if(item.done)break;remainder+=new TextDecoder().decode(item.value);}}catch{}
 const rows=await db.select().from(schema.messages);assert.ok(rows.some(row=>row.role==='USER'&&row.content==='Explain interfaces'));assert.ok(!rows.some(row=>row.content==='unfinished words'));assert.match(remainder,/event: aborted/);
});

test('memory suggestions are owner-scoped, require a decision, and cannot change after dismissal',async()=>{
 setup({provider:{async *streamChat(){yield {text:'unused'};}}});const sourceConversationId=(await db.select({id:schema.conversations.id}).from(schema.conversations).where(eq(schema.conversations.playerId,playerId)).limit(1))[0].id,first=randomUUID(),second=randomUUID();
 await db.insert(schema.memories).values([{id:first,playerId,text:'I learn best through projects.',status:'PENDING',sourceConversationId,createdAt:now},{id:second,playerId,text:'I have evenings free.',status:'PENDING',sourceConversationId,createdAt:now}]);
 const unauth=await app.request(`/api/memories/${first}/confirm`,{method:'POST'});assert.equal(unauth.status,401);
 const confirmed=await send(`/memories/${first}/confirm`,{method:'POST'});assert.equal(confirmed.status,200);assert.equal((await confirmed.json()).memory.status,'CONFIRMED');assert.equal((await send(`/memories/${first}/confirm`,{method:'POST'})).status,200);
 const dismissed=await send(`/memories/${second}/dismiss`,{method:'POST'});assert.equal((await dismissed.json()).memory.status,'DISMISSED');assert.equal((await send(`/memories/${second}/confirm`,{method:'POST'})).status,409);
 const guestResponse=await app.request('/api/player',{method:'POST'}),guest=await guestResponse.json(),guestCookie=guestResponse.headers.get('set-cookie').split(';')[0],foreign=await app.request(`/api/memories/${first}/confirm`,{method:'POST',headers:{cookie:guestCookie}});assert.equal(foreign.status,404);
});

test('AI roadmap generation keeps a validated preview pending until explicit acceptance',async()=>{
 const chapter=(index)=>({title:`Foundations ${index+1}`,summary:'Build practical understanding with a focused exercise.',lane:'Learning path',topics:['Sensors','Signals'],requires:index?[index-1]:[],optional:false,quests:[{title:'Study the concept',type:'Learn',difficulty:'C',minutes:20,prompt:'Explain how this concept works in a real project.',steps:['Read a short reference','Write a concise explanation'],description:'Explore this foundation.',topic:'Sensors'},{title:'Practice the concept',type:'Practice',difficulty:'B',minutes:25,prompt:'Apply the concept to the proposed device.',steps:['Sketch your design','Check one failure case'],description:'Use the foundation in a small task.',topic:'Signals'}]});
 setup({provider:{async *streamChat(){yield {text:'unused'};},async generateStructured(){return {data:{title:'ESP32 Sensor Projects',domainName:'ESP32 IoT',chapters:Array.from({length:6},(_,index)=>chapter(index))},usage:{inputTokens:5000,outputTokens:3000},model:'gemini-3.8-flash'};}}});
 const input={topic:'ESP32 sensor projects',goal:'Build a greenhouse monitor',experienceLevel:'beginner',minutesPerDay:30},created=await send('/journeys/generate-ai',{method:'POST',body:input});assert.equal(created.status,201);const proposal=(await created.json()).proposal;assert.equal(proposal.status,'PENDING');assert.equal(proposal.type,'CREATE');assert.equal(proposal.preview.trackName,'ESP32 IoT');assert.equal(proposal.preview.chapters.length,6);
 const before=await (await send('/state')).json();assert.equal(before.activeJourney.templateKey,'rag');assert.equal(before.journeys.length,1);
 const afterPreview=await (await send('/state')).json();assert.equal(afterPreview.activeJourney.id,before.activeJourney.id);assert.equal(afterPreview.journeys.length,before.journeys.length);
 const accepted=await send(`/proposals/${proposal.id}/accept`,{method:'POST',body:{}});assert.equal(accepted.status,200);const state=await (await send('/state')).json();assert.equal(state.activeJourney.templateKey,'esp32-iot');assert.equal(state.activeJourney.chapters.length,6);assert.equal(state.quests.length,before.quests.length+12);
 const second=await send('/journeys/generate-ai',{method:'POST',body:input}),secondProposal=(await second.json()).proposal,journeysBeforeReject=(await (await send('/state')).json()).journeys;assert.equal((await send(`/proposals/${secondProposal.id}/reject`,{method:'POST',body:{}})).status,200);const afterReject=await (await send('/state')).json();assert.equal(afterReject.activeJourney.id,state.activeJourney.id);assert.deepEqual(afterReject.journeys.map(item=>item.id),journeysBeforeReject.map(item=>item.id));
 const proposalCount=(await db.select().from(schema.roadmapProposals)).length;setup({provider:{async generateStructured(){return {data:{title:'Invalid roadmap',domainName:'Test',chapters:[]},model:'gemini-3.8-flash'};}}});const invalid=await send('/journeys/generate-ai',{method:'POST',body:input});assert.equal(invalid.status,502);assert.equal((await db.select().from(schema.roadmapProposals)).length,proposalCount);
});
