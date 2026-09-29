import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {eq} from 'drizzle-orm';
import {createApp} from '../server/app.ts';
import {loadEnv} from '../server/config/env.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase,stableId} from '../server/db/seed.ts';

const pepper='admin-test-pepper-with-at-least-32-characters',adminSecret='admin-test-secret-with-at-least-32-characters';let pg,db,app;
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now:new Date('2026-09-28T04:00:00Z')});app=createApp({db,env:loadEnv({NODE_ENV:'test',SESSION_SECRET:'admin-test-session-secret-with-at-least-32-chars',PLAYER_CODE_PEPPER:pepper,ADMIN_SECRET:adminSecret}),now:()=>new Date('2026-09-28T04:00:00Z')});});
after(async()=>{await pg?.close();});
const auth={authorization:`Bearer ${adminSecret}`};

test('admin debug requires bearer secret and returns bounded player details only',async()=>{
 const id=stableId('player:minh-demo'),denied=await app.request(`/api/admin/debug-player?playerId=${id}`);assert.equal(denied.status,401);
 const response=await app.request(`/api/admin/debug-player?playerId=${id}`,{headers:auth});assert.equal(response.status,200);const body=await response.json();assert.equal(body.player.role,'DEMO');assert.equal(body.profile.displayName,'Minh');assert.equal(body.journeyCount,1);assert.equal(JSON.stringify(body).includes('codeDigest'),false);
});

test('demo reset restores the seeded state and leaves regular players untouched',async()=>{
 const stranger='10000000-0000-4000-8000-000000000001';await db.insert(schema.players).values({id:stranger,codeDigest:'admin-stranger-digest'});await db.insert(schema.profiles).values({playerId:stranger,displayName:'Other',dailyXpDate:'2026-09-28'});
 await db.update(schema.profiles).set({xp:999,coins:1}).where(eq(schema.profiles.playerId,stableId('player:minh-demo')));
 assert.equal((await app.request('/api/admin/reset-demo',{method:'POST'})).status,401);
 const reset=await app.request('/api/admin/reset-demo',{method:'POST',headers:auth});assert.equal(reset.status,200);
 const [demo]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,stableId('player:minh-demo')));assert.equal(demo.xp,250);assert.equal(demo.coins,45);
 const [other]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,stranger));assert.equal(other.displayName,'Other');
});
