import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {sql,eq} from 'drizzle-orm';
import * as schema from '../../server/db/schema.ts';
import {seedDatabase} from '../../server/db/seed.ts';
import {achievementsSeed,milestonesSeed,inventorySeed} from '../../server/db/seed-data.ts';
import {TRACKS} from '../../shared/catalog/tracks.mjs';
import {CONCEPTS} from '../../shared/catalog/concepts.mjs';

let pg,db,first;
before(async()=>{
 pg=new PGlite();db=drizzle(pg,{schema});
 await migrate(db,{migrationsFolder:'server/db/migrations'});
 first=await seedDatabase(db,{codePepper:'phase-one-test-code-pepper-at-least-32'});
});
after(async()=>{await pg?.close();});
test('PostgreSQL migration creates the complete phase-one schema',async()=>{
 const result=await pg.query("select tablename from pg_tables where schemaname='public'");
 const tables=new Set(result.rows.map(row=>row.tablename));
 for(const name of ['players','profiles','journeys','journey_arcs','chapters','quests','quest_steps','quest_notes','xp_ledger','roadmap_proposals','roadmap_revisions','domains','concepts','concept_progress','knowledge_signals','conversations','messages','conversation_summaries','memories','assessments','assessment_attempts','achievements','player_achievements','milestones','player_milestones','inventory_items','player_inventory','coin_ledger','push_subscriptions','notifications','ai_usage','journey_templates','restore_attempts'])assert.ok(tables.has(name),name);
});
test('Phase 2 safely backfills owners on an already-seeded Phase 1 database',async()=>{
 const legacy=new PGlite();
 try{
  const base=await readFile('server/db/migrations/0000_phase1_initial.sql','utf8');
  await legacy.exec(base.replaceAll('--> statement-breakpoint',';'));
  await legacy.exec("insert into players(id,code_digest,role,is_demo,status) values ('00000000-0000-4000-8000-000000000001','legacy-seed','DEMO',true,'ACTIVE'); insert into journeys(id,player_id,title,goal,minutes_per_day) values ('00000000-0000-4000-8000-000000000002','00000000-0000-4000-8000-000000000001','Legacy','Legacy goal',30); insert into chapters(id,journey_id,title,order_index) values ('00000000-0000-4000-8000-000000000003','00000000-0000-4000-8000-000000000002','Legacy chapter',0); insert into quests(id,journey_id,chapter_id,type,title,xp_reward,minutes,order_index,source) values ('00000000-0000-4000-8000-000000000004','00000000-0000-4000-8000-000000000002','00000000-0000-4000-8000-000000000003','LEARN','Legacy quest',10,20,0,'TEMPLATE');");
  const ownership=await readFile('server/db/migrations/0001_ownership-constraints.sql','utf8');await legacy.exec(ownership);
  const {rows}=await legacy.query("select player_id from quests where id='00000000-0000-4000-8000-000000000004'");
  assert.equal(rows[0].player_id,'00000000-0000-4000-8000-000000000001');
 }finally{await legacy.close();}
});
test('seed shares canonical catalog and seeds Minh economy/history fixtures',async()=>{
 assert.deepEqual({domains:first.domains,concepts:first.concepts,templates:first.templates},{domains:20,concepts:664,templates:20});
 const [profile]=await db.select().from(schema.profiles).where(eq(schema.profiles.displayName,'Minh'));
 assert.equal(profile.xp,250);assert.equal(profile.coins,45);assert.equal(profile.dailyXp,10);assert.ok(profile.avatarItemId);
 assert.equal((await db.select().from(schema.achievements)).length,8);
 assert.equal((await db.select().from(schema.milestones)).length,10);
 assert.equal((await db.select().from(schema.inventoryItems)).length,5);
 assert.equal((await db.select({total:sql`sum(${schema.xpLedger.amount})`}).from(schema.xpLedger))[0].total,250);
 assert.equal((await db.select().from(schema.journeys)).length,1);
 assert.equal((await db.select().from(schema.conversationSummaries)).length,1);
});
test('rerunning seed is idempotent and preserves player progress/history',async()=>{
 await db.update(schema.profiles).set({xp:731,displayName:'Keep My Sample'}).where(eq(schema.profiles.displayName,'Minh'));
 await db.update(schema.domains).set({name:'Outdated domain'}).where(eq(schema.domains.key,'python'));
 await db.update(schema.concepts).set({name:'Outdated concept'}).where(eq(schema.concepts.key,CONCEPTS[0].id));
 await db.update(schema.journeyTemplates).set({catalogVersion:1,curriculum:[]}).where(eq(schema.journeyTemplates.key,'python'));
 const stats=await seedDatabase(db,{codePepper:'phase-one-test-code-pepper-at-least-32'});
 const [profile]=await db.select().from(schema.profiles).where(eq(schema.profiles.playerId,stats.demoPlayerId));
 assert.equal(profile.xp,731);assert.equal(profile.displayName,'Keep My Sample');
 assert.equal((await db.select().from(schema.players)).length,1);
 assert.equal((await db.select().from(schema.concepts)).length,664);
 assert.equal((await db.select().from(schema.journeys)).length,1);
 assert.equal((await db.select().from(schema.xpLedger)).length,2);
 assert.equal((await db.select().from(schema.memories)).length,2);
 assert.equal((await db.select().from(schema.playerInventory)).length,3);
 assert.equal((await db.select().from(schema.domains).where(eq(schema.domains.key,'python')))[0].name,TRACKS.find(track=>track.id==='python').name);
 assert.equal((await db.select().from(schema.concepts).where(eq(schema.concepts.key,CONCEPTS[0].id)))[0].name,CONCEPTS[0].name);
 const [template]=await db.select().from(schema.journeyTemplates).where(eq(schema.journeyTemplates.key,'python'));
 assert.equal(template.catalogVersion,4);assert.ok(template.curriculum.length>0);
 assert.equal(achievementsSeed.length,8);assert.equal(milestonesSeed.length,10);assert.equal(inventorySeed.length,5);
});
test('database constraints prevent broken owners, XP inflation and duplicate catalog records',async()=>{
 await assert.rejects(()=>pg.query("insert into profiles(player_id,display_name,xp,coins,daily_xp,daily_xp_date,streak,longest_streak,timezone) values (gen_random_uuid(),'Ghost',0,0,0,current_date,0,0,'Asia/Ho_Chi_Minh')"));
 await assert.rejects(()=>pg.query("update profiles set daily_xp=121 where display_name='Keep My Sample'"));
 const duplicate=await db.select().from(schema.domains).where(eq(schema.domains.key,'esp32'));assert.equal(duplicate.length,1);
 await pg.query("insert into players(id,code_digest,role,is_demo,status) values (gen_random_uuid(),'cross-owner-test','USER',false,'ACTIVE')");
 const [{id:otherPlayer}]=await pg.query("select id from players where code_digest='cross-owner-test'").then(result=>result.rows);
 const [{id:questId}]=await pg.query("select id from quests limit 1").then(result=>result.rows);
 const [{id:conversationId}]=await pg.query("select id from conversations limit 1").then(result=>result.rows);
 const [{id:assessmentId}]=await pg.query("insert into assessments(player_id,subtype,prompt,content_json) values ($1,'QUIZ','sample','{}'::jsonb) returning id",[first.demoPlayerId]).then(result=>result.rows);
 await assert.rejects(()=>pg.query('insert into quest_notes(quest_id,player_id,content) values ($1,$2,$3)',[questId,otherPlayer,'foreign note']));
 await assert.rejects(()=>pg.query('insert into conversation_summaries(conversation_id,player_id,summary) values ($1,$2,$3)',[conversationId,otherPlayer,'foreign summary']));
 await assert.rejects(()=>pg.query("insert into assessment_attempts(assessment_id,player_id,answer_text,verdict,feedback) values ($1,$2,'answer','GOOD','feedback')",[assessmentId,otherPlayer]));
 await assert.rejects(()=>pg.query("insert into xp_ledger(player_id,quest_id,source,amount,local_date) values ($1,$2,'quest_completion',10,current_date)",[otherPlayer,questId]));
 await assert.rejects(()=>pg.query("insert into assessments(player_id,quest_id,subtype,prompt,content_json) values ($1,$2,'QUIZ','sample','{}'::jsonb)",[otherPlayer,questId]));
 await assert.rejects(()=>pg.query('insert into memories(player_id,text,source_conversation_id,status) values ($1,$2,$3,$4)',[otherPlayer,'foreign memory',conversationId,'CONFIRMED']));
 const [{id:journeyId}]=await pg.query('select id from journeys limit 1').then(result=>result.rows);
 const [{id:otherJourneyId}]=await pg.query("insert into journeys(player_id,title,goal,minutes_per_day) values ($1,'other','other',30) returning id",[first.demoPlayerId]).then(result=>result.rows);
 const [{id:arcId}]=await pg.query("insert into journey_arcs(journey_id,title,order_index) values ($1,'foreign arc',0) returning id",[otherJourneyId]).then(result=>result.rows);
 await assert.rejects(()=>pg.query("insert into chapters(journey_id,arc_id,title,order_index) values ($1,$2,'cross-journey chapter',99)",[journeyId,arcId]));
 const conceptId=(await pg.query('select id from concepts limit 1')).rows[0].id;
 await pg.query('update concepts set owner_player_id=$1 where id=$2',[first.demoPlayerId,conceptId]);
 await assert.rejects(()=>pg.query("insert into knowledge_signals(player_id,concept_id,source_type,signal_type,confidence) values ($1,$2,'CHAT','DISCOVERY',0.9)",[otherPlayer,conceptId]));
});
test('a failed catalog transaction leaves no partial seed behind',async()=>{
 const other=new PGlite();
 try{
  const connection=drizzle(other,{schema});await migrate(connection,{migrationsFolder:'server/db/migrations'});
  await other.exec("CREATE FUNCTION fail_template_seed() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'test seed failure'; END; $$; CREATE TRIGGER fail_template_seed BEFORE INSERT ON journey_templates FOR EACH ROW EXECUTE FUNCTION fail_template_seed();");
  await assert.rejects(()=>seedDatabase(connection,{codePepper:'phase-one-test-code-pepper-at-least-32'}),error=>error.cause?.message==='test seed failure');
  const {rows}=await other.query('select count(*)::int as count from domains');assert.equal(rows[0].count,0);
 }finally{await other.close();}
});
