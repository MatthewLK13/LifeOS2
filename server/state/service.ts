import {and,asc,desc,eq,inArray,isNull,ne,or} from 'drizzle-orm';
import * as s from '../db/schema.ts';
import {localDateAt} from '../config/game-rules.ts';
import {calculateDomainRank} from '../knowledge/rank.ts';

const levelFor=(xp:number)=>1+Math.floor(xp/100);
const safeResource=(value:unknown)=>{if(typeof value!=='string'||value.length>2048)return undefined;try{const url=new URL(value);return url.protocol==='https:'?url.href:undefined;}catch{return undefined;}};
const safeLearningPackage=(value:unknown)=>{if(!value||typeof value!=='object')return undefined;const pack=value as any,learn=pack.learn,practice=pack.practice,outcome=pack.outcome,problem=outcome?.problem;if(typeof learn?.explanation!=='string'||typeof learn?.example!=='string'||typeof practice?.scenario!=='string'||!Array.isArray(practice?.steps)||!['Assessment','Project'].includes(outcome?.type)||typeof outcome?.prompt!=='string'||typeof outcome?.deliverable!=='string'||!Array.isArray(outcome?.rubric)||typeof problem?.task!=='string')return undefined;return {learn:{explanation:learn.explanation.slice(0,900),example:learn.example.slice(0,500)},practice:{scenario:practice.scenario.slice(0,600),steps:practice.steps.filter((item:any)=>typeof item==='string').slice(0,6).map((item:string)=>item.slice(0,180))},outcome:{type:outcome.type,prompt:outcome.prompt.slice(0,600),deliverable:outcome.deliverable.slice(0,240),rubric:outcome.rubric.filter((item:any)=>typeof item==='string').slice(0,5).map((item:string)=>item.slice(0,160)),problem:{task:problem.task.slice(0,1200),starterMaterial:String(problem.starterMaterial||'').slice(0,1600),requirements:Array.isArray(problem.requirements)?problem.requirements.filter((item:any)=>typeof item==='string').slice(0,8):[],acceptanceCriteria:Array.isArray(problem.acceptanceCriteria)?problem.acceptanceCriteria.filter((item:any)=>typeof item==='string').slice(0,8):[],conceptNames:Array.isArray(problem.conceptNames)?problem.conceptNames.filter((item:any)=>typeof item==='string').slice(0,6):[],questions:Array.isArray(problem.questions)?problem.questions.slice(0,5).map((q:any)=>({conceptName:q.conceptName,question:q.question,context:q.context,choices:Array.isArray(q.choices)?q.choices.slice(0,6):[]})):[]}}};};
const safeQuestMetadata=(value:Record<string,unknown>)=>({
 ...(Array.isArray(value.checks)&&value.checks.every(item=>Number.isSafeInteger(item))?{checks:value.checks}:{}),
 ...(['Learn','Review','Practice','Assessment','Project'].includes(String(value.originalType))?{originalType:value.originalType}:{}),
 ...(safeResource(value.resource)?{resource:safeResource(value.resource)}:{}),
 ...(safeLearningPackage(value.learningPackage)?{learningPackage:safeLearningPackage(value.learningPackage)}:{})
});
const safeChapterMetadata=(value:Record<string,unknown>)=>({
 ...(Array.isArray(value.topics)&&value.topics.every(item=>typeof item==='string')?{topics:value.topics}:{}),
 ...(Array.isArray(value.requires)&&value.requires.every(item=>Number.isSafeInteger(item))?{requires:value.requires}:{}),
 ...(typeof value.optional==='boolean'?{optional:value.optional}:{})
});

