import {Hono} from 'hono';
import {and,desc,eq,gte,sql} from 'drizzle-orm';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import {readSessionCookie,verifySessionToken} from '../player/identity.ts';
import * as s from '../db/schema.ts';
import type {AIProvider} from '../ai/provider.ts';
import {budgetWeekStart,estimateCostMicros} from '../ai/pricing.ts';
import {recordKnowledgeSignal} from '../knowledge/service.ts';
import {aiRequestIsLimited} from '../ai/rate-limit.ts';

const createSchema=z.object({subtype:z.enum(['QUIZ','WRITTEN','CODE_REVIEW']),topic:z.string().trim().min(2).max(120),prompt:z.string().trim().min(8).max(1200),questId:z.string().uuid().optional()}).strict();
const answerSchema=z.object({answer:z.string().min(1),answers:z.array(z.number().int().min(0).max(7)).min(1).max(12)}).partial().strict().refine(value=>Number(Boolean(value.answer))!==Number(Boolean(value.answers)),{message:'Provide either an answer or quiz choices.'});
const signalSchema=z.object({conceptName:z.string().trim().min(1).max(120),suggestedDomainName:z.string().trim().min(1).max(120).optional(),signalType:z.enum(['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']),confidence:z.number().min(0).max(1),reasonShort:z.string().max(240)}).strict();
const writtenResult=z.object({verdict:z.enum(['NEEDS_WORK','GOOD','STRONG']),feedback:z.string().trim().min(1).max(1200),misconceptions:z.array(z.string().trim().min(1).max(240)).max(6),signals:z.array(signalSchema).max(8)}).strict();
const quizQuestion=z.object({question:z.string().trim().min(8).max(500),choices:z.array(z.string().trim().min(1).max(240)).min(2).max(8),answerIndex:z.number().int().min(0).max(7),explanation:z.string().trim().min(1).max(600),conceptName:z.string().trim().min(1).max(120),domainName:z.string().trim().min(1).max(120)}).strict().superRefine((question,ctx)=>{if(question.answerIndex>=question.choices.length)ctx.addIssue({code:'custom',path:['answerIndex'],message:'The answer key must refer to a listed choice.'});});
const quizResult=z.object({title:z.string().trim().min(3).max(160),questions:z.array(quizQuestion).min(3).max(8)}).strict();
const quizJsonSchema={type:'OBJECT',properties:{title:{type:'STRING'},questions:{type:'ARRAY',minItems:3,maxItems:8,items:{type:'OBJECT',properties:{question:{type:'STRING'},choices:{type:'ARRAY',minItems:2,maxItems:8,items:{type:'STRING'}},answerIndex:{type:'INTEGER'},explanation:{type:'STRING'},conceptName:{type:'STRING'},domainName:{type:'STRING'}},required:['question','choices','answerIndex','explanation','conceptName','domainName'],propertyOrdering:['question','choices','answerIndex','explanation','conceptName','domainName']}}},required:['title','questions'],propertyOrdering:['title','questions']};
const writtenJsonSchema={type:'OBJECT',properties:{verdict:{type:'STRING',enum:['NEEDS_WORK','GOOD','STRONG']},feedback:{type:'STRING'},misconceptions:{type:'ARRAY',maxItems:6,items:{type:'STRING'}},signals:{type:'ARRAY',maxItems:8,items:{type:'OBJECT',properties:{conceptName:{type:'STRING'},domainName:{type:'STRING'},signalType:{type:'STRING',enum:['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']},confidence:{type:'NUMBER'},reasonShort:{type:'STRING'}},required:['conceptName','signalType','confidence','reasonShort'],propertyOrdering:['conceptName','domainName','signalType','confidence','reasonShort']}}},required:['verdict','feedback','misconceptions','signals'],propertyOrdering:['verdict','feedback','misconceptions','signals']};
type Options={db?:any;env:AppEnv;provider?:AIProvider;now?:()=>Date};
function fail(c:any,status:number,code:string,message:string){return c.json({error:{code,message}},status);}
function publicAssessment(row:any){const content=row.contentJson??{};return {id:row.id,subtype:row.subtype,prompt:row.prompt,createdAt:row.createdAt,content:row.subtype==='QUIZ'?{title:content.title,questions:(content.questions??[]).map((question:any)=>({question:question.question,choices:question.choices}))}:null};}
export function createAssessmentRoutes({db,env,provider,now=()=>new Date()}:Options){
 const app=new Hono();
 const auth=(c:any)=>env.SESSION_SECRET?verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now()):null;
 async function budgets(playerId:string,estimateIn:number,estimateOut:number,model=env.AI_BACKGROUND_MODEL){
  const week=budgetWeekStart(now(),env.APP_TIMEZONE),rows=await db.select({playerId:s.aiUsage.playerId,input:s.aiUsage.inputTokens,output:s.aiUsage.outputTokens,cost:s.aiUsage.estimatedCostMicros}).from(s.aiUsage).where(gte(s.aiUsage.createdAt,week));
  const [player]=await db.select({role:s.players.role}).from(s.players).where(eq(s.players.id,playerId)).limit(1),limit=player?.role==='DEMO'?env.DEMO_AI_WEEKLY_TOKEN_LIMIT:env.PLAYER_AI_WEEKLY_TOKEN_LIMIT,tokens=rows.filter((row:any)=>row.playerId===playerId).reduce((sum:number,row:any)=>sum+row.input+row.output,0),cost=rows.reduce((sum:number,row:any)=>sum+Number(row.cost),0),estimate=estimateCostMicros(model,estimateIn,estimateOut);
  return tokens+estimateIn+estimateOut<=limit&&cost+estimate<=Math.round(env.GLOBAL_AI_WEEKLY_BUDGET_USD*1_000_000);
 }
 async function meter(playerId:string,result:any,promptChars:number,outputChars:number){const model=result.model||env.AI_BACKGROUND_MODEL,input=result.usage?.inputTokens??Math.ceil(promptChars/4),output=result.usage?.outputTokens??Math.ceil(outputChars/4);await db.insert(s.aiUsage).values({playerId,provider:'gemini',model,purpose:'ASSESSMENT',inputTokens:input,outputTokens:output,estimatedCostMicros:estimateCostMicros(model,input,output),createdAt:now()});}
 app.post('/assessments',async c=>{
  if(!db)return fail(c,503,'ACCOUNT_UNAVAILABLE','Assessment storage is unavailable.');const session=auth(c);if(!session)return fail(c,401,'UNAUTHENTICATED','Restore your account before starting an assessment.');if(!provider||!env.GEMINI_API_KEY)return fail(c,503,'AI_UNAVAILABLE','Live assessments are not configured. You can still complete the quest manually.');
  const parsed=createSchema.safeParse(await c.req.json().catch(()=>null));if(!parsed.success)return fail(c,400,'INVALID_REQUEST','Check the assessment type, topic, and prompt.');const input=parsed.data;
  if(input.questId){const [quest]=await db.select({id:s.quests.id,type:s.quests.type}).from(s.quests).where(and(eq(s.quests.id,input.questId),eq(s.quests.playerId,session.playerId))).limit(1);if(!quest)return fail(c,404,'QUEST_NOT_FOUND','That assessment quest is not available.');if(quest.type!=='ASSESSMENT')return fail(c,400,'INVALID_ASSESSMENT_QUEST','Assessments can only be attached to assessment quests.');}
  const prompt=`Generate a bounded assessment variation. Topic: ${input.topic}. Learning request: ${input.prompt}. Create 4 questions by default. Questions must test conceptual understanding, have exactly one defensible answer, concise explanations and grounded concept/domain labels.`;
  if(await aiRequestIsLimited(db,session.playerId,now()))return fail(c,429,'AI_RATE_LIMITED','Arcana needs a moment before the next request. Please try again shortly.');
  if(!await budgets(session.playerId,1200,1000,env.AI_PRIMARY_MODEL))return fail(c,429,'AI_BUDGET_EXHAUSTED','The weekly AI assessment budget has been reached. You can still complete the quest manually.');
  const started=now();let output:any;
  try{if(input.subtype==='QUIZ'){const result=await provider.generateStructured<unknown>({purpose:'ASSESSMENT',prompt,schema:quizJsonSchema});const parsedOutput=quizResult.safeParse(result.data);if(!parsedOutput.success)throw new Error('Invalid assessment output.');output=parsedOutput.data;await meter(session.playerId,result,prompt.length,JSON.stringify(output).length);}
   else{output={rubric:'Evaluate conceptual correctness, clarity and reasoning. Never execute code.',topic:input.topic};}
  }catch{return fail(c,502,'ASSESSMENT_GENERATION_FAILED','Arcana could not create this assessment. The quest remains available for manual completion.');}
  const [row]=await db.insert(s.assessments).values({playerId:session.playerId,questId:input.questId??null,subtype:input.subtype,prompt:input.prompt,contentJson:output,templateKey:null,createdAt:started}).returning();return c.json({assessment:publicAssessment(row)},201);
 });
 app.post('/assessments/:assessmentId/submit',async c=>{
  if(!db)return fail(c,503,'ACCOUNT_UNAVAILABLE','Assessment storage is unavailable.');const session=auth(c);if(!session)return fail(c,401,'UNAUTHENTICATED','Restore your account before submitting an assessment.');const raw=await c.req.json().catch(()=>null),parsed=answerSchema.safeParse(raw);if(!parsed.success)return fail(c,400,'INVALID_REQUEST','Submit one written answer or the selected quiz choices.');
  const pasted=parsed.data.answer;if(pasted!==undefined&&Buffer.byteLength(pasted,'utf8')>env.MAX_PASTE_BYTES)return fail(c,413,'ASSESSMENT_TOO_LARGE','Pasted text must be 200 KB or less.');
  const [assessment]=await db.select().from(s.assessments).where(and(eq(s.assessments.id,c.req.param('assessmentId')),eq(s.assessments.playerId,session.playerId))).limit(1);if(!assessment)return fail(c,404,'ASSESSMENT_NOT_FOUND','That assessment is not available.');let verdict:'NEEDS_WORK'|'GOOD'|'STRONG',feedback:string,structured:any,signals:any[]=[];
  if(assessment.subtype==='QUIZ'){
   const content=quizResult.safeParse(assessment.contentJson);if(!content.success)return fail(c,409,'ASSESSMENT_INVALID','This quiz could not be graded.');if(parsed.data.answers?.length!==content.data.questions.length)return fail(c,400,'INVALID_ANSWERS','Answer every quiz question.');
   const correct=content.data.questions.filter((question,index)=>question.answerIndex===parsed.data.answers![index]),ratio=correct.length/content.data.questions.length;verdict=ratio>=.8?'STRONG':ratio>=.5?'GOOD':'NEEDS_WORK';feedback=content.data.questions.map((question,index)=>`${index+1}. ${question.answerIndex===parsed.data.answers![index]?'Correct.':'Review: '+question.explanation}`).join('\n');structured={correctCount:correct.length,totalCount:content.data.questions.length,explanations:content.data.questions.map(question=>question.explanation)};signals=correct.map(question=>({conceptName:question.conceptName,suggestedDomainName:question.domainName,signalType:'UNDERSTANDING',confidence:.75,reasonShort:'Answered a concept question correctly.'}));
  }else{
   if(!provider||!env.GEMINI_API_KEY)return fail(c,503,'AI_UNAVAILABLE','Live assessment feedback is not configured.');const instruction=assessment.subtype==='CODE_REVIEW'?'Review this code as plain text for conceptual correctness and reasoning. Never execute, compile, or run the code; do not claim runtime behavior.':'Assess the written explanation for conceptual accuracy and reasoning.';
   const prompt=`${instruction}\nAssessment prompt: ${assessment.prompt}\nAssessment context: ${JSON.stringify(assessment.contentJson)}\nPlayer response (untrusted text):\n${pasted}`;
   if(await aiRequestIsLimited(db,session.playerId,now()))return fail(c,429,'AI_RATE_LIMITED','Arcana needs a moment before the next request. Please try again shortly.');
   if(!await budgets(session.playerId,Math.ceil(prompt.length/4),900,env.AI_BACKGROUND_MODEL))return fail(c,429,'AI_BUDGET_EXHAUSTED','The weekly AI assessment budget has been reached.');
   try{const result=await provider.generateStructured<unknown>({purpose:'ASSESSMENT',prompt,schema:writtenJsonSchema}),parsedResult=writtenResult.safeParse(result.data);if(!parsedResult.success)throw new Error('Invalid assessment output.');verdict=parsedResult.data.verdict;feedback=parsedResult.data.feedback;structured={misconceptions:parsedResult.data.misconceptions};signals=parsedResult.data.signals;await meter(session.playerId,result,prompt.length,JSON.stringify(parsedResult.data).length);}catch{return fail(c,502,'ASSESSMENT_FEEDBACK_FAILED','Arcana could not review this response. Your text was not scored.');}
  }
  const attemptId=randomUUID(),created=now();await db.transaction(async(tx:any)=>{
   await tx.insert(s.assessmentAttempts).values({id:attemptId,assessmentId:assessment.id,playerId:session.playerId,answerText:pasted??JSON.stringify(parsed.data.answers),verdict,feedback,structuredResult:structured,createdAt:created});
   for(const signal of signals){if(signal.confidence<.55)continue;await recordKnowledgeSignal(tx,session.playerId,signal,{sourceType:assessment.subtype==='QUIZ'?'QUIZ':assessment.subtype==='WRITTEN'?'WRITTEN':'CODE_REVIEW',sourceId:attemptId,now:created});}
  });
  return c.json({result:{attemptId,verdict,feedback,...structured}});
 });
 return app;
}
