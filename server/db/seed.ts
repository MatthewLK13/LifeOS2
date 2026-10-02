import {createHash,createHmac} from 'node:crypto';
import {and,eq} from 'drizzle-orm';
import {TRACKS} from '../../shared/catalog/tracks.mjs';
import {CONCEPTS} from '../../shared/catalog/concepts.mjs';
import {createInitialState} from '../../src/state.js';
import {localDateAt} from '../config/game-rules.ts';
import * as s from './schema.ts';
import {achievementsSeed,inventorySeed,milestonesSeed} from './seed-data.ts';

export function stableId(key:string):string{
 const h=createHash('sha256').update(`lifeos-seed-v1:${key}`).digest('hex').slice(0,32).split('');
 h[12]='5';h[16]='89ab'[parseInt(h[16]!,16)&3]!;
 const raw=h.join('');return `${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20)}`;
}
const normalized=(value:string)=>value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');
const asDate=(day:string)=>new Date(`${day}T12:00:00.000Z`);
type SeedOptions={codePepper:string;now?:Date};

export async function seedDatabase(db:any,{codePepper,now=new Date()}:SeedOptions){
 if(!codePepper||codePepper.length<32)throw new Error('Seed requires a PLAYER_CODE_PEPPER of at least 32 characters.');
 return db.transaction(async(tx:any)=>{
  const seedDate=localDateAt(now,'Asia/Ho_Chi_Minh');
  const ids=new Map<string,string>();
  for(const t of TRACKS){
   const domainId=stableId(`domain:${t.id}`);ids.set(t.id,domainId);
   await tx.insert(s.domains).values({id:domainId,key:t.id,name:t.name,normalizedName:normalized(t.name),description:t.description,source:'SEED',iconKey:t.icon,colorKey:t.color}).onConflictDoUpdate({target:s.domains.id,set:{key:t.id,name:t.name,normalizedName:normalized(t.name),description:t.description,source:'SEED',iconKey:t.icon,colorKey:t.color}});
  }
  for(const c of CONCEPTS){
   const domainId=ids.get(c.trackId)!;
   await tx.insert(s.concepts).values({id:stableId(`concept:${c.id}`),domainId,key:c.id,name:c.name,normalizedName:normalized(c.name),description:c.scope,source:'SEED'}).onConflictDoUpdate({target:s.concepts.id,set:{domainId,key:c.id,name:c.name,normalizedName:normalized(c.name),description:c.scope,source:'SEED'}});
  }
  for(const t of TRACKS)await tx.insert(s.journeyTemplates).values({id:stableId(`template:${t.id}`),key:t.id,name:t.name,description:t.description,catalogVersion:4,curriculum:t.modules}).onConflictDoUpdate({target:s.journeyTemplates.id,set:{key:t.id,name:t.name,description:t.description,catalogVersion:4,curriculum:t.modules,updatedAt:now}});
  for(const item of achievementsSeed)await tx.insert(s.achievements).values({id:stableId(`achievement:${item.key}`),...item}).onConflictDoNothing();
  for(const item of milestonesSeed)await tx.insert(s.milestones).values({id:stableId(`milestone:${item.key}`),...item}).onConflictDoNothing();
  for(const item of inventorySeed)await tx.insert(s.inventoryItems).values({id:stableId(`item:${item.key}`),...item}).onConflictDoNothing();

  const demoId=stableId('player:minh-demo'),rawReserved=Buffer.from('reserved-demo-identity:v1').toString('base64url');
  const codeDigest=createHmac('sha256',codePepper).update(rawReserved).digest('hex');
  await tx.insert(s.players).values({id:demoId,codeDigest,role:'DEMO',isDemo:true,status:'ACTIVE'}).onConflictDoNothing();
  const state=createInitialState(),plan=state.journeys[0]!,journeyId=stableId('journey:minh-rag');
  await tx.insert(s.journeys).values({id:journeyId,playerId:demoId,title:plan.title,goal:'Build a document question-answering chatbot with grounded retrieval.',status:'ACTIVE',version:1,minutesPerDay:plan.minutes,experienceLevel:'some',templateKey:'rag',createdAt:asDate(seedDate)}).onConflictDoNothing();
  const chapterIds=plan.chapters.map((c,i)=>stableId(`chapter:minh-rag:${i}`));
  for(let i=0;i<plan.chapters.length;i++){
   const c=plan.chapters[i]!;
   await tx.insert(s.chapters).values({id:chapterIds[i]!,journeyId,title:c.title,summary:c.summary,orderIndex:i,lane:c.lane,metadata:{requires:c.requires,optional:c.optional,topics:c.topics}}).onConflictDoNothing();
  }
  const questIds=new Map<string,string>();
  for(const q of plan.chapters.flatMap(c=>c.quests)){
   const questId=stableId(`quest:minh-rag:${q.chapter}:${q.id.split('-').at(-1)}`);questIds.set(q.id,questId);
   const completed=q.status==='completed';
   await tx.insert(s.quests).values({id:questId,journeyId,playerId:demoId,chapterId:chapterIds[q.chapter]!,type:q.type==='Practice'?'PRACTICE':q.type==='Assessment'?'ASSESSMENT':q.type==='Project'?'PROJECT':'LEARN',assessmentSubtype:null,title:q.title,description:q.description,topic:q.topic,prompt:q.prompt,difficulty:q.difficulty,xpReward:q.xp,minutes:q.minutes,status:completed?'COMPLETED':q.status==='in-progress'?'IN_PROGRESS':'AVAILABLE',orderIndex:q.chapter*10+plan.chapters[q.chapter]!.quests.indexOf(q),source:'TEMPLATE',metadata:{checks:q.checks,originalType:q.type},startedAt:q.status==='in-progress'?asDate(seedDate):null,completedAt:completed?asDate(seedDate):null}).onConflictDoNothing();
   for(let i=0;i<q.steps.length;i++)await tx.insert(s.questSteps).values({id:stableId(`quest-step:${questId}:${i}`),questId,orderIndex:i,content:q.steps[i]!,completed:false}).onConflictDoNothing();
   if(q.notes)await tx.insert(s.questNotes).values({questId,playerId:demoId,content:q.notes}).onConflictDoNothing();
  }
  const profile={playerId:demoId,displayName:'Minh',xp:250,coins:45,dailyXp:10,dailyXpDate:seedDate,streak:7,longestStreak:7,lastQuestCompletedDate:seedDate,timezone:'Asia/Ho_Chi_Minh',avatarItemId:stableId('item:avatar_scribe'),preferences:{streak:true,inference:true,reducedMotion:false}};
  await tx.insert(s.profiles).values(profile).onConflictDoNothing();
  for(const item of inventorySeed.filter(x=>['avatar_scribe','avatar_explorer','avatar_artificer'].includes(x.key)))await tx.insert(s.playerInventory).values({playerId:demoId,itemId:stableId(`item:${item.key}`)}).onConflictDoNothing();
  await tx.insert(s.coinLedger).values([{id:stableId('coin:minh:welcome'),playerId:demoId,source:'demo_seed',amount:25,referenceKey:'welcome'},{id:stableId('coin:minh:exploration'),playerId:demoId,source:'demo_seed',amount:20,referenceKey:'exploration'}]).onConflictDoNothing();
  for(const key of ['first_steps','curious_mind','branching_out'])await tx.insert(s.playerAchievements).values({playerId:demoId,achievementId:stableId(`achievement:${key}`),unlockedAt:asDate('2026-09-24')}).onConflictDoNothing();
  for(const key of ['quests_10','knowledge_10'])await tx.insert(s.playerMilestones).values({playerId:demoId,milestoneId:stableId(`milestone:${key}`),reachedAt:asDate('2026-09-24')}).onConflictDoNothing();
  const xpQuest=questIds.get(plan.chapters[0]!.quests.find(q=>q.status==='completed')!.id)!;
  await tx.insert(s.xpLedger).values([{id:stableId('xp:minh:quest'),playerId:demoId,questId:xpQuest,source:'quest_completion',amount:10,localDate:seedDate,createdAt:now},{id:stableId('xp:minh:history'),playerId:demoId,questId:null,source:'prior_demo_history',amount:240,localDate:'2026-09-23',createdAt:asDate('2026-09-23')}]).onConflictDoNothing();
  for(const concept of CONCEPTS){
   const status=state.concepts.find((x:any)=>x.id===concept.id)?.status??'unobserved';
   const level=status==='applying'?'APPLYING':status==='understanding'?'UNDERSTANDING':status==='exploring'?'EXPLORING':status==='self'?'DISCOVERED':'UNSEEN';
   if(level!=='UNSEEN')await tx.insert(s.conceptProgress).values({playerId:demoId,conceptId:stableId(`concept:${concept.id}`),level,signalCounts:{SEED:concept.evidence.length},firstSeenAt:asDate('2026-09-22'),updatedAt:now}).onConflictDoNothing();
  }
  const conversationId=stableId('conversation:minh:sample');
  await tx.insert(s.conversations).values({id:conversationId,playerId:demoId,title:'Building a grounded document chatbot',status:'ACTIVE',startedAt:asDate('2026-09-22'),lastMessageAt:asDate('2026-09-24')}).onConflictDoNothing();
  const sampleMessages=[['ASSISTANT','Welcome back, Minh. What would you like to build today?'],['USER','I want to make a document question-answering chatbot.'],['ASSISTANT','We can start with chunks and embeddings, then inspect what retrieval returns before trusting an answer.']];
  for(let i=0;i<sampleMessages.length;i++){const [role,content]=sampleMessages[i]!;await tx.insert(s.messages).values({id:stableId(`message:minh:${i}`),conversationId,role:role as 'ASSISTANT'|'USER',content,status:'COMPLETE',createdAt:asDate(`2026-09-${22+i}`)}).onConflictDoNothing();}
  await tx.insert(s.conversationSummaries).values({id:stableId('summary:minh:sample'),conversationId,playerId:demoId,summary:'Minh is exploring a document Q&A chatbot, with current focus on chunking, embeddings, retrieval, and grounded answers.',keyTopics:['RAG','embeddings','retrieval']}).onConflictDoNothing();
  await tx.insert(s.memories).values([{id:stableId('memory:minh:projects'),playerId:demoId,text:'I learn best by building small projects.',status:'CONFIRMED',sourceConversationId:conversationId},{id:stableId('memory:minh:rag'),playerId:demoId,text:'My current goal is a document Q&A chatbot.',status:'CONFIRMED',sourceConversationId:conversationId}]).onConflictDoNothing();
  return {domains:TRACKS.length,concepts:CONCEPTS.length,templates:TRACKS.length,chapters:plan.chapters.length,quests:plan.chapters.flatMap(c=>c.quests).length,achievements:achievementsSeed.length,milestones:milestonesSeed.length,demoPlayerId:demoId};
 });
}
