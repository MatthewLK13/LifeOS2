import {Hono} from 'hono';
import {eq,inArray,lt,sql} from 'drizzle-orm';
import {createHmac} from 'node:crypto';
import {z} from 'zod';
import type {AppEnv} from '../config/env.ts';
import {localDateAt} from '../config/game-rules.ts';
import * as s from '../db/schema.ts';
import {createSessionToken,digestPlayerCode,formatPlayerCode,generatePlayerCode,isPlayerCode,makeSessionCookie,readSessionCookie,verifySessionToken} from './identity.ts';

const restoreSchema=z.object({code:z.string().trim().min(10).max(32)}).strict();
const WINDOW_MS=15*60*1000;
const RESTORE_LIMIT=5;
type RoutesOptions={db?:any;env:AppEnv;now?:()=>Date;clientIp?:(headers:Headers)=>string;trustVercelProxy?:boolean};
type PlayerView={id:string;displayName:string;role:string};

export function trustedClientIp(headers:Headers,env:AppEnv,trustVercelProxy=false):string{
 // Vercel overwrites x-vercel-forwarded-for to prevent client IP spoofing. Other production hosts fail closed unless they inject a trusted resolver.
 if(env.NODE_ENV!=='production')return 'local-development';
 return trustVercelProxy?headers.get('x-vercel-forwarded-for')?.trim()||'unknown-production-client':'unknown-production-client';
}

function error(c:any,status:number,code:string,message:string){return c.json({error:{code,message}},status);}
function unavailable(c:any){return error(c,503,'IDENTITY_UNAVAILABLE','Player sessions are not configured for this server.');}
function readPlayerSession(c:any,secret:string,now:Date){
 return verifySessionToken(readSessionCookie(c.req.header('cookie')),secret,now);
}
function setSession(c:any,player:PlayerView,env:AppEnv,now:Date){
 const token=createSessionToken({playerId:player.id,role:player.role},env.SESSION_SECRET!,now);
 c.header('Set-Cookie',makeSessionCookie(token,{production:env.NODE_ENV==='production'}),{append:true});
}
function publicPlayer(player:PlayerView){return {id:player.id,displayName:player.displayName,role:player.role};}
async function findPlayer(db:any,playerId:string):Promise<PlayerView|null>{
 const [row]=await db.select({id:s.players.id,role:s.players.role,status:s.players.status,displayName:s.profiles.displayName}).from(s.players).innerJoin(s.profiles,eq(s.profiles.playerId,s.players.id)).where(eq(s.players.id,playerId)).limit(1);
 if(!row||row.status!=='ACTIVE')return null;
 return {id:row.id,role:row.role,displayName:row.displayName};
}
async function issueGuest(db:any,env:AppEnv,now:Date):Promise<{player:PlayerView;code:string}|null>{
 for(let attempt=0;attempt<3;attempt++){
  const raw=generatePlayerCode(),codeDigest=digestPlayerCode(raw,env.PLAYER_CODE_PEPPER!);
  const created=await db.transaction(async(tx:any)=>{
   const [player]=await tx.insert(s.players).values({codeDigest,role:'GUEST',isDemo:false,status:'ACTIVE'}).onConflictDoNothing().returning({id:s.players.id,role:s.players.role});
   if(!player)return null;
   const avatars=await tx.select({id:s.inventoryItems.id,key:s.inventoryItems.key}).from(s.inventoryItems).where(inArray(s.inventoryItems.key,['avatar_scribe','avatar_explorer','avatar_artificer']));if(avatars.length)await tx.insert(s.playerInventory).values(avatars.map((item:any)=>({playerId:player.id,itemId:item.id,unlockedAt:now}))).onConflictDoNothing();
   const avatarId=avatars.find((item:any)=>item.key==='avatar_scribe')?.id??null;
   await tx.insert(s.profiles).values({playerId:player.id,displayName:'Scribe',xp:0,coins:0,dailyXp:0,dailyXpDate:localDateAt(now,env.APP_TIMEZONE),streak:0,longestStreak:0,timezone:env.APP_TIMEZONE,avatarItemId:avatarId,preferences:{streak:true,inference:true,reducedMotion:false}});
   return player;
  });
  if(created)return {player:{...created,displayName:'Scribe'},code:formatPlayerCode(raw)};
 }
 return null;
}
async function restoreBucket(db:any,env:AppEnv,now:Date,ip:string):Promise<number>{
 const key=digestPlayerCodeForRateLimit(ip,env.PLAYER_CODE_PEPPER!);
 const cutoff=new Date(now.getTime()-WINDOW_MS);
 await db.delete(s.restoreAttempts).where(lt(s.restoreAttempts.updatedAt,new Date(now.getTime()-24*60*60*1000)));
 const [row]=await db.insert(s.restoreAttempts).values({bucketKey:key,windowStartedAt:now,attempts:1,updatedAt:now}).onConflictDoUpdate({
  target:s.restoreAttempts.bucketKey,
  set:{
   attempts:sql`CASE WHEN ${s.restoreAttempts.windowStartedAt} <= ${cutoff} THEN 1 ELSE ${s.restoreAttempts.attempts}+1 END`,
   windowStartedAt:sql`CASE WHEN ${s.restoreAttempts.windowStartedAt} <= ${cutoff} THEN ${now} ELSE ${s.restoreAttempts.windowStartedAt} END`,
   updatedAt:now
  }
 }).returning({attempts:s.restoreAttempts.attempts});
 return row.attempts;
}
function digestPlayerCodeForRateLimit(ip:string,pepper:string){
 // Reuse HMAC so restore telemetry stores no client IP in plaintext.
 return createHmac('sha256',pepper).update(`restore-rate:v1:${ip}`).digest('hex');
}

