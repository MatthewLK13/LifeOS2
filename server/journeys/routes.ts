import {Hono} from 'hono';
import {eq,gte} from 'drizzle-orm';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import * as s from '../db/schema.ts';
import {readSessionCookie,verifySessionToken} from '../player/identity.ts';
import {acceptJourneyProposal,createJourneyProposal,generateJourneyProposal,listJourneys,rejectJourneyProposal,setJourneyStatus} from './service.ts';
import {generateCustomJourneyProposal} from './service.ts';
import {analyzeRoadmapAdaptation,generateCustomRoadmap} from '../ai/roadmap.ts';
import {budgetWeekStart,estimateCostMicros} from '../ai/pricing.ts';
import type {AIProvider} from '../ai/provider.ts';
import {TRACKS} from '../../shared/catalog/tracks.mjs';
import {CONCEPTS} from '../../shared/catalog/concepts.mjs';
import {aiRequestIsLimited} from '../ai/rate-limit.ts';
import {loadAdaptationContext} from './adaptation.ts';

const uuid=z.string().uuid(),emptyBody=z.object({}).strict();
const generateBody=z.object({templateKey:z.string().trim().min(1).max(80),minutesPerDay:z.number().int().min(15).max(120),experienceLevel:z.enum(['beginner','some','experienced']),title:z.string().trim().min(1).max(160).optional(),goal:z.string().trim().min(1).max(500).optional()}).strict();
const aiGenerateBody=z.object({topic:z.string().trim().min(2).max(120),goal:z.string().trim().min(3).max(240),experienceLevel:z.enum(['beginner','some','experienced']),minutesPerDay:z.number().int().min(15).max(120),learnerEvidence:z.array(z.object({conceptName:z.string().trim().min(2).max(120),masteryProbability:z.number().min(0).max(1),attempts:z.number().int().min(0).max(500),lastOutcome:z.enum(['CORRECT','INCORRECT']).optional()}).strict()).max(80).optional(),previousJourneyId:uuid.optional(),adaptation:z.object({advisorSummary:z.string().trim().min(20).max(700),learnerPreference:z.string().trim().min(2).max(500)}).strict().optional()}).strict();
const pacingBody=z.object({type:z.literal('PACING'),minutesPerDay:z.number().int().min(15).max(120)}).strict();
const modifyBody=z.object({type:z.literal('MODIFY'),title:z.string().trim().min(1).max(160).optional(),goal:z.string().trim().min(1).max(500).optional()}).strict().refine(value=>value.title!==undefined||value.goal!==undefined);
const proposalBody=z.discriminatedUnion('type',[pacingBody,modifyBody]);
type JourneyRoutesOptions={db?:any;env:AppEnv;now?:()=>Date;provider?:AIProvider};
async function parseBody<T>(c:any,schema:z.ZodType<T>):Promise<T|null>{let value:any={};const raw=await c.req.text();if(raw.trim()){try{value=JSON.parse(raw);}catch{return null;}}const parsed=schema.safeParse(value);return parsed.success?parsed.data:null;}

