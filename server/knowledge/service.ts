import {and,asc,eq,isNull,or} from 'drizzle-orm';
import {z} from 'zod';
import * as s from '../db/schema.ts';
import {evaluateProgression} from '../progression/unlocks.ts';

const candidateSchema=z.object({conceptName:z.string().trim().min(1).max(120),suggestedDomainName:z.string().trim().min(1).max(120).optional(),signalType:z.enum(['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']),confidence:z.number().min(0).max(1),reasonShort:z.string().max(240)}).strict();
const sourceSchema=z.object({sourceType:z.enum(['CHAT','QUIZ','WRITTEN','CODE_REVIEW','QUEST_REFLECTION']),sourceId:z.string().uuid(),conversationId:z.string().uuid().optional(),now:z.date().optional()}).strict();
const levels=['UNSEEN','DISCOVERED','EXPLORING','UNDERSTANDING','APPLYING','MASTERED'] as const;
type Level=typeof levels[number];
const normalize=(value:string)=>value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');
const currentLevel=(progress:any):Level=>levels.includes(progress?.level)?progress.level:'UNSEEN';
const levelAtLeast=(left:Level,right:Level)=>levels.indexOf(left)>=levels.indexOf(right);

async function resolveDomain(tx:any,playerId:string,name:string,create:boolean,now:Date){
 const normalizedName=normalize(name),scope=and(eq(s.domains.normalizedName,normalizedName),or(isNull(s.domains.ownerPlayerId),eq(s.domains.ownerPlayerId,playerId)));
 const rows=await tx.select().from(s.domains).where(scope).orderBy(asc(s.domains.ownerPlayerId)).limit(1);
 if(rows[0]||!create)return rows[0]??null;
 await tx.insert(s.domains).values({ownerPlayerId:playerId,key:null,name:name.trim(),normalizedName,description:null,source:'AI_DYNAMIC',iconKey:'tree',colorKey:'gold',createdAt:now}).onConflictDoNothing();
 return (await tx.select().from(s.domains).where(scope).orderBy(asc(s.domains.ownerPlayerId)).limit(1))[0]??null;
}

async function resolveConcept(tx:any,playerId:string,domainId:string,name:string,create:boolean,now:Date){
 const normalizedName=normalize(name),scope=and(eq(s.concepts.domainId,domainId),eq(s.concepts.normalizedName,normalizedName),or(isNull(s.concepts.ownerPlayerId),eq(s.concepts.ownerPlayerId,playerId)));
 const rows=await tx.select().from(s.concepts).where(scope).orderBy(asc(s.concepts.ownerPlayerId)).limit(1);
 if(rows[0]||!create)return rows[0]??null;
 await tx.insert(s.concepts).values({domainId,ownerPlayerId:playerId,key:null,name:name.trim(),normalizedName,description:null,source:'AI_DYNAMIC',createdAt:now}).onConflictDoNothing();
 return (await tx.select().from(s.concepts).where(scope).orderBy(asc(s.concepts.ownerPlayerId)).limit(1))[0]??null;
}

function nextLevel(rows:any[]):Level{
 const accepted=rows.filter(row=>Number(row.confidence)>=.55),count=(type:string)=>accepted.filter(row=>row.signalType===type),mean=(items:any[])=>items.length?items.reduce((sum,row)=>sum+Number(row.confidence),0)/items.length:0,distinct=(items:any[])=>new Set(items.map(row=>row.sourceId).filter(Boolean)).size;
 let level:Level=accepted.length?'DISCOVERED':'UNSEEN';const discovery=[...count('DISCOVERY'),...count('EXPLORATION')];
 if(discovery.length>=2||count('EXPLORATION').some(row=>Number(row.confidence)>=.75))level='EXPLORING';
 const understanding=count('UNDERSTANDING');if(understanding.length>=2&&distinct(understanding)>=2&&mean(understanding)>=.7)level='UNDERSTANDING';
 const applications=count('APPLICATION');if(applications.length>=2&&distinct(applications)>=2&&mean(applications)>=.75)level='APPLYING';
 if(applications.length>=5&&distinct(applications)>=3&&mean(applications)>=.85)level='MASTERED';
 return level;
}