export async function getPlayerState(db:any,playerId:string,timezone:string,now=new Date()){
 const [profile]=await db.select().from(s.profiles).where(eq(s.profiles.playerId,playerId)).limit(1);
 if(!profile)return null;
 const [player]=await db.select({id:s.players.id,role:s.players.role}).from(s.players).where(eq(s.players.id,playerId)).limit(1);
 if(!player)return null;
 const journeys=await db.select().from(s.journeys).where(and(eq(s.journeys.playerId,playerId),or(isNull(s.journeys.templateKey),ne(s.journeys.templateKey,'__pending__')))).orderBy(asc(s.journeys.createdAt));
 const journeyIds=journeys.map((journey:any)=>journey.id);
 const chapters=journeyIds.length?await db.select().from(s.chapters).where(inArray(s.chapters.journeyId,journeyIds)).orderBy(asc(s.chapters.orderIndex)):[];
 const quests=await db.select().from(s.quests).where(eq(s.quests.playerId,playerId)).orderBy(asc(s.quests.orderIndex));
 const questIds=quests.map((quest:any)=>quest.id);
 const [steps,notes]=await Promise.all([
  questIds.length?db.select().from(s.questSteps).where(inArray(s.questSteps.questId,questIds)).orderBy(asc(s.questSteps.orderIndex)):[],
  questIds.length?db.select().from(s.questNotes).where(eq(s.questNotes.playerId,playerId)):[]
 ]);
 const stepGroups=new Map<string,any[]>();for(const step of steps){const list=stepGroups.get(step.questId)??[];list.push(step);stepGroups.set(step.questId,list);}
 const noteByQuest=new Map(notes.map((note:any)=>[note.questId,note.content]));
 const questDtos=quests.map((quest:any)=>({id:quest.id,journeyId:quest.journeyId,chapterId:quest.chapterId,type:quest.type,assessmentSubtype:quest.assessmentSubtype,title:quest.title,description:quest.description,topic:quest.topic,prompt:quest.prompt,difficulty:quest.difficulty,xpReward:quest.xpReward,minutes:quest.minutes,status:quest.status,orderIndex:quest.orderIndex,source:quest.source,metadata:safeQuestMetadata(quest.metadata??{}),startedAt:quest.startedAt,completedAt:quest.completedAt,skippedAt:quest.skippedAt,steps:(stepGroups.get(quest.id)??[]).map((step:any)=>({id:step.id,orderIndex:step.orderIndex,content:step.content,completed:step.completed,completedAt:step.completedAt})),notes:noteByQuest.get(quest.id)??''}));
 const chapterDtos=chapters.map((chapter:any)=>({id:chapter.id,journeyId:chapter.journeyId,arcId:chapter.arcId,title:chapter.title,summary:chapter.summary,orderIndex:chapter.orderIndex,lane:chapter.lane,metadata:safeChapterMetadata(chapter.metadata??{}),quests:questDtos.filter((quest:any)=>quest.chapterId===chapter.id)}));
 const journeyDtos=journeys.map((journey:any)=>({id:journey.id,playerId:journey.playerId,title:journey.title,goal:journey.goal,status:journey.status,version:journey.version,minutesPerDay:journey.minutesPerDay,experienceLevel:journey.experienceLevel,templateKey:journey.templateKey,createdAt:journey.createdAt,completedAt:journey.completedAt,archivedAt:journey.archivedAt,chapters:chapterDtos.filter((chapter:any)=>chapter.journeyId===journey.id)}));
 const domainRows=await db.select({domain:s.domains,concept:s.concepts,progress:s.conceptProgress}).from(s.domains).leftJoin(s.concepts,and(eq(s.concepts.domainId,s.domains.id),or(isNull(s.concepts.ownerPlayerId),eq(s.concepts.ownerPlayerId,playerId)))).leftJoin(s.conceptProgress,and(eq(s.conceptProgress.conceptId,s.concepts.id),eq(s.conceptProgress.playerId,playerId))).where(or(isNull(s.domains.ownerPlayerId),eq(s.domains.ownerPlayerId,playerId))).orderBy(asc(s.domains.name),asc(s.concepts.name));
 const domainMap=new Map<string,any>(),conceptDtos:any[]=[],progressDtos:any[]=[],levelsByDomain=new Map<string,string[]>();
 for(const row of domainRows){const domain=row.domain,key=domain.key??domain.id;if(!domainMap.has(domain.id)){domainMap.set(domain.id,{id:key,key:domain.key,name:domain.name,description:domain.description,source:domain.source,iconKey:domain.iconKey,colorKey:domain.colorKey,concepts:[]});}
  const levels=levelsByDomain.get(domain.id)??[];levels.push(row.progress?.level??'UNSEEN');levelsByDomain.set(domain.id,levels);
  if(!row.concept)continue;
  const concept=row.concept,progress=row.progress,conceptKey=concept.key??concept.id;
  domainMap.get(domain.id).concepts.push(conceptKey);
  conceptDtos.push({id:conceptKey,key:concept.key,domainId:key,name:concept.name,description:concept.description,source:concept.source,level:progress?.level??'UNSEEN'});
  if(progress)progressDtos.push({conceptId:conceptKey,level:progress.level,firstSeenAt:progress.firstSeenAt,updatedAt:progress.updatedAt,masteredAt:progress.masteredAt});
 }
 const domainDtos=[...domainMap.values()];
 const ranks=domainRows.reduce((result:any[],row:any)=>{const key=row.domain.key??row.domain.id;if(result.some(item=>item.domainId===key))return result;const computed=calculateDomainRank(levelsByDomain.get(row.domain.id)??[]);result.push({domainId:key,rank:computed.rank});return result;},[]);
 const achievementRows=await db.select({unlockedAt:s.playerAchievements.unlockedAt,achievement:s.achievements}).from(s.playerAchievements).innerJoin(s.achievements,eq(s.achievements.id,s.playerAchievements.achievementId)).where(eq(s.playerAchievements.playerId,playerId)).orderBy(asc(s.playerAchievements.unlockedAt));
 const milestoneRows=await db.select({reachedAt:s.playerMilestones.reachedAt,milestone:s.milestones}).from(s.playerMilestones).innerJoin(s.milestones,eq(s.milestones.id,s.playerMilestones.milestoneId)).where(eq(s.playerMilestones.playerId,playerId)).orderBy(asc(s.playerMilestones.reachedAt));
 const [inventory,inventoryCatalog]=await Promise.all([db.select({unlockedAt:s.playerInventory.unlockedAt,item:s.inventoryItems}).from(s.playerInventory).innerJoin(s.inventoryItems,eq(s.inventoryItems.id,s.playerInventory.itemId)).where(eq(s.playerInventory.playerId,playerId)).orderBy(asc(s.playerInventory.unlockedAt)),db.select().from(s.inventoryItems).where(eq(s.inventoryItems.active,true))]);
 const [pushSubscription]=await db.select({id:s.pushSubscriptions.id}).from(s.pushSubscriptions).where(and(eq(s.pushSubscriptions.playerId,playerId),isNull(s.pushSubscriptions.disabledAt))).limit(1);
 const [conversation]=await db.select().from(s.conversations).where(and(eq(s.conversations.playerId,playerId),eq(s.conversations.status,'ACTIVE'))).orderBy(desc(s.conversations.lastMessageAt)).limit(1);
 let conversationDto=null;
 if(conversation){const messages=await db.select().from(s.messages).where(and(eq(s.messages.conversationId,conversation.id),or(eq(s.messages.role,'USER'),eq(s.messages.role,'ASSISTANT')))).orderBy(asc(s.messages.createdAt));const [summary]=await db.select().from(s.conversationSummaries).where(and(eq(s.conversationSummaries.conversationId,conversation.id),eq(s.conversationSummaries.playerId,playerId))).limit(1);conversationDto={id:conversation.id,title:conversation.title,status:conversation.status,startedAt:conversation.startedAt,lastMessageAt:conversation.lastMessageAt,summary:summary?.summary??null,keyTopics:summary?.keyTopics??[],messages:messages.map((message:any)=>({id:message.id,role:message.role,content:message.content,status:message.status,createdAt:message.createdAt}))};}
 const memoryCandidates=await db.select({id:s.memories.id,text:s.memories.text,sourceConversationId:s.memories.sourceConversationId,createdAt:s.memories.createdAt}).from(s.memories).where(and(eq(s.memories.playerId,playerId),eq(s.memories.status,'PENDING'))).orderBy(asc(s.memories.createdAt));
 const activeJourneys=journeyDtos.filter((journey:any)=>journey.status==='ACTIVE'),activeIds=activeJourneys.map((journey:any)=>journey.id),latestRevision=activeIds.length?(await db.select({journeyId:s.roadmapRevisions.journeyId}).from(s.roadmapRevisions).where(inArray(s.roadmapRevisions.journeyId,activeIds)).orderBy(desc(s.roadmapRevisions.createdAt)).limit(1))[0]:null,activeJourney=(latestRevision?activeJourneys.find((journey:any)=>journey.id===latestRevision.journeyId):null)??activeJourneys.at(-1)??null;
 const dailyXp=profile.dailyXpDate===localDateAt(now,profile.timezone||timezone)?profile.dailyXp:0;
 return {profile:{playerId:profile.playerId,displayName:profile.displayName,role:player.role,coins:profile.coins,timezone:profile.timezone,dailyXpDate:profile.dailyXpDate,avatarItemId:profile.avatarItemId,frameItemId:profile.frameItemId,titleItemId:profile.titleItemId,grimoireSkinItemId:profile.grimoireSkinItemId,companionCosmeticItemId:profile.companionCosmeticItemId,preferences:profile.preferences,createdAt:profile.createdAt,updatedAt:profile.updatedAt},activeJourney,journeys:journeyDtos,quests:questDtos,knowledge:{domains:domainDtos,concepts:conceptDtos,progress:progressDtos,ranks},progress:{totalXp:profile.xp,level:levelFor(profile.xp),dailyXp,dailyXpCap:120,streak:profile.streak,longestStreak:profile.longestStreak,lastQuestCompletedDate:profile.lastQuestCompletedDate,asOf:now.toISOString(),timezone},achievements:achievementRows.map((row:any)=>({...row.achievement,unlockedAt:row.unlockedAt})),milestones:milestoneRows.map((row:any)=>({...row.milestone,reachedAt:row.reachedAt})),inventory:inventory.map((row:any)=>({...row.item,unlockedAt:row.unlockedAt})),inventoryCatalog,pushEnabled:Boolean(pushSubscription),conversation:conversationDto,memoryCandidates,preferences:profile.preferences};
}
