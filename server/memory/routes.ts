import {Hono} from 'hono';
import {and,eq} from 'drizzle-orm';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import * as s from '../db/schema.ts';
import {readSessionCookie,verifySessionToken} from '../player/identity.ts';

type Options={db?:any;env:AppEnv;now?:()=>Date};
function error(c:any,status:number,code:string,message:string){return c.json({error:{code,message}},status);}
export function createMemoryRoutes({db,env,now=()=>new Date()}:Options){
 const app=new Hono();const decision=z.object({}).strict();
 async function decide(c:any,status:'CONFIRMED'|'DISMISSED'){
  c.header('Cache-Control','no-store');if(!db||!env.SESSION_SECRET)return error(c,503,'MEMORY_UNAVAILABLE','Memory decisions are not configured for this server.');
  const session=verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now());if(!session)return error(c,401,'UNAUTHENTICATED','Restore your account before changing memories.');
  const body=decision.safeParse(await c.req.json().catch(()=>({})));if(!body.success)return error(c,400,'INVALID_REQUEST','This memory action does not accept additional data.');
  const id=z.string().uuid().safeParse(c.req.param('id'));if(!id.success)return error(c,404,'MEMORY_NOT_FOUND','That memory suggestion could not be found.');
  const [memory]=await db.select({id:s.memories.id,status:s.memories.status}).from(s.memories).where(and(eq(s.memories.id,id.data),eq(s.memories.playerId,session.playerId))).limit(1);
  if(!memory)return error(c,404,'MEMORY_NOT_FOUND','That memory suggestion could not be found.');
  if(memory.status===status)return c.json({memory:{id:memory.id,status:memory.status}});
  if(memory.status!=='PENDING')return error(c,409,'MEMORY_ALREADY_DECIDED','This memory suggestion was already decided.');
  const [updated]=await db.update(s.memories).set({status,decidedAt:now()}).where(and(eq(s.memories.id,memory.id),eq(s.memories.playerId,session.playerId),eq(s.memories.status,'PENDING'))).returning({id:s.memories.id,status:s.memories.status});
  if(!updated){const [latest]=await db.select({id:s.memories.id,status:s.memories.status}).from(s.memories).where(and(eq(s.memories.id,memory.id),eq(s.memories.playerId,session.playerId))).limit(1);if(latest?.status===status)return c.json({memory:latest});return error(c,409,'MEMORY_ALREADY_DECIDED','This memory suggestion was already decided.');}
  return c.json({memory:updated});
 }
 app.post('/memories/:id/confirm',c=>decide(c,'CONFIRMED'));
 app.post('/memories/:id/dismiss',c=>decide(c,'DISMISSED'));
 return app;
}
