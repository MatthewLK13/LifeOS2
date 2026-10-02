import test,{before,beforeEach,after} from 'node:test';
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

const now=new Date('2026-09-28T04:00:00Z'),secret='summary-session-secret-at-least-32-characters',pepper='summary-pepper-at-least-32-characters';
let pg,db,app,playerId,cookie;
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});playerId=stableId('player:minh-demo');cookie=`lifeos_session=${createSessionToken({playerId,role:'DEMO'},secret,now)}`;});
after(async()=>{await pg?.close();});
beforeEach(async()=>{await db.delete(schema.conversationSummaries).where(eq(schema.conversationSummaries.playerId,playerId));await db.delete(schema.conversations).where(eq(schema.conversations.playerId,playerId));});
const summaryOutput={summary:'Studied Java references and compared object identity with aliasing.',keyTopics:['Java references','Object identity']};
const provider={async *streamChat(){yield {text:'response'};},async generateStructured(request){assert.equal(request.purpose,'SUMMARY');return {data:summaryOutput,usage:{inputTokens:100,outputTokens:40},model:'gemini-3.5-flash-lite'};}};
function setup(){app=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:secret,PLAYER_CODE_PEPPER:pepper,GEMINI_API_KEY:'server-key'}),now:()=>now,aiProvider:provider});}
const send=(path,{method='GET',body}={})=>app.request('/api'+path,{method,headers:{cookie,...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});

test('starting a new conversation summarizes, closes the old session and opens an empty one',async()=>{
 setup();const conversationId=crypto.randomUUID();await db.insert(schema.conversations).values({id:conversationId,playerId,title:'Java references',status:'ACTIVE',startedAt:new Date(now-60_000),lastMessageAt:new Date(now-30_000)});await db.insert(schema.messages).values([{conversationId,role:'USER',content:'Explain object references and aliases.',status:'COMPLETE',createdAt:new Date(now-20_000)},{conversationId,role:'ASSISTANT',content:'A reference points to an object; aliases can refer to the same object.',status:'COMPLETE',createdAt:new Date(now-10_000)}]);
 const response=await send('/companion/conversations/new',{method:'POST'});assert.equal(response.status,201);const body=await response.json();assert.notEqual(body.conversation.id,conversationId);assert.equal(body.conversation.status,'ACTIVE');
 const [closed]=await db.select().from(schema.conversations).where(eq(schema.conversations.id,conversationId));assert.equal(closed.status,'CLOSED');assert.ok(closed.summarizedAt);const [summary]=await db.select().from(schema.conversationSummaries).where(eq(schema.conversationSummaries.conversationId,conversationId));assert.equal(summary.summary,summaryOutput.summary);
 const state=await (await send('/state')).json();assert.equal(state.conversation.id,body.conversation.id);assert.equal(state.conversation.messages.length,0);
});

test('retention trims message bodies only after summaries exist and caps summaries at twenty',async()=>{
 setup();const base=new Date(now.getTime()-10*60_000);for(let i=0;i<24;i++){const id=crypto.randomUUID(),time=new Date(base.getTime()+i*1000);await db.insert(schema.conversations).values({id,playerId,title:`Session ${i}`,status:'CLOSED',startedAt:time,lastMessageAt:time,closedAt:time,summarizedAt:time});await db.insert(schema.messages).values({conversationId:id,role:'USER',content:`Full text ${i}`,status:'COMPLETE',createdAt:time});await db.insert(schema.conversationSummaries).values({conversationId:id,playerId,summary:`Summary ${i}`,keyTopics:['Java'],createdAt:time});}
 const activeId=crypto.randomUUID();await db.insert(schema.conversations).values({id:activeId,playerId,title:'Current',status:'ACTIVE',startedAt:now,lastMessageAt:new Date(now.getTime()-1000)});await db.insert(schema.messages).values({conversationId:activeId,role:'USER',content:'What should I study next?',status:'COMPLETE',createdAt:new Date(now.getTime()-1000)});
 const response=await send('/companion/conversations/new',{method:'POST'});assert.equal(response.status,201);const {conversation:newConversation}=await response.json(),rows=await db.select().from(schema.conversationSummaries).where(eq(schema.conversationSummaries.playerId,playerId));assert.ok(rows.length<=20);
 const all=await db.select().from(schema.conversations).where(eq(schema.conversations.playerId,playerId)),ordered=all.sort((a,b)=>new Date(b.lastMessageAt)-new Date(a.lastMessageAt)),keep=new Set(ordered.slice(0,5).map(row=>row.id)),messages=await db.select().from(schema.messages);
 for(const conversation of all){if(!keep.has(conversation.id)){const remaining=messages.filter(message=>message.conversationId===conversation.id);assert.equal(remaining.length,0,`old summarized session ${conversation.title} (${conversation.id}) should release full text; latest=${ordered.slice(0,5).map(row=>row.title).join(',')}`);}}
 const newest=ordered.filter(row=>keep.has(row.id));for(const conversation of newest){if(conversation.id!==activeId&&conversation.id!==newConversation.id){assert.ok(messages.some(message=>message.conversationId===conversation.id));}}
});

test('a new conversation requires an authenticated session and leaves the active session unchanged when summary generation fails',async()=>{
 setup();const id=crypto.randomUUID();await db.insert(schema.conversations).values({id,playerId,title:'Keep this session',status:'ACTIVE',startedAt:now,lastMessageAt:now});await db.insert(schema.messages).values({conversationId:id,role:'USER',content:'Keep this message.',status:'COMPLETE',createdAt:now});
 const unauthorized=await app.request('/api/companion/conversations/new',{method:'POST'});assert.equal(unauthorized.status,401);
 app=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:secret,PLAYER_CODE_PEPPER:pepper,GEMINI_API_KEY:'server-key'}),now:()=>now,aiProvider:{async generateStructured(){throw new Error('unavailable');}}});const failed=await send('/companion/conversations/new',{method:'POST'});assert.equal(failed.status,502);const [unchanged]=await db.select().from(schema.conversations).where(eq(schema.conversations.id,id));assert.equal(unchanged.status,'ACTIVE');assert.equal((await db.select().from(schema.messages).where(eq(schema.messages.conversationId,id))).length,1);
});

test('a Companion message after thirty idle minutes summarizes the previous session before starting another',async()=>{
 setup();const staleId=crypto.randomUUID(),last=new Date(now.getTime()-31*60_000);await db.insert(schema.conversations).values({id:staleId,playerId,title:'Older study session',status:'ACTIVE',startedAt:last,lastMessageAt:last});await db.insert(schema.messages).values({conversationId:staleId,role:'USER',content:'I am learning how object references work in Java.',status:'COMPLETE',createdAt:last});
 const response=await send('/companion/chat',{method:'POST',body:{message:'How can I practice that idea with a small example?'}});assert.equal(response.status,200);await response.body.cancel();
 const [old]=await db.select().from(schema.conversations).where(eq(schema.conversations.id,staleId));assert.equal(old.status,'CLOSED');const sessions=await db.select().from(schema.conversations).where(eq(schema.conversations.playerId,playerId));assert.ok(sessions.some(row=>row.status==='ACTIVE'&&row.id!==staleId));const summaries=await db.select().from(schema.conversationSummaries).where(eq(schema.conversationSummaries.playerId,playerId));assert.ok(summaries.some(row=>row.conversationId===staleId));
});
