import {and,asc,eq,inArray} from 'drizzle-orm';
import {randomUUID} from 'node:crypto';
import {createRoadmap} from '../../src/state.js';
import {trackById} from '../../shared/catalog/tracks.mjs';
import * as s from '../db/schema.ts';
import {evaluateProgression} from '../progression/unlocks.ts';

const previewOf=(draft:any)=>({title:draft.title,goal:draft.goal,templateKey:draft.trackId,experienceLevel:draft.experience,minutesPerDay:draft.minutes,estimatedDays:draft.days,chapters:draft.chapters.map((chapter:any)=>({title:chapter.title,summary:chapter.summary,lane:chapter.lane,topics:chapter.topics,quests:chapter.quests.map((quest:any)=>({title:quest.title,type:quest.type,difficulty:quest.difficulty,xpReward:quest.xp,minutes:quest.minutes,prompt:quest.prompt,steps:quest.steps}))}))});
const failure=(status:number,code:string,message:string)=>({status,body:{error:{code,message}}});
const publicJourney=(journey:any)=>({id:journey.id,title:journey.title,goal:journey.goal,status:journey.status,version:journey.version,minutesPerDay:journey.minutesPerDay,templateKey:journey.templateKey});
const publicProposal=(proposal:any)=>({id:proposal.id,journeyId:proposal.journeyId,type:proposal.type,status:proposal.status,baseVersion:proposal.baseVersion,reason:proposal.reason,preview:proposal.previewJson,createdAt:proposal.createdAt});
const publicLearningPackage=(pack:any)=>pack?({...pack,outcome:{...pack.outcome,problem:{task:pack.outcome?.problem?.task,starterMaterial:pack.outcome?.problem?.starterMaterial,requirements:pack.outcome?.problem?.requirements,acceptanceCriteria:pack.outcome?.problem?.acceptanceCriteria,conceptNames:pack.outcome?.problem?.conceptNames,questions:(pack.outcome?.problem?.questions||[]).map(({conceptName,question,context,choices}:any)=>({conceptName,question,context,choices}))}}}):undefined;
const typeMap:Record<string,'LEARN'|'PRACTICE'|'ASSESSMENT'|'PROJECT'>={Learn:'LEARN',Review:'LEARN',Practice:'PRACTICE',Assessment:'ASSESSMENT',Project:'PROJECT'};

export async function generateJourneyProposal(db:any,playerId:string,input:any,now:Date){
 const track=trackById(input.templateKey);if(!track)return failure(400,'INVALID_TEMPLATE','Choose a supported learning template.');
 const generated=createRoadmap({trackId:input.templateKey,experience:input.experienceLevel,minutes:input.minutesPerDay,id:randomUUID()});
 const draft={...generated,title:input.title?.trim()||track.goal,goal:input.goal?.trim()||track.goal,minutesPerDay:generated.minutes,experienceLevel:generated.experience};
 const preview=previewOf(draft),journeyId=randomUUID();
 return db.transaction(async(tx:any)=>{
  await tx.insert(s.journeys).values({id:journeyId,playerId,title:draft.title,goal:draft.goal,status:'ARCHIVED',version:1,minutesPerDay:draft.minutes,experienceLevel:draft.experience,templateKey:'__pending__',createdAt:now,archivedAt:now});
  const [proposal]=await tx.insert(s.roadmapProposals).values({playerId,journeyId,baseVersion:1,type:'CREATE',status:'PENDING',reason:'Template roadmap preview',patchJson:{kind:'CREATE',draft},previewJson:preview,createdAt:now}).returning();
  return {status:201,body:{proposal:publicProposal(proposal)}};
 });
}

