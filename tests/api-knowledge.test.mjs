import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {drizzle} from 'drizzle-orm/pglite';
import {migrate} from 'drizzle-orm/pglite/migrator';
import {recordKnowledgeSignal} from '../server/knowledge/service.ts';
import {getPlayerState} from '../server/state/service.ts';
import * as schema from '../server/db/schema.ts';
import {seedDatabase,stableId} from '../server/db/seed.ts';

let pg,db,playerId;
const now=new Date('2026-09-28T04:00:00.000Z');
before(async()=>{pg=new PGlite();db=drizzle(pg,{schema});await migrate(db,{migrationsFolder:'server/db/migrations'});await seedDatabase(db,{codePepper:'knowledge-test-pepper-at-least-32-characters',now});playerId=stableId('player:minh-demo');});
after(async()=>{await pg?.close();});
const signal=(candidate,sourceId=randomUUID())=>recordKnowledgeSignal(db,playerId,candidate,{sourceType:'CHAT',sourceId,now});

test('deterministic knowledge policy promotes only on accepted distinct signals and never decreases',async()=>{
 const base={conceptName:'Decorators',suggestedDomainName:'Python',signalType:'DISCOVERY',confidence:.8,reasonShort:'Explained a decorator example.'};
 assert.equal((await signal(base)).level,'DISCOVERED');
 assert.equal((await signal({...base,signalType:'EXPLORATION'})).level,'EXPLORING');
 assert.equal((await signal({...base,signalType:'UNDERSTANDING'})).level,'EXPLORING');
 assert.equal((await signal({...base,signalType:'UNDERSTANDING'})).level,'UNDERSTANDING');
 const weak=await signal({...base,signalType:'DISCOVERY',confidence:.4});assert.equal(weak.accepted,false);assert.equal(weak.level,'UNDERSTANDING');
 let latest;for(let index=0;index<5;index++)latest=await signal({...base,signalType:'APPLICATION',confidence:.9});
 assert.equal(latest.level,'MASTERED');
});

test('dynamic domains and concepts normalize names and stay private to their player',async()=>{
 const source={sourceType:'WRITTEN',sourceId:randomUUID(),now};
 const first=await recordKnowledgeSignal(db,playerId,{conceptName:'MQTT QoS',suggestedDomainName:'Home Automation',signalType:'DISCOVERY',confidence:.7,reasonShort:'Identified QoS levels.'},source);
 const repeated=await recordKnowledgeSignal(db,playerId,{conceptName:'  mqtt   qos ',suggestedDomainName:'HOME automation',signalType:'DISCOVERY',confidence:.7,reasonShort:'Repeated attempt.'},{...source,sourceId:randomUUID()});
 const otherPlayer=stableId('player:knowledge-other');
 await db.insert(schema.players).values({id:otherPlayer,codeDigest:'other-knowledge-player-code-digest',role:'GUEST'});
 await db.insert(schema.profiles).values({playerId:otherPlayer,displayName:'Other',xp:0,coins:0,dailyXp:0,dailyXpDate:'2026-09-28',streak:0,longestStreak:0,timezone:'Asia/Ho_Chi_Minh'});
 const other=await recordKnowledgeSignal(db,otherPlayer,{conceptName:'MQTT QoS',suggestedDomainName:'Home Automation',signalType:'DISCOVERY',confidence:.7,reasonShort:'Separate player.'},source);
 assert.equal(repeated.domainId,first.domainId);assert.equal(repeated.conceptId,first.conceptId);assert.notEqual(other.domainId,first.domainId);assert.notEqual(other.conceptId,first.conceptId);
 const state=await getPlayerState(db,playerId,'Asia/Ho_Chi_Minh',now);const dynamic=state.knowledge.concepts.find(item=>item.id===first.conceptId);
 assert.equal(dynamic.name,'MQTT QoS');assert.equal(dynamic.level,'EXPLORING');assert.ok(!JSON.stringify(state).includes('Identified QoS levels'));
});

test('knowledge signal candidates are strictly validated and source retries are idempotent',async()=>{
 const candidate={conceptName:'HTTP caching',suggestedDomainName:'Web Development',signalType:'DISCOVERY',confidence:.8,reasonShort:'Explained cache headers.'},source={sourceType:'CHAT',sourceId:randomUUID(),now};
 const first=await recordKnowledgeSignal(db,playerId,candidate,source),retry=await recordKnowledgeSignal(db,playerId,candidate,source);
 assert.equal(first.signalId,retry.signalId);assert.equal(retry.duplicate,true);assert.equal(retry.level,'DISCOVERED');
 await assert.rejects(()=>recordKnowledgeSignal(db,playerId,{...candidate,confidence:2},source));
 await assert.rejects(()=>recordKnowledgeSignal(db,playerId,{...candidate,reasonShort:'x'.repeat(241)},source));
});
