import {Hono} from 'hono';
import {eq} from 'drizzle-orm';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import * as s from '../db/schema.ts';
import {readSessionCookie,verifySessionToken} from '../player/identity.ts';
import {completeQuest,skipQuest,startQuest,updateQuestNote,updateQuestStep} from './service.ts';

const emptyBody=z.object({}).strict();
const stepBody=z.object({completed:z.boolean()}).strict();
const noteBody=z.object({content:z.string().max(20_000).refine(value=>Buffer.byteLength(value,'utf8')<=20_000)}).strict();
const uuid=z.string().uuid();
type QuestRoutesOptions={db?:any;env:AppEnv;now?:()=>Date};
async function parseBody<T>(c:any,bodySchema:z.ZodType<T>):Promise<T|null>{
 let value:any={};const raw=await c.req.text();
 if(raw.trim()){try{value=JSON.parse(raw);}catch{return null;}}
 const parsed=bodySchema.safeParse(value);return parsed.success?parsed.data:null;
}

export function createQuestRoutes({db,env,now=()=>new Date()}:QuestRoutesOptions){
 const router=new Hono();
 const authenticate=async(c:any)=>{
  if(!db||!env.SESSION_SECRET)return {error:c.json({error:{code:'QUESTS_UNAVAILABLE',message:'Quest actions are not configured for this server.'}},503)};
  const session=verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now());
  if(!session)return {error:c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401)};
  const [player]=await db.select({status:s.players.status}).from(s.players).where(eq(s.players.id,session.playerId)).limit(1);
  if(!player||player.status!=='ACTIVE')return {error:c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401)};
  return {playerId:session.playerId};
 };
 const handle=async(c:any,bodySchema:z.ZodType,operation:(playerId:string,questId:string,body:any)=>Promise<any>)=>{
  c.header('Cache-Control','no-store');
  const auth=await authenticate(c);if('error'in auth)return auth.error;
  const questId=uuid.safeParse(c.req.param('id'));if(!questId.success)return c.json({error:{code:'QUEST_NOT_FOUND',message:'This quest is not available.'}},404);
  const body=await parseBody(c,bodySchema);
  if(body===null)return c.json({error:{code:'INVALID_REQUEST',message:'The quest request is invalid.'}},400);
  const result=await operation(auth.playerId,questId.data,body);
  return c.json(result.body,result.status);
 };
 router.post('/quests/:id/start',c=>handle(c,emptyBody,(playerId,id)=>startQuest(db,playerId,id,now())));
 router.post('/quests/:id/complete',c=>handle(c,emptyBody,(playerId,id)=>completeQuest(db,playerId,id,env.APP_TIMEZONE,now())));
 router.post('/quests/:id/skip',c=>handle(c,emptyBody,(playerId,id)=>skipQuest(db,playerId,id,now())));
 router.patch('/quests/:id/steps/:stepId',async c=>{
  c.header('Cache-Control','no-store');const auth=await authenticate(c);if('error'in auth)return auth.error;
  const questId=uuid.safeParse(c.req.param('id')),stepId=uuid.safeParse(c.req.param('stepId'));
  if(!questId.success||!stepId.success)return c.json({error:{code:'QUEST_STEP_NOT_FOUND',message:'This quest step is not available.'}},404);
  const body=await parseBody(c,stepBody);if(body===null)return c.json({error:{code:'INVALID_REQUEST',message:'The quest step request is invalid.'}},400);
  const result=await updateQuestStep(db,auth.playerId,questId.data,stepId.data,body.completed,now());return c.json(result.body,result.status);
 });
 router.put('/quests/:id/note',c=>handle(c,noteBody,(playerId,id,body)=>updateQuestNote(db,playerId,id,body.content,now())));
 return router;
}
