import {and,eq} from 'drizzle-orm';
import * as s from '../db/schema.ts';
import {DAILY_XP_CAP,levelForXp,localDateAt} from '../config/game-rules.ts';
import {evaluateProgression} from '../progression/unlocks.ts';

const state=(quest:any)=>({id:quest.id,status:quest.status,startedAt:quest.startedAt,completedAt:quest.completedAt,skippedAt:quest.skippedAt});
const progress=(profile:any,dailyXp:number)=>({totalXp:profile.xp,level:levelForXp(profile.xp),dailyXp,dailyXpCap:DAILY_XP_CAP,streak:profile.streak,longestStreak:profile.longestStreak});
function nextStreak(lastDate:string|null,currentDate:string,streak:number){
 if(lastDate===currentDate)return streak;
 if(lastDate){const gap=(Date.parse(`${currentDate}T00:00:00Z`)-Date.parse(`${lastDate}T00:00:00Z`))/86400000;if(gap===1)return streak+1;}
 return 1;
}
async function ownedQuest(tx:any,playerId:string,questId:string,lock=true){
 let query=tx.select().from(s.quests).where(and(eq(s.quests.id,questId),eq(s.quests.playerId,playerId))).limit(1);
 if(lock)query=query.for('update');
 return (await query)[0]??null;
}
function missing(){return {status:404 as const,body:{error:{code:'QUEST_NOT_FOUND',message:'This quest is not available.'}}};}
function conflict(message:string){return {status:409 as const,body:{error:{code:'QUEST_STATE_CONFLICT',message}}};}

export async function startQuest(db:any,playerId:string,questId:string,now:Date){
 return db.transaction(async(tx:any)=>{
  const quest=await ownedQuest(tx,playerId,questId);if(!quest)return missing();
  if(quest.status==='COMPLETED'||quest.status==='SKIPPED')return conflict('This quest can no longer be started.');
  if(quest.status==='IN_PROGRESS')return {status:200,body:{quest:state(quest)}};
  const [updated]=await tx.update(s.quests).set({status:'IN_PROGRESS',startedAt:now,updatedAt:now}).where(eq(s.quests.id,questId)).returning();
  return {status:200,body:{quest:state(updated)}};
 });
}

export async function updateQuestStep(db:any,playerId:string,questId:string,stepId:string,completed:boolean,now:Date){
 return db.transaction(async(tx:any)=>{
  const quest=await ownedQuest(tx,playerId,questId);if(!quest)return missing();
  if(quest.status!=='IN_PROGRESS')return conflict('Start this quest before updating its steps.');
  const [step]=await tx.select().from(s.questSteps).where(and(eq(s.questSteps.id,stepId),eq(s.questSteps.questId,questId))).limit(1).for('update');
  if(!step)return {status:404 as const,body:{error:{code:'QUEST_STEP_NOT_FOUND',message:'This quest step is not available.'}}};
  const [updated]=await tx.update(s.questSteps).set({completed,completedAt:completed?now:null}).where(eq(s.questSteps.id,stepId)).returning();
  return {status:200,body:{step:{id:updated.id,completed:updated.completed,completedAt:updated.completedAt}}};
 });
}

export async function updateQuestNote(db:any,playerId:string,questId:string,content:string,now:Date){
 return db.transaction(async(tx:any)=>{
  const quest=await ownedQuest(tx,playerId,questId);if(!quest)return missing();
  if(quest.status==='COMPLETED'||quest.status==='SKIPPED')return conflict('Notes are locked after this quest ends.');
  const [note]=await tx.insert(s.questNotes).values({questId,playerId,content,updatedAt:now}).onConflictDoUpdate({target:s.questNotes.questId,set:{content,updatedAt:now}}).returning();
  return {status:200,body:{note:{questId:note.questId,content:note.content,updatedAt:note.updatedAt}}};
 });
}

export async function skipQuest(db:any,playerId:string,questId:string,now:Date){
 return db.transaction(async(tx:any)=>{
  const quest=await ownedQuest(tx,playerId,questId);if(!quest)return missing();
  if(quest.status==='COMPLETED')return conflict('Completed quests cannot be skipped.');
  if(quest.status==='SKIPPED')return {status:200,body:{quest:state(quest)}};
  const [updated]=await tx.update(s.quests).set({status:'SKIPPED',skippedAt:now,updatedAt:now}).where(eq(s.quests.id,questId)).returning();
  return {status:200,body:{quest:state(updated)}};
 });
}

export async function completeQuest(db:any,playerId:string,questId:string,timezone:string,now:Date){
 return db.transaction(async(tx:any)=>{
  const quest=await ownedQuest(tx,playerId,questId);if(!quest)return missing();
  const [profile]=await tx.select().from(s.profiles).where(eq(s.profiles.playerId,playerId)).limit(1).for('update');
  if(!profile)return {status:404 as const,body:{error:{code:'PLAYER_NOT_FOUND',message:'This player is not available.'}}};
  const today=localDateAt(now,profile.timezone||timezone),storedToday=profile.dailyXpDate===today;
  if(quest.status==='COMPLETED')return {status:200,body:{quest:state(quest),xpAwarded:0,progress:progress(profile,storedToday?profile.dailyXp:0),alreadyCompleted:true}};
  if(!['AVAILABLE','IN_PROGRESS'].includes(quest.status))return conflict('This quest cannot be completed in its current state.');
  const dailyXp=storedToday?profile.dailyXp:0,awarded=Math.min(quest.xpReward,Math.max(0,DAILY_XP_CAP-dailyXp));
  const streak=nextStreak(profile.lastQuestCompletedDate,today,profile.streak),totalXp=profile.xp+awarded,nextDailyXp=dailyXp+awarded;
  const [updatedQuest]=await tx.update(s.quests).set({status:'COMPLETED',completedAt:now,updatedAt:now}).where(eq(s.quests.id,questId)).returning();
  const [updatedProfile]=await tx.update(s.profiles).set({xp:totalXp,dailyXp:nextDailyXp,dailyXpDate:today,streak,longestStreak:Math.max(profile.longestStreak,streak),lastQuestCompletedDate:today,updatedAt:now}).where(eq(s.profiles.playerId,playerId)).returning();
  await tx.insert(s.xpLedger).values({playerId,questId,source:'quest_completion',amount:awarded,localDate:today,createdAt:now});
  const unlocks=await evaluateProgression(tx,playerId,now);
  return {status:200,body:{quest:state(updatedQuest),xpAwarded:awarded,progress:progress(updatedProfile,nextDailyXp),alreadyCompleted:false,unlocks}};
 });
}