export async function generateCustomJourneyProposal(db:any,playerId:string,draft:any,now:Date){
 const journeyId=randomUUID(),preview={title:draft.title,goal:draft.goal,templateKey:draft.trackId,trackName:draft.trackName,basedOnJourneyId:draft.basedOnJourneyId||null,experienceLevel:draft.experienceLevel,minutesPerDay:draft.minutesPerDay,estimatedDays:draft.days,chapters:draft.chapters.map((chapter:any)=>({title:chapter.title,summary:chapter.summary,lane:chapter.lane,topics:chapter.topics,requires:chapter.requires,optional:chapter.optional,quests:chapter.quests.map((quest:any)=>({title:quest.title,type:quest.type,difficulty:quest.difficulty,xpReward:quest.xp,minutes:quest.minutes,prompt:quest.prompt,steps:quest.steps,description:quest.description,topic:quest.topic,resource:quest.resource,learningPackage:publicLearningPackage(quest.learningPackage)}))}))};
 return db.transaction(async(tx:any)=>{
  await tx.insert(s.journeys).values({id:journeyId,playerId,title:draft.title,goal:draft.goal,status:'ARCHIVED',version:1,minutesPerDay:draft.minutesPerDay,experienceLevel:draft.experienceLevel,templateKey:'__pending__',createdAt:now,archivedAt:now});
  const [proposal]=await tx.insert(s.roadmapProposals).values({playerId,journeyId,baseVersion:1,type:'CREATE',status:'PENDING',reason:'AI-generated custom roadmap preview',patchJson:{kind:'CREATE',draft},previewJson:preview,createdAt:now}).returning();
  return {status:201,body:{proposal:publicProposal(proposal)}};
 });
}

export async function listJourneys(db:any,playerId:string){
 const journeys=await db.select().from(s.journeys).where(eq(s.journeys.playerId,playerId)).orderBy(asc(s.journeys.createdAt));
 const proposals=await db.select().from(s.roadmapProposals).where(eq(s.roadmapProposals.playerId,playerId)).orderBy(asc(s.roadmapProposals.createdAt));
 return {journeys:journeys.filter((journey:any)=>journey.templateKey!=='__pending__').map(publicJourney),proposals:proposals.map(publicProposal)};
}

export async function createJourneyProposal(db:any,playerId:string,journeyId:string,input:any,now:Date){
 const [journey]=await db.select().from(s.journeys).where(and(eq(s.journeys.id,journeyId),eq(s.journeys.playerId,playerId))).limit(1);
 if(!journey||journey.templateKey==='__pending__')return failure(404,'JOURNEY_NOT_FOUND','This journey is not available.');
 if(journey.status!=='ACTIVE')return failure(409,'JOURNEY_STATE_CONFLICT','Only an active journey can be changed.');
 let patch:any,preview:any,reason:string;
 if(input.type==='PACING'){
  const quests=await db.select().from(s.quests).where(and(eq(s.quests.journeyId,journeyId),eq(s.quests.playerId,playerId)));
  const affected=quests.filter((quest:any)=>quest.status==='AVAILABLE'&&quest.minutes>input.minutesPerDay).map((quest:any)=>({questId:quest.id,title:quest.title,minutes:quest.minutes,xpReward:quest.xpReward,parts:Math.ceil(quest.minutes/input.minutesPerDay)}));
  patch={kind:'PACING',minutesPerDay:input.minutesPerDay};preview={previousMinutesPerDay:journey.minutesPerDay,minutesPerDay:input.minutesPerDay,affected};reason='Adjust daily study pace';
 }else{
  patch={kind:'MODIFY',...(input.title!==undefined?{title:input.title.trim()}:{}),...(input.goal!==undefined?{goal:input.goal.trim()}:{})};preview={...patch};reason='Update journey details';
 }
 const [proposal]=await db.insert(s.roadmapProposals).values({playerId,journeyId,baseVersion:journey.version,type:input.type,status:'PENDING',reason,patchJson:patch,previewJson:preview,createdAt:now}).returning();
 return {status:201,body:{proposal:publicProposal(proposal)}};
}

function splitMinutes(total:number,daily:number){const count=Math.ceil(total/daily),base=Math.floor(total/count),extra=total%count;return Array.from({length:count},(_,index)=>base+(index<extra?1:0));}
function splitXp(totalXp:number,durations:number[],originalMinutes:number){
 const allocated=durations.map(minutes=>Math.floor(totalXp*minutes/originalMinutes));let remainder=totalXp-allocated.reduce((sum,value)=>sum+value,0);
 for(let i=0;remainder>0;i=(i+1)%allocated.length,remainder--)allocated[i]!++;
 return allocated;
}