export async function recordKnowledgeSignal(db:any,playerId:string,candidateInput:unknown,sourceInput:unknown){
 const candidate=candidateSchema.parse(candidateInput),source=sourceSchema.parse(sourceInput),now=source.now??new Date();
 return db.transaction(async(tx:any)=>{
  const domain=await resolveDomain(tx,playerId,candidate.suggestedDomainName||'General',candidate.confidence>=.55,now);
  if(!domain)return {accepted:false,duplicate:false,domainId:null,conceptId:null,signalId:null,level:'UNSEEN' as Level};
  const concept=await resolveConcept(tx,playerId,domain.id,candidate.conceptName,candidate.confidence>=.55,now);
  if(!concept)return {accepted:false,duplicate:false,domainId:domain.id,conceptId:null,signalId:null,level:'UNSEEN' as Level};
  await tx.insert(s.conceptProgress).values({playerId,conceptId:concept.id,level:'UNSEEN',signalCounts:{},firstSeenAt:null,updatedAt:now}).onConflictDoNothing();
  const [progress]=await tx.select().from(s.conceptProgress).where(and(eq(s.conceptProgress.playerId,playerId),eq(s.conceptProgress.conceptId,concept.id))).limit(1).for('update');
  const [duplicate]=await tx.select().from(s.knowledgeSignals).where(and(eq(s.knowledgeSignals.playerId,playerId),eq(s.knowledgeSignals.conceptId,concept.id),eq(s.knowledgeSignals.sourceId,source.sourceId),eq(s.knowledgeSignals.signalType,candidate.signalType))).limit(1);
  if(duplicate)return {accepted:Number(duplicate.confidence)>=.55,duplicate:true,domainId:domain.id,conceptId:concept.id,signalId:duplicate.id,level:currentLevel(progress)};
  if(candidate.confidence<.55)return {accepted:false,duplicate:false,domainId:domain.id,conceptId:concept.id,signalId:null,level:currentLevel(progress)};
  const [signal]=await tx.insert(s.knowledgeSignals).values({playerId,conceptId:concept.id,conversationId:source.conversationId??null,sourceType:source.sourceType,sourceId:source.sourceId,signalType:candidate.signalType,confidence:candidate.confidence.toFixed(3),createdAt:now}).onConflictDoNothing().returning();
  if(!signal){
   const [existing]=await tx.select().from(s.knowledgeSignals).where(and(eq(s.knowledgeSignals.playerId,playerId),eq(s.knowledgeSignals.conceptId,concept.id),eq(s.knowledgeSignals.sourceId,source.sourceId),eq(s.knowledgeSignals.signalType,candidate.signalType))).limit(1);
   return {accepted:true,duplicate:true,domainId:domain.id,conceptId:concept.id,signalId:existing?.id??null,level:currentLevel(progress)};
  }
  const signals=await tx.select().from(s.knowledgeSignals).where(and(eq(s.knowledgeSignals.playerId,playerId),eq(s.knowledgeSignals.conceptId,concept.id))).orderBy(asc(s.knowledgeSignals.createdAt));
  const accepted=signals.filter((row:any)=>Number(row.confidence)>=.55),signalCounts={DISCOVERY:0,EXPLORATION:0,UNDERSTANDING:0,APPLICATION:0};
  for(const row of accepted)signalCounts[row.signalType as keyof typeof signalCounts]++;
  const computed=nextLevel(accepted),existingLevel=currentLevel(progress),level=levelAtLeast(existingLevel,computed)?existingLevel:computed;
  await tx.update(s.conceptProgress).set({level,signalCounts,firstSeenAt:progress.firstSeenAt??(level==='UNSEEN'?null:now),updatedAt:now,...(level==='MASTERED'?{masteredAt:progress.masteredAt??now}:{})}).where(and(eq(s.conceptProgress.playerId,playerId),eq(s.conceptProgress.conceptId,concept.id)));
  await evaluateProgression(tx,playerId,now);
  return {accepted:true,duplicate:false,domainId:domain.id,conceptId:concept.id,signalId:signal.id,level};
 });
}
