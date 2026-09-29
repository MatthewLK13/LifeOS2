import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {eq,isNull} from 'drizzle-orm';
import * as schema from '../server/db/schema.ts';
import {seedDatabase,stableId} from '../server/db/seed.ts';
import {evaluateProgression} from '../server/progression/unlocks.ts';

const now=new Date('2026-09-28T04:00:00Z'),pepper='unlock-test-pepper-at-least-32-characters';let pg,db,playerId;
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:pepper,now});playerId=randomUUID();await db.insert(schema.players).values({id:playerId,codeDigest:'unlock-player-digest'});await db.insert(schema.profiles).values({playerId,displayName:'Test Scribe',xp:500,dailyXpDate:'2026-09-28'});const concepts=await db.select({id:schema.concepts.id}).from(schema.concepts).where(isNull(schema.concepts.ownerPlayerId)).limit(10);await db.insert(schema.conceptProgress).values(concepts.map(item=>({playerId,conceptId:item.id,level:'DISCOVERED',updatedAt:now})));});
after(async()=>{await pg?.close();});

test('rule catalog unlocks are deterministic, award Coins once, and milestone retries stay idempotent',async()=>{
 const first=await db.transaction(tx=>evaluateProgression(tx,playerId,now));assert.ok(first.achievements.some(item=>item.key==='curious_mind'));assert.ok(first.milestones.some(item=>item.key==='xp_500'));
 const [profileAfterFirst]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,playerId)),ledgerFirst=await db.select().from(schema.coinLedger).where(eq(schema.coinLedger.playerId,playerId));assert.ok(profileAfterFirst.coins>0);
 const second=await db.transaction(tx=>evaluateProgression(tx,playerId,now));const [profileAfterSecond]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,playerId)),ledgerSecond=await db.select().from(schema.coinLedger).where(eq(schema.coinLedger.playerId,playerId));assert.equal(second.achievements.length,0);assert.equal(second.milestones.length,0);assert.equal(profileAfterSecond.coins,profileAfterFirst.coins);assert.equal(ledgerSecond.length,ledgerFirst.length);
 const achievements=await db.select().from(schema.playerAchievements).where(eq(schema.playerAchievements.playerId,playerId)),milestones=await db.select().from(schema.playerMilestones).where(eq(schema.playerMilestones.playerId,playerId));assert.equal(achievements.filter(row=>row.achievementId===stableId('achievement:curious_mind')).length,1);assert.equal(milestones.filter(row=>row.milestoneId===stableId('milestone:xp_500')).length,1);
});
