import {Hono} from 'hono';
import {eq,sql} from 'drizzle-orm';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import * as s from '../db/schema.ts';
import {seedDatabase,stableId} from '../db/seed.ts';

type Options={db?:any;env:AppEnv;now?:()=>Date};
const debugQuery=z.object({playerId:z.string().uuid()}).strict();
function fail(c:any,status:number,code:string,message:string){return c.json({error:{code,message}},status);}
export function createAdminRoutes({db,env,now=()=>new Date()}:Options){
 const app=new Hono();
 const authorized=(c:any)=>Boolean(env.ADMIN_SECRET&&c.req.header('authorization')===`Bearer ${env.ADMIN_SECRET}`);
 app.post('/admin/reset-demo',async c=>{
  if(!authorized(c))return fail(c,401,'ADMIN_UNAUTHORIZED','This admin action is not authorized.');
  if(!db||!env.PLAYER_CODE_PEPPER)return fail(c,503,'ADMIN_UNAVAILABLE','Demo reset is not configured.');
  const demoId=stableId('player:minh-demo');
  await db.transaction(async(tx:any)=>{
   await tx.delete(s.players).where(eq(s.players.id,demoId));
   await seedDatabase(tx,{codePepper:env.PLAYER_CODE_PEPPER!,now:now()});
  });
  return c.json({ok:true,playerId:demoId,resetAt:now().toISOString()});
 });
 app.get('/admin/debug-player',async c=>{
  if(!authorized(c))return fail(c,401,'ADMIN_UNAUTHORIZED','This admin action is not authorized.');
  if(!db||!env.PLAYER_CODE_PEPPER)return fail(c,503,'ADMIN_UNAVAILABLE','Player lookup is not configured.');
  const parsed=debugQuery.safeParse({playerId:c.req.query('playerId')});if(!parsed.success)return fail(c,400,'INVALID_PLAYER_ID','Provide a valid internal player ID.');
  const [player]=await db.select({id:s.players.id,role:s.players.role,status:s.players.status,createdAt:s.players.createdAt,lastActiveAt:s.players.lastActiveAt}).from(s.players).where(eq(s.players.id,parsed.data.playerId)).limit(1);
  if(!player)return fail(c,404,'PLAYER_NOT_FOUND','That player was not found.');
  const [profile]=await db.select({displayName:s.profiles.displayName,xp:s.profiles.xp,coins:s.profiles.coins,streak:s.profiles.streak}).from(s.profiles).where(eq(s.profiles.playerId,player.id)).limit(1);
  const [journeyCount]=await db.select({count:sql<number>`count(*)::int`}).from(s.journeys).where(eq(s.journeys.playerId,player.id));
  return c.json({player,profile:profile??null,journeyCount:journeyCount?.count??0});
 });
 return app;
}