async function applyPacing(tx:any,journey:any,playerId:string,minutesPerDay:number,now:Date){
 const quests=await tx.select().from(s.quests).where(and(eq(s.quests.journeyId,journey.id),eq(s.quests.playerId,playerId))).orderBy(asc(s.quests.orderIndex));
 const stepsByQuest=new Map<string,any[]>();
 if(quests.length){
  const allSteps=await tx.select().from(s.questSteps).where(inArray(s.questSteps.questId,quests.map((quest:any)=>quest.id))).orderBy(asc(s.questSteps.orderIndex));
  for(const step of allSteps)stepsByQuest.set(step.questId,[...(stepsByQuest.get(step.questId)??[]),step]);
 }
 const expansions=quests.map((quest:any)=>{
  if(quest.status!=='AVAILABLE'||quest.minutes<=minutesPerDay)return {quest,parts:[{minutes:quest.minutes,xpReward:quest.xpReward}],split:false};
  const durations=splitMinutes(quest.minutes,minutesPerDay);const rewards=splitXp(quest.xpReward,durations,quest.minutes);
  return {quest,parts:durations.map((minutes,index)=>({minutes,xpReward:rewards[index]!,index,count:durations.length})),split:true};
 });
 const splitRecords=expansions.filter((entry:any)=>entry.split);
 const protectedIndexes=new Set(quests.filter((quest:any)=>quest.status!=='AVAILABLE').map((quest:any)=>quest.orderIndex));
 const available=quests.filter((quest:any)=>quest.status==='AVAILABLE');
 for(let i=0;i<available.length;i++)await tx.update(s.quests).set({orderIndex:-2147483000+i}).where(eq(s.quests.id,available[i].id));
 let orderIndex=0;const nextOrder=()=>{while(protectedIndexes.has(orderIndex))orderIndex++;const next=orderIndex++;return next;};const generated:string[]=[];
 for(const entry of expansions){
  const {quest,parts,split}=entry as any;
  if(quest.status!=='AVAILABLE')continue;
  if(!split){await tx.update(s.quests).set({orderIndex:nextOrder(),updatedAt:now}).where(eq(s.quests.id,quest.id));continue;}
  const originalSteps=stepsByQuest.get(quest.id)??[];
  for(let index=0;index<parts.length;index++){
   const part=parts[index],title=`${quest.title} · Part ${index+1}/${parts.length}`,partOrderIndex=nextOrder();
   if(index===0){await tx.update(s.quests).set({title,minutes:part.minutes,xpReward:part.xpReward,orderIndex:partOrderIndex,updatedAt:now}).where(eq(s.quests.id,quest.id));generated.push(quest.id);}
   else{
    const id=randomUUID();const [created]=await tx.insert(s.quests).values({id,journeyId:quest.journeyId,playerId:quest.playerId,chapterId:quest.chapterId,type:quest.type,assessmentSubtype:quest.assessmentSubtype,title,description:quest.description,topic:quest.topic,prompt:quest.prompt,difficulty:quest.difficulty,xpReward:part.xpReward,minutes:part.minutes,status:'AVAILABLE',orderIndex:partOrderIndex,source:quest.source,metadata:quest.metadata,createdAt:now,updatedAt:now}).returning({id:s.quests.id});
    for(const step of originalSteps)await tx.insert(s.questSteps).values({questId:created.id,orderIndex:step.orderIndex,content:step.content,completed:false,completedAt:null});generated.push(id);
   }
  }
 }
 return {splitQuestIds:splitRecords.map((entry:any)=>entry.quest.id),generatedQuestIds:generated};
}