export function createPlayerRoutes(options:RoutesOptions){
 const router=new Hono();
 const {db,env,now=()=>new Date(),trustVercelProxy=false,clientIp=(headers)=>trustedClientIp(headers,env,trustVercelProxy)}=options;
 const ready=()=>Boolean(db&&env.SESSION_SECRET&&env.PLAYER_CODE_PEPPER);
 router.post('/player',async c=>{
  c.header('Cache-Control','no-store');
  if(!ready())return unavailable(c);
  const time=now(),session=readPlayerSession(c,env.SESSION_SECRET!,time);
  if(session){const player=await findPlayer(db,session.playerId);if(player){await db.update(s.players).set({lastActiveAt:time}).where(eq(s.players.id,player.id));return c.json({player:publicPlayer(player),isNew:false});}}
  const guest=await issueGuest(db,env,time);if(!guest)return error(c,503,'PLAYER_CREATE_FAILED','A new player could not be created. Please try again.');
  setSession(c,guest.player,env,time);
  return c.json({player:publicPlayer(guest.player),playerCode:guest.code,isNew:true},201);
 });
 router.post('/player/restore',async c=>{
  c.header('Cache-Control','no-store');
  if(!ready())return unavailable(c);
  const body=restoreSchema.safeParse(await c.req.json().catch(()=>null));if(!body.success)return error(c,400,'INVALID_REQUEST','Provide a valid Player Code.');
  const time=now(),ip=clientIp(c.req.raw.headers);
  const attempts=await restoreBucket(db,env,time,ip);
  if(attempts>RESTORE_LIMIT)return error(c,429,'RESTORE_RATE_LIMITED','Too many restore attempts. Please wait 15 minutes and try again.');
  if(!isPlayerCode(body.data.code))return error(c,401,'PLAYER_CODE_INVALID','That Player Code could not be restored. Check it and try again.');
  const digest=digestPlayerCode(body.data.code,env.PLAYER_CODE_PEPPER!);
  const [match]=await db.select({id:s.players.id,role:s.players.role,status:s.players.status}).from(s.players).where(eq(s.players.codeDigest,digest)).limit(1);
  if(!match||match.status!=='ACTIVE')return error(c,401,'PLAYER_CODE_INVALID','That Player Code could not be restored. Check it and try again.');
  const player=await findPlayer(db,match.id);if(!player)return error(c,401,'PLAYER_CODE_INVALID','That Player Code could not be restored. Check it and try again.');
  await db.update(s.players).set({lastActiveAt:time}).where(eq(s.players.id,player.id));
  setSession(c,player,env,time);return c.json({player:publicPlayer(player),isNew:false});
 });
 router.post('/player/demo',async c=>{
  c.header('Cache-Control','no-store');
  if(!ready())return unavailable(c);
  const [demo]=await db.select({id:s.players.id,role:s.players.role,status:s.players.status,displayName:s.profiles.displayName}).from(s.players).innerJoin(s.profiles,eq(s.profiles.playerId,s.players.id)).where(eq(s.players.isDemo,true)).limit(1);
  if(!demo||demo.status!=='ACTIVE')return error(c,404,'DEMO_NOT_FOUND','The demo profile is not available yet.');
  const player:PlayerView={id:demo.id,role:demo.role,displayName:demo.displayName};setSession(c,player,env,now());
  return c.json({player:publicPlayer(player),isNew:false});
 });
 router.get('/player/me',async c=>{
  c.header('Cache-Control','no-store');
  if(!ready())return unavailable(c);
  const session=readPlayerSession(c,env.SESSION_SECRET!,now());if(!session)return error(c,401,'SESSION_REQUIRED','Create a player or restore a Player Code to continue.');
  const player=await findPlayer(db,session.playerId);if(!player)return error(c,401,'SESSION_REQUIRED','Create a player or restore a Player Code to continue.');
  return c.json({player:publicPlayer(player),isNew:false});
 });
 return router;
}