export function createJourneyRoutes({db,env,now=()=>new Date(),provider}:JourneyRoutesOptions){
 const router=new Hono();
 const authenticate=async(c:any)=>{
  if(!db||!env.SESSION_SECRET)return {error:c.json({error:{code:'JOURNEYS_UNAVAILABLE',message:'Journey actions are not configured for this server.'}},503)};
  const session=verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now());
  if(!session)return {error:c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401)};
  const [player]=await db.select({status:s.players.status}).from(s.players).where(eq(s.players.id,session.playerId)).limit(1);
  if(!player||player.status!=='ACTIVE')return {error:c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401)};
  return {playerId:session.playerId};
 };
 const respond=(c:any,result:any)=>c.json(result.body,result.status);
 router.get('/journeys',async c=>{c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;return c.json(await listJourneys(db,auth.playerId));});
 router.post('/journeys/generate',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  const body=await parseBody(c,generateBody);if(!body)return c.json({error:{code:'INVALID_REQUEST',message:'The journey request is invalid.'}},400);
  return respond(c,await generateJourneyProposal(db,auth.playerId,body,now()));
 });
 router.post('/journeys/advice',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  if(!provider||!env.GEMINI_API_KEY)return c.json({error:{code:'AI_UNAVAILABLE',message:'Personalized roadmap advice needs a configured AI provider.'}},503);
  const body=await parseBody(c,aiGenerateBody);if(!body)return c.json({error:{code:'INVALID_REQUEST',message:'The roadmap advice request is invalid.'}},400);
  const context=await loadAdaptationContext(db,auth.playerId,body.previousJourneyId,body.learnerEvidence||[]);
  if(!context)return c.json({error:{code:'JOURNEY_NOT_FOUND',message:'The previous roadmap is not available.'}},404);
  const time=now(),weekStart=budgetWeekStart(time,env.APP_TIMEZONE),[player]=await db.select({role:s.players.role}).from(s.players).where(eq(s.players.id,auth.playerId)).limit(1);
  if(await aiRequestIsLimited(db,auth.playerId,time))return c.json({error:{code:'AI_RATE_LIMITED',message:'Arcana needs a moment before the next request. Please try again shortly.'}},429);
  const usage:any[]=await db.select({playerId:s.aiUsage.playerId,input:s.aiUsage.inputTokens,output:s.aiUsage.outputTokens,cost:s.aiUsage.estimatedCostMicros}).from(s.aiUsage).where(gte(s.aiUsage.createdAt,weekStart));
  const playerTokens=usage.filter((row:any)=>row.playerId===auth.playerId).reduce((sum:number,row:any)=>sum+row.input+row.output,0),playerLimit=player?.role==='DEMO'?env.DEMO_AI_WEEKLY_TOKEN_LIMIT:env.PLAYER_AI_WEEKLY_TOKEN_LIMIT,globalCost=usage.reduce((sum:number,row:any)=>sum+Number(row.cost),0),estimatedInput=4000,estimatedOutput=1500,estimatedCost=estimateCostMicros(env.AI_PRIMARY_MODEL,estimatedInput,estimatedOutput),globalLimit=Math.round(env.GLOBAL_AI_WEEKLY_BUDGET_USD*1_000_000);
  if(playerTokens+estimatedInput+estimatedOutput>playerLimit||globalCost+estimatedCost>globalLimit)return c.json({error:{code:'AI_BUDGET_EXHAUSTED',message:'Arcana’s weekly AI capacity has been reached. Your current roadmap is unchanged.'}},429);
  try{const result=await analyzeRoadmapAdaptation(provider,{topic:body.topic,goal:body.goal,minutesPerDay:body.minutesPerDay,experienceLevel:body.experienceLevel,learnerEvidence:context.learnerEvidence,previousRoadmap:context.previousRoadmap},c.req.raw.signal),metered=result.usage||{inputTokens:estimatedInput,outputTokens:estimatedOutput};await db.insert(s.aiUsage).values({playerId:auth.playerId,provider:'gemini',model:result.model||env.AI_PRIMARY_MODEL,purpose:'ROADMAP',inputTokens:metered.inputTokens,outputTokens:metered.outputTokens,estimatedCostMicros:estimateCostMicros(result.model||env.AI_PRIMARY_MODEL,metered.inputTokens,metered.outputTokens),createdAt:time});return c.json({advice:result.advice});}
  catch{return c.json({error:{code:'AI_UNAVAILABLE',message:'Arcana could not analyze this learning evidence. Your current roadmap is unchanged.'}},502);}
 });
 router.post('/journeys/generate-ai',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  if(!provider||!env.GEMINI_API_KEY)return c.json({error:{code:'AI_UNAVAILABLE',message:'Custom roadmap generation needs a configured AI provider.'}},503);
  const body=await parseBody(c,aiGenerateBody);if(!body)return c.json({error:{code:'INVALID_REQUEST',message:'The custom roadmap request is invalid.'}},400);
  const context=await loadAdaptationContext(db,auth.playerId,body.previousJourneyId,body.learnerEvidence||[]);
  if(!context)return c.json({error:{code:'JOURNEY_NOT_FOUND',message:'The previous roadmap is not available.'}},404);
  const time=now(),weekStart=budgetWeekStart(time,env.APP_TIMEZONE),[player]=await db.select({role:s.players.role}).from(s.players).where(eq(s.players.id,auth.playerId)).limit(1);
  if(await aiRequestIsLimited(db,auth.playerId,time))return c.json({error:{code:'AI_RATE_LIMITED',message:'Arcana needs a moment before the next request. Please try again shortly.'}},429);
  const usage:any[]=await db.select({playerId:s.aiUsage.playerId,input:s.aiUsage.inputTokens,output:s.aiUsage.outputTokens,cost:s.aiUsage.estimatedCostMicros}).from(s.aiUsage).where(gte(s.aiUsage.createdAt,weekStart));
  const playerTokens=usage.filter((row:any)=>row.playerId===auth.playerId).reduce((sum:number,row:any)=>sum+row.input+row.output,0),playerLimit=player?.role==='DEMO'?env.DEMO_AI_WEEKLY_TOKEN_LIMIT:env.PLAYER_AI_WEEKLY_TOKEN_LIMIT,globalCost=usage.reduce((sum:number,row:any)=>sum+Number(row.cost),0),estimatedInput=18000,estimatedOutput=8000,estimatedCost=estimateCostMicros(env.AI_PRIMARY_MODEL,estimatedInput,estimatedOutput),globalLimit=Math.round(env.GLOBAL_AI_WEEKLY_BUDGET_USD*1_000_000);
  if(playerTokens+estimatedInput+estimatedOutput>playerLimit)return c.json({error:{code:'AI_PLAYER_BUDGET_EXHAUSTED',message:'Your weekly Companion allowance has been reached. Quests and progress remain available.'}},429);
  if(globalCost+estimatedCost>globalLimit)return c.json({error:{code:'AI_WEEKLY_BUDGET_EXHAUSTED',message:'Arcana’s AI capacity for this week has been reached. Your quests and progress are still available.'}},429);
  const tokens=body.topic.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(word=>word.length>2),catalog=TRACKS.map(track=>{const concepts=CONCEPTS.filter(concept=>concept.trackId===track.id),text=`${track.name} ${track.description} ${concepts.map(item=>item.name).join(' ')}`.toLowerCase(),score=tokens.reduce((sum,word)=>sum+(text.includes(word)?1:0),0);return {name:track.name,description:track.description,concepts:concepts.map(item=>item.name),score};}).sort((a,b)=>b.score-a.score).slice(0,6).map(({score,...domain})=>domain);
  let usageRecorded=false;
  try{const result=await generateCustomRoadmap(provider,{topic:body.topic,goal:body.goal,experienceLevel:body.experienceLevel,minutesPerDay:body.minutesPerDay,learnerEvidence:context.learnerEvidence,adaptation:body.adaptation},catalog,c.req.raw.signal,context.previousRoadmap),metered=result.usage||{inputTokens:estimatedInput,outputTokens:estimatedOutput};await db.insert(s.aiUsage).values({playerId:auth.playerId,provider:'gemini',model:result.model||env.AI_PRIMARY_MODEL,purpose:'ROADMAP',inputTokens:metered.inputTokens,outputTokens:metered.outputTokens,estimatedCostMicros:estimateCostMicros(result.model||env.AI_PRIMARY_MODEL,metered.inputTokens,metered.outputTokens),createdAt:time});usageRecorded=true;return respond(c,await generateCustomJourneyProposal(db,auth.playerId,result.draft,time));}
  catch(error){if(!usageRecorded)await db.insert(s.aiUsage).values({playerId:auth.playerId,provider:'gemini',model:env.AI_PRIMARY_MODEL,purpose:'ROADMAP',inputTokens:estimatedInput,outputTokens:0,estimatedCostMicros:estimateCostMicros(env.AI_PRIMARY_MODEL,estimatedInput,0),createdAt:time}).catch(()=>{});const message=(error as Error).message;if(message==='The generated roadmap did not pass validation.'||message==='An activity exceeds the selected daily time budget.'||message==='The generated roadmap repeated a previous problem.')return c.json({error:{code:'AI_OUTPUT_INVALID',message:'The generated roadmap did not pass validation. Please try again.'}},502);return c.json({error:{code:'AI_UNAVAILABLE',message:'Arcana could not prepare that roadmap right now. Your journeys remain unchanged.'}},502);}
 });
 router.post('/journeys/:id/proposals',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  const journeyId=uuid.safeParse(c.req.param('id'));if(!journeyId.success)return c.json({error:{code:'JOURNEY_NOT_FOUND',message:'This journey is not available.'}},404);
  const body=await parseBody(c,proposalBody);if(!body)return c.json({error:{code:'INVALID_REQUEST',message:'The proposal request is invalid.'}},400);
  return respond(c,await createJourneyProposal(db,auth.playerId,journeyId.data,body,now()));
 });
 router.post('/proposals/:id/accept',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  const proposalId=uuid.safeParse(c.req.param('id'));if(!proposalId.success)return c.json({error:{code:'PROPOSAL_NOT_FOUND',message:'This proposal is not available.'}},404);
  if(await parseBody(c,emptyBody)===null)return c.json({error:{code:'INVALID_REQUEST',message:'The proposal request is invalid.'}},400);
  return respond(c,await acceptJourneyProposal(db,auth.playerId,proposalId.data,now()));
 });
 router.post('/proposals/:id/reject',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  const proposalId=uuid.safeParse(c.req.param('id'));if(!proposalId.success)return c.json({error:{code:'PROPOSAL_NOT_FOUND',message:'This proposal is not available.'}},404);
  if(await parseBody(c,emptyBody)===null)return c.json({error:{code:'INVALID_REQUEST',message:'The proposal request is invalid.'}},400);
  return respond(c,await rejectJourneyProposal(db,auth.playerId,proposalId.data,now()));
 });
 const statusRoute=(action:'finish'|'archive')=>async(c:any)=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  const journeyId=uuid.safeParse(c.req.param('id'));if(!journeyId.success)return c.json({error:{code:'JOURNEY_NOT_FOUND',message:'This journey is not available.'}},404);
  if(await parseBody(c,emptyBody)===null)return c.json({error:{code:'INVALID_REQUEST',message:'The journey request is invalid.'}},400);
  return respond(c,await setJourneyStatus(db,auth.playerId,journeyId.data,action,now()));
 };
 router.post('/journeys/:id/archive',statusRoute('archive'));
 router.post('/journeys/:id/finish',statusRoute('finish'));
 return router;
}