async function createAcceptedJourney(tx:any,journey:any,draft:any,now:Date){
 if(!Array.isArray(draft.chapters)||!draft.chapters.length)throw new Error('Stored roadmap proposal is invalid.');
 let questOrderIndex=0;
 for(let chapterIndex=0;chapterIndex<draft.chapters.length;chapterIndex++){
  const sourceChapter=draft.chapters[chapterIndex],chapterId=randomUUID();
  await tx.insert(s.chapters).values({id:chapterId,journeyId:journey.id,title:sourceChapter.title,summary:sourceChapter.summary,orderIndex:chapterIndex,lane:sourceChapter.lane,metadata:{topics:sourceChapter.topics,requires:sourceChapter.requires,optional:sourceChapter.optional},createdAt:now});
  for(const sourceQuest of sourceChapter.quests){
   const questId=randomUUID(),type=typeMap[sourceQuest.type];if(!type)throw new Error('Stored roadmap contains an unsupported quest type.');
   await tx.insert(s.quests).values({id:questId,journeyId:journey.id,playerId:journey.playerId,chapterId,type,assessmentSubtype:null,title:sourceQuest.title,description:sourceQuest.description,topic:sourceQuest.topic,prompt:sourceQuest.prompt,difficulty:sourceQuest.difficulty,xpReward:sourceQuest.xp,minutes:sourceQuest.minutes,status:'AVAILABLE',orderIndex:questOrderIndex++,source:'TEMPLATE',metadata:{originalType:sourceQuest.type,checks:sourceQuest.checks,resource:sourceQuest.resource,...(sourceQuest.learningPackage?{learningPackage:sourceQuest.learningPackage}:{})},createdAt:now,updatedAt:now});
   for(let stepIndex=0;stepIndex<sourceQuest.steps.length;stepIndex++)await tx.insert(s.questSteps).values({questId,orderIndex:stepIndex,content:sourceQuest.steps[stepIndex],completed:false});
  }
 }
}

export async function acceptJourneyProposal(db:any,playerId:string,proposalId:string,now:Date){
 return db.transaction(async(tx:any)=>{
  const [proposal]=await tx.select().from(s.roadmapProposals).where(and(eq(s.roadmapProposals.id,proposalId),eq(s.roadmapProposals.playerId,playerId))).limit(1).for('update');
  if(!proposal)return failure(404,'PROPOSAL_NOT_FOUND','This proposal is not available.');
  if(proposal.status!=='PENDING')return failure(409,'PROPOSAL_STATE_CONFLICT','This proposal has already been decided.');
  const [journey]=await tx.select().from(s.journeys).where(and(eq(s.journeys.id,proposal.journeyId),eq(s.journeys.playerId,playerId))).limit(1).for('update');
  if(!journey)return failure(404,'JOURNEY_NOT_FOUND','This journey is not available.');
  if(journey.version!==proposal.baseVersion){await tx.update(s.roadmapProposals).set({status:'EXPIRED',decidedAt:now}).where(eq(s.roadmapProposals.id,proposal.id));return failure(409,'PROPOSAL_STALE','This preview is out of date. Create a new proposal.');}
  const patch=proposal.patchJson as Record<string,any>,versionTo=journey.version+1;let diff:any;
  if(proposal.type==='CREATE'){
   if(patch.kind!=='CREATE'||journey.templateKey!=='__pending__')return failure(409,'PROPOSAL_INVALID','This roadmap proposal cannot be applied.');
   await createAcceptedJourney(tx,journey,patch.draft,now);
   const draft=patch.draft;
   const [updated]=await tx.update(s.journeys).set({title:draft.title,goal:draft.goal,status:'ACTIVE',version:versionTo,minutesPerDay:draft.minutesPerDay,experienceLevel:draft.experienceLevel,templateKey:draft.trackId,archivedAt:null}).where(eq(s.journeys.id,journey.id)).returning();
   diff={kind:'CREATE',templateKey:draft.trackId,chapterCount:draft.chapters.length,basedOnJourneyId:draft.basedOnJourneyId||null};
   await tx.insert(s.roadmapRevisions).values({journeyId:journey.id,versionFrom:journey.version,versionTo,reason:'Initial template roadmap accepted',diffJson:diff,createdAt:now});
   await tx.update(s.roadmapProposals).set({status:'ACCEPTED',decidedAt:now}).where(eq(s.roadmapProposals.id,proposal.id));
   return {status:200,body:{journey:publicJourney(updated),proposalStatus:'ACCEPTED'}};
  }
  if(journey.status!=='ACTIVE')return failure(409,'JOURNEY_STATE_CONFLICT','Only an active journey can be changed.');
  if(proposal.type==='PACING'&&patch.kind==='PACING'){
   const split=await applyPacing(tx,journey,playerId,patch.minutesPerDay,now);
   const [updated]=await tx.update(s.journeys).set({minutesPerDay:patch.minutesPerDay,version:versionTo}).where(eq(s.journeys.id,journey.id)).returning();
   diff={kind:'PACING',minutesPerDay:{from:journey.minutesPerDay,to:patch.minutesPerDay},...split};
   await tx.insert(s.roadmapRevisions).values({journeyId:journey.id,versionFrom:journey.version,versionTo,reason:proposal.reason,diffJson:diff,createdAt:now});
   await tx.update(s.roadmapProposals).set({status:'ACCEPTED',decidedAt:now}).where(eq(s.roadmapProposals.id,proposal.id));
   return {status:200,body:{journey:publicJourney(updated),proposalStatus:'ACCEPTED'}};
  }
  if(proposal.type==='MODIFY'&&patch.kind==='MODIFY'){
   const update:any={version:versionTo};if(typeof patch.title==='string')update.title=patch.title;if(typeof patch.goal==='string')update.goal=patch.goal;
   const [updated]=await tx.update(s.journeys).set(update).where(eq(s.journeys.id,journey.id)).returning();
   diff={kind:'MODIFY',title:patch.title??journey.title,goal:patch.goal??journey.goal};
   await tx.insert(s.roadmapRevisions).values({journeyId:journey.id,versionFrom:journey.version,versionTo,reason:proposal.reason,diffJson:diff,createdAt:now});
   await tx.update(s.roadmapProposals).set({status:'ACCEPTED',decidedAt:now}).where(eq(s.roadmapProposals.id,proposal.id));
   return {status:200,body:{journey:publicJourney(updated),proposalStatus:'ACCEPTED'}};
  }
  return failure(409,'PROPOSAL_INVALID','This proposal cannot be applied.');
 });
}

