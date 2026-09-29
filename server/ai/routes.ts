import {Hono} from 'hono';
import {and,desc,eq,gte,sql} from 'drizzle-orm';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import {readSessionCookie,verifySessionToken} from '../player/identity.ts';
import * as s from '../db/schema.ts';
import type {AIProvider} from './provider.ts';
import {buildChatContext} from './context.ts';
import {budgetWeekStart,estimateCostMicros} from './pricing.ts';
import {analyzeLearningTurn,persistLearningAnalysis,shouldAnalyzeLearningMessage} from './analyzer.ts';
import {ConversationSummaryError,summarizeCloseAndRetain} from './conversations.ts';
import {aiRequestIsLimited} from './rate-limit.ts';

const chatSchema=z.object({message:z.string().trim().min(1).max(1600)}).strict();
const encoder=new TextEncoder();
function event(type:string,data:unknown){return encoder.encode(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);}
function error(c:any,status:number,code:string,message:string){return c.json({error:{code,message}},status);}
type Options={db?:any;env:AppEnv;provider?:AIProvider;now?:()=>Date};
export function createAIChatRoutes({db,env,provider,now=()=>new Date()}:Options){
 const app=new Hono();
 app.post('/companion/conversations/new',async c=>{
  c.header('Cache-Control','no-store');if(!db)return error(c,503,'ACCOUNT_UNAVAILABLE','Conversation storage is unavailable.');if(!env.SESSION_SECRET)return error(c,503,'AI_UNAVAILABLE','Player sessions are not configured.');const session=verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now());if(!session)return error(c,401,'UNAUTHENTICATED','Restore your account before starting a new conversation.');
  const [player]=await db.select({status:s.players.status}).from(s.players).where(eq(s.players.id,session.playerId)).limit(1);if(!player||player.status!=='ACTIVE')return error(c,401,'UNAUTHENTICATED','Restore your account before starting a new conversation.');
  let [active]=await db.select().from(s.conversations).where(and(eq(s.conversations.playerId,session.playerId),eq(s.conversations.status,'ACTIVE'))).orderBy(desc(s.conversations.lastMessageAt)).limit(1);
  if(active){try{await summarizeCloseAndRetain(db,provider,env,session.playerId,active,now());}catch(reason){const failure=reason instanceof ConversationSummaryError?reason:new ConversationSummaryError('The old conversation could not be closed safely.');return error(c,failure.status,failure.code,failure.message);}}
  const [conversation]=await db.insert(s.conversations).values({playerId:session.playerId,title:'New conversation',status:'ACTIVE',startedAt:now(),lastMessageAt:now()}).returning({id:s.conversations.id,status:s.conversations.status,startedAt:s.conversations.startedAt});return c.json({conversation},201);
 });
 app.post('/companion/chat',async c=>{
  c.header('Cache-Control','no-store');
  if(!db)return error(c,503,'AI_UNAVAILABLE','The account service is not configured. Your offline demo is still available.');
  if(!env.SESSION_SECRET)return error(c,503,'AI_UNAVAILABLE','Player sessions are not configured for this server.');
  const session=verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now());if(!session)return error(c,401,'UNAUTHENTICATED','Restore your account before chatting with Arcana.');
  if(!provider||!env.GEMINI_API_KEY)return error(c,503,'AI_UNAVAILABLE','Arcana’s live Companion is not configured yet. Your progress and quests remain available.');
  const parsed=chatSchema.safeParse(await c.req.json().catch(()=>null));if(!parsed.success)return error(c,400,'INVALID_REQUEST','Send a message between 1 and 1,600 characters.');
  const playerId=session.playerId,message=parsed.data.message,time=now(),week=budgetWeekStart(time,env.APP_TIMEZONE);
  if(await aiRequestIsLimited(db,playerId,time))return error(c,429,'AI_RATE_LIMITED','Arcana needs a moment before the next request. Please try again shortly.');
  const [player]=await db.select({id:s.players.id,status:s.players.status,role:s.players.role}).from(s.players).where(eq(s.players.id,playerId)).limit(1);if(!player||player.status!=='ACTIVE')return error(c,401,'UNAUTHENTICATED','Restore your account before chatting with Arcana.');
  const [profile]=await db.select().from(s.profiles).where(eq(s.profiles.playerId,playerId)).limit(1);if(!profile)return error(c,401,'UNAUTHENTICATED','Restore your account before chatting with Arcana.');
  const sinceMessages=await db.select({id:s.messages.id}).from(s.messages).innerJoin(s.conversations,eq(s.conversations.id,s.messages.conversationId)).where(and(eq(s.conversations.playerId,playerId),eq(s.messages.role,'USER'),gte(s.messages.createdAt,new Date(time.getTime()-60_000))));if(sinceMessages.length>=10)return error(c,429,'AI_RATE_LIMITED','Arcana needs a moment before the next message. Please try again shortly.');
  const allUsage:any[]=await db.select({playerId:s.aiUsage.playerId,input:s.aiUsage.inputTokens,output:s.aiUsage.outputTokens,cost:s.aiUsage.estimatedCostMicros}).from(s.aiUsage).where(gte(s.aiUsage.createdAt,week));
  const isDemo=player.role==='DEMO',playerLimit=isDemo?env.DEMO_AI_WEEKLY_TOKEN_LIMIT:env.PLAYER_AI_WEEKLY_TOKEN_LIMIT,playerTokens=allUsage.filter((row:any)=>row.playerId===playerId).reduce((sum:number,row:any)=>sum+row.input+row.output,0),globalCost=allUsage.reduce((sum:number,row:any)=>sum+Number(row.cost),0),model=env.AI_PRIMARY_MODEL;
  const estimatedInput=8000,estimatedOutput=1200,estimatedCost=estimateCostMicros(model,estimatedInput,estimatedOutput),globalLimit=Math.round(env.GLOBAL_AI_WEEKLY_BUDGET_USD*1_000_000);
  if(playerTokens+estimatedInput+estimatedOutput>playerLimit)return error(c,429,'AI_PLAYER_BUDGET_EXHAUSTED','Your weekly Companion allowance has been reached. Quests and progress remain available.');
  if(globalCost+estimatedCost>globalLimit)return error(c,429,'AI_WEEKLY_BUDGET_EXHAUSTED','Arcana’s AI capacity for this week has been reached. Your quests and progress are still available.');
  let [conversation]=await db.select().from(s.conversations).where(and(eq(s.conversations.playerId,playerId),eq(s.conversations.status,'ACTIVE'))).orderBy(desc(s.conversations.lastMessageAt)).limit(1);
  if(conversation&&time.getTime()-new Date(conversation.lastMessageAt).getTime()>=30*60_000){try{await summarizeCloseAndRetain(db,provider,env,playerId,conversation,time);conversation=undefined;}catch(reason){const failure=reason instanceof ConversationSummaryError?reason:new ConversationSummaryError('The old conversation could not be summarized.');return error(c,failure.status,failure.code,failure.message);}}
  if(!conversation){const [created]=await db.insert(s.conversations).values({playerId,title:message.slice(0,80),status:'ACTIVE',startedAt:time,lastMessageAt:time}).returning();conversation=created;}
  const [userMessage]=await db.insert(s.messages).values({conversationId:conversation.id,role:'USER',content:message,status:'COMPLETE',createdAt:time}).returning();await db.update(s.conversations).set({lastMessageAt:time}).where(eq(s.conversations.id,conversation.id));
  const [journey]=await db.select({title:s.journeys.title,goal:s.journeys.goal}).from(s.journeys).where(and(eq(s.journeys.playerId,playerId),eq(s.journeys.status,'ACTIVE'))).orderBy(desc(s.journeys.createdAt)).limit(1);
  const [memoryRows,messageRows,summaryRows,progressRows]=await Promise.all([
   db.select({text:s.memories.text}).from(s.memories).where(and(eq(s.memories.playerId,playerId),eq(s.memories.status,'CONFIRMED'))).orderBy(desc(s.memories.createdAt)).limit(12),
   db.select({id:s.messages.id,role:s.messages.role,content:s.messages.content}).from(s.messages).where(and(eq(s.messages.conversationId,conversation.id),eq(s.messages.status,'COMPLETE'),sql`${s.messages.role} IN ('USER','ASSISTANT')`)).orderBy(desc(s.messages.createdAt)).limit(21),
   db.select({summary:s.conversationSummaries.summary}).from(s.conversationSummaries).where(eq(s.conversationSummaries.playerId,playerId)).orderBy(desc(s.conversationSummaries.createdAt)).limit(3),
   db.select({name:s.concepts.name,level:s.conceptProgress.level}).from(s.conceptProgress).innerJoin(s.concepts,eq(s.concepts.id,s.conceptProgress.conceptId)).where(eq(s.conceptProgress.playerId,playerId)).orderBy(desc(s.conceptProgress.updatedAt)).limit(20)
  ]);
  const context=buildChatContext({displayName:profile.displayName,timezone:profile.timezone,journey,knowledge:progressRows.map((row:any)=>`${row.name}: ${row.level}`),memories:memoryRows.map((row:any)=>row.text),summaries:summaryRows.map((row:any)=>row.summary),messages:messageRows.filter((row:any)=>row.id!==userMessage.id).reverse() as any,currentMessage:message});
  const abort=new AbortController();if(c.req.raw.signal.aborted)abort.abort();else c.req.raw.signal.addEventListener('abort',()=>abort.abort(),{once:true});
  let disconnected=false;const responseBody=new ReadableStream<Uint8Array>({start(controller){
   void(async()=>{let completeText='',usage:{inputTokens:number;outputTokens:number}|undefined,usageRecorded=false;
    try{
     for await(const chunk of provider.streamChat(context,abort.signal)){if(abort.signal.aborted)throw new DOMException('Aborted','AbortError');if(chunk.text){completeText+=chunk.text;controller.enqueue(event('token',{text:chunk.text}));}if(chunk.usage)usage=chunk.usage;}
     if(abort.signal.aborted)throw new DOMException('Aborted','AbortError');
     const finishedAt=now(),[assistantMessage]=await db.insert(s.messages).values({conversationId:conversation.id,role:'ASSISTANT',content:completeText,status:'COMPLETE',inputTokens:usage?.inputTokens??null,outputTokens:usage?.outputTokens??null,createdAt:finishedAt}).returning({id:s.messages.id});await db.update(s.conversations).set({lastMessageAt:finishedAt}).where(eq(s.conversations.id,conversation.id));
     const measured=usage||{inputTokens:estimatedInput,outputTokens:estimatedOutput};await db.insert(s.aiUsage).values({playerId,provider:'gemini',model,purpose:'COMPANION',inputTokens:measured.inputTokens,outputTokens:measured.outputTokens,estimatedCostMicros:estimateCostMicros(model,measured.inputTokens,measured.outputTokens),createdAt:finishedAt});usageRecorded=true;
     if(completeText&&shouldAnalyzeLearningMessage(message)){
      try{
       const analysisModel=env.AI_BACKGROUND_MODEL,estimatedAnalysisInput=Math.ceil((context.system.length+message.length+completeText.length+1200)/4),estimatedAnalysisOutput=600,usageNow=await db.select({playerId:s.aiUsage.playerId,input:s.aiUsage.inputTokens,output:s.aiUsage.outputTokens,cost:s.aiUsage.estimatedCostMicros}).from(s.aiUsage).where(gte(s.aiUsage.createdAt,week)),spentTokens=usageNow.filter((row:any)=>row.playerId===playerId).reduce((sum:number,row:any)=>sum+row.input+row.output,0),spentCost=usageNow.reduce((sum:number,row:any)=>sum+Number(row.cost),0),estimate=estimateCostMicros(analysisModel,estimatedAnalysisInput,estimatedAnalysisOutput);
       if(spentTokens+estimatedAnalysisInput+estimatedAnalysisOutput<=playerLimit&&spentCost+estimate<=globalLimit){
        const result=await analyzeLearningTurn(provider,{userMessage:message,assistantMessage:completeText},abort.signal),metered=result.usage||{inputTokens:estimatedAnalysisInput,outputTokens:estimatedAnalysisOutput},usageAt=now();await db.insert(s.aiUsage).values({playerId,provider:'gemini',model:result.model||analysisModel,purpose:'KNOWLEDGE_ANALYSIS',inputTokens:metered.inputTokens,outputTokens:metered.outputTokens,estimatedCostMicros:estimateCostMicros(result.model||analysisModel,metered.inputTokens,metered.outputTokens),createdAt:usageAt});await persistLearningAnalysis(db,{playerId,conversationId:conversation.id,sourceId:userMessage.id,analysis:result,now:usageAt});
       }
      }catch{/* Analyzer failures never turn a completed Companion reply into a failed chat. */}
     }
     controller.enqueue(event('done',{messageId:assistantMessage?.id}));
    }catch(err){const aborted=abort.signal.aborted||(err as Error)?.name==='AbortError';if(!disconnected)controller.enqueue(event(aborted?'aborted':'error',{message:aborted?'Response stopped. Your message was saved; you can retry.':'Arcana could not finish this reply. Your message was saved; please retry.'}));}
    finally{if(!usageRecorded){const measured=usage||{inputTokens:estimatedInput,outputTokens:Math.max(1,Math.ceil(completeText.length/4))};await db.insert(s.aiUsage).values({playerId,provider:'gemini',model,purpose:'COMPANION',inputTokens:measured.inputTokens,outputTokens:measured.outputTokens,estimatedCostMicros:estimateCostMicros(model,measured.inputTokens,measured.outputTokens),createdAt:now()}).catch(()=>{});}try{controller.close();}catch{}}
   })();
  },cancel(){disconnected=true;abort.abort();}});
  return new Response(responseBody,{status:200,headers:{'content-type':'text/event-stream; charset=utf-8','cache-control':'no-cache, no-transform','x-accel-buffering':'no'}});
 });
 return app;
}
