import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {eq} from 'drizzle-orm';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase} from '../server/db/seed.ts';
import {createSessionToken,digestPlayerCode,generatePlayerCode,makeSessionCookie,verifySessionToken} from '../server/player/identity.ts';
import {trustedClientIp} from '../server/player/routes.ts';

let pg,db,app;
const pepper='player-code-test-pepper-at-least-32-characters';
const now=new Date('2026-09-28T04:00:00.000Z');
const env=loadEnv({NODE_ENV:'test',SESSION_SECRET:'session-test-secret-at-least-32-characters',PLAYER_CODE_PEPPER:pepper});
before(async()=>{
 pg=new PGlite();db=drizzle(pg,{schema});
 await migrate(db,{migrationsFolder:'server/db/migrations'});
 await seedDatabase(db,{codePepper:pepper,now});
 app=createApp({db,env,now:()=>now,clientIp:headers=>headers.get('x-test-client-ip')||'test-client'});
});
after(async()=>{await pg?.close();});
const send=(path,{method='POST',body={},cookie,ip='203.0.113.8'}={})=>app.request('/api'+path,{method,headers:{...(method==='POST'?{'content-type':'application/json'}:{}),...(cookie?{cookie}:{}),'x-test-client-ip':ip},...(method==='POST'?{body:JSON.stringify(body)}:{})});
const sessionCookie=response=>(response.headers.get('set-cookie')||'').split(';')[0];

test('guest identity creates a private recovery code, signed session, and idempotent retry',async()=>{
 const response=await send('/player');assert.equal(response.status,201);
 const created=await response.json();assert.equal(created.isNew,true);assert.equal(created.player.displayName,'Scribe');
 assert.match(created.playerCode,/^[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{6}$/);
 const cookie=sessionCookie(response);assert.match(response.headers.get('set-cookie'),/HttpOnly/i);assert.match(response.headers.get('set-cookie'),/SameSite=Lax/i);assert.doesNotMatch(cookie,/playerCode/i);
 const [row]=await db.select().from(schema.players).where(eq(schema.players.id,created.player.id));
 assert.equal(row.codeDigest,digestPlayerCode(created.playerCode,pepper));assert.notEqual(row.codeDigest,created.playerCode);
 const retry=await send('/player',{cookie});const repeated=await retry.json();
 assert.equal(retry.status,200);assert.equal(repeated.isNew,false);assert.equal(repeated.player.id,created.player.id);assert.equal('playerCode' in repeated,false);
 assert.equal((await db.select().from(schema.players).where(eq(schema.players.role,'GUEST'))).length,1);
});

test('Player Code restore accepts case and separators but never returns the code again',async()=>{
 const created=await send('/player');const guest=await created.json();
 const response=await send('/player/restore',{body:{code:guest.playerCode.toLowerCase().replace('-', ' ')},ip:'203.0.113.9'});
 assert.equal(response.status,200);assert.doesNotMatch(response.headers.get('set-cookie'),/Secure/);
 const me=await (await send('/player/me',{method:'GET',cookie:sessionCookie(response)})).json();
 assert.equal(me.player.id,guest.player.id);assert.equal('playerCode' in me,false);
});

test('demo endpoint switches to the seeded Minh profile without exposing credentials',async()=>{
 const response=await send('/player/demo');assert.equal(response.status,200);const body=await response.json();
 assert.equal(body.player.displayName,'Minh');assert.equal(body.player.role,'DEMO');assert.equal('playerCode' in body,false);
 const me=await send('/player/me',{method:'GET',cookie:sessionCookie(response)});assert.equal((await me.json()).player.id,body.player.id);
});

test('logout clears the current session without deleting the player',async()=>{
 const created=await send('/player');const cookie=sessionCookie(created);const player=(await created.json()).player;
 const response=await send('/player/logout',{cookie});assert.equal(response.status,200);assert.match(response.headers.get('set-cookie'),/Max-Age=0/);
 const me=await send('/player/me',{method:'GET'});assert.equal(me.status,401);
 assert.equal((await db.select().from(schema.players).where(eq(schema.players.id,player.id))).length,1);
});

test('invalid sessions are rejected and malformed identity requests are safe',async()=>{
 const malformed=await send('/player/restore',{body:{code:'short',playerId:'other'}});assert.equal(malformed.status,400);
 const unauthorized=await send('/player/me',{method:'GET',cookie:'lifeos_session=not.a.valid.signature'});assert.equal(unauthorized.status,401);
});

test('restore attempts are atomically rate-limited by a keyed IP digest',async()=>{
 await db.insert(schema.restoreAttempts).values({bucketKey:'expired-test-bucket',windowStartedAt:new Date(now.getTime()-48*60*60*1000),attempts:8,updatedAt:new Date(now.getTime()-48*60*60*1000)});
 for(let i=0;i<5;i++){const response=await send('/player/restore',{body:{code:'0000-000000'},ip:'203.0.113.99'});assert.equal(response.status,401);}
 const limited=await send('/player/restore',{body:{code:'0000-000000'},ip:'203.0.113.99'});
 assert.equal(limited.status,429);assert.equal((await limited.json()).error.code,'RESTORE_RATE_LIMITED');
 const buckets=await db.select().from(schema.restoreAttempts);assert.ok(buckets[0].bucketKey.length===64);assert.doesNotMatch(buckets[0].bucketKey,/203\.0\.113/);
 assert.equal((await db.select().from(schema.restoreAttempts).where(eq(schema.restoreAttempts.bucketKey,'expired-test-bucket'))).length,0);
});

test('recovery codes use the unambiguous alphabet and signed sessions expire securely',async()=>{
 const code=generatePlayerCode();assert.match(code,/^[0-9A-HJKMNP-TV-Z]{10}$/);
 const token=createSessionToken({playerId:'player-id',role:'GUEST'},env.SESSION_SECRET,now);
 assert.equal(verifySessionToken(token,env.SESSION_SECRET,now)?.playerId,'player-id');
 assert.equal(verifySessionToken(`${token}x`,env.SESSION_SECRET,now),null);
 assert.equal(verifySessionToken(token,env.SESSION_SECRET,new Date(now.getTime()+31*24*60*60*1000)),null);
 assert.match(makeSessionCookie(token,{production:true}),/; Secure/);
 assert.match(makeSessionCookie(token),/HttpOnly; SameSite=Lax/);
 assert.match(makeSessionCookie(token),/Max-Age=2592000/);
});

test('production restore limits use only the trusted Vercel client address',async()=>{
 const productionEnv=loadEnv({NODE_ENV:'production',SESSION_SECRET:'session-test-secret-at-least-32-characters',PLAYER_CODE_PEPPER:pepper});
 assert.equal(trustedClientIp(new Headers({'x-forwarded-for':'198.51.100.88','x-vercel-forwarded-for':'198.51.100.88'}),productionEnv),'unknown-production-client');
 assert.equal(trustedClientIp(new Headers({'x-vercel-forwarded-for':'198.51.100.24','x-forwarded-for':'198.51.100.88'}),productionEnv,true),'198.51.100.24');
});
