import {Hono} from 'hono';
import {eq} from 'drizzle-orm';
import type {AppEnv} from '../config/env.ts';
import * as s from '../db/schema.ts';
import {readSessionCookie,verifySessionToken} from '../player/identity.ts';
import {getPlayerState} from './service.ts';

type StateRoutesOptions={db?:any;env:AppEnv;now?:()=>Date};
export function createStateRoutes({db,env,now=()=>new Date()}:StateRoutesOptions){
 const router=new Hono();
 router.get('/state',async c=>{
  c.header('Cache-Control','no-store');
  if(!db||!env.SESSION_SECRET)return c.json({error:{code:'STATE_UNAVAILABLE',message:'Player state is not configured for this server.'}},503);
  const session=verifySessionToken(readSessionCookie(c.req.header('cookie')),env.SESSION_SECRET,now());
  if(!session)return c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401);
  const [player]=await db.select({status:s.players.status}).from(s.players).where(eq(s.players.id,session.playerId)).limit(1);
  if(!player||player.status!=='ACTIVE')return c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401);
  const state=await getPlayerState(db,session.playerId,env.APP_TIMEZONE,now());
  if(!state)return c.json({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}},401);
  return c.json(state);
 });
 return router;
}