export async function rejectJourneyProposal(db:any,playerId:string,proposalId:string,now:Date){
 const [proposal]=await db.update(s.roadmapProposals).set({status:'REJECTED',decidedAt:now}).where(and(eq(s.roadmapProposals.id,proposalId),eq(s.roadmapProposals.playerId,playerId),eq(s.roadmapProposals.status,'PENDING'))).returning();
 if(!proposal){const [exists]=await db.select({id:s.roadmapProposals.id}).from(s.roadmapProposals).where(and(eq(s.roadmapProposals.id,proposalId),eq(s.roadmapProposals.playerId,playerId))).limit(1);return exists?failure(409,'PROPOSAL_STATE_CONFLICT','This proposal has already been decided.'):failure(404,'PROPOSAL_NOT_FOUND','This proposal is not available.');}
 return {status:200,body:{status:proposal.status}};
}

export async function setJourneyStatus(db:any,playerId:string,journeyId:string,action:'finish'|'archive',now:Date){
 return db.transaction(async(tx:any)=>{
  const [journey]=await tx.select().from(s.journeys).where(and(eq(s.journeys.id,journeyId),eq(s.journeys.playerId,playerId))).limit(1).for('update');
  if(!journey||journey.templateKey==='__pending__')return failure(404,'JOURNEY_NOT_FOUND','This journey is not available.');
  if(action==='finish'&&journey.status==='COMPLETED')return {status:200,body:{journey:publicJourney(journey)}};
  if(action==='archive'&&journey.status==='ARCHIVED')return {status:200,body:{journey:publicJourney(journey)}};
  if(journey.status!=='ACTIVE')return failure(409,'JOURNEY_STATE_CONFLICT','Only an active journey can be changed.');
  const status=action==='finish'?'COMPLETED':'ARCHIVED';
  const [updated]=await tx.update(s.journeys).set({status,...(action==='finish'?{completedAt:now}:{archivedAt:now})}).where(eq(s.journeys.id,journeyId)).returning();
  if(action==='finish')await evaluateProgression(tx,playerId,now);
  return {status:200,body:{journey:publicJourney(updated)}};
 });
}
