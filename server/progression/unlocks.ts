import {and,eq,sql} from 'drizzle-orm';
import * as s from '../db/schema.ts';
import {calculateDomainRank} from '../knowledge/rank.ts';

export async function evaluateProgression(tx:any,playerId:string,now=new Date()){
 const [profile]=await tx.select().from(s.profiles).where(eq(s.profiles.playerId,playerId)).limit(1);if(!profile)return {achievements:[],milestones:[]};
 const [quests,journeys,progress,domains,catalog,achievementRows,milestoneCatalog,milestoneRows]=await Promise.all([
  tx.select({status:s.quests.status}).from(s.quests).where(eq(s.quests.playerId,playerId)),
  tx.select({status:s.journeys.status,templateKey:s.journeys.templateKey}).from(s.journeys).where(eq(s.journeys.playerId,playerId)),
  tx.select({domainId:s.concepts.domainId,level:s.conceptProgress.level}).from(s.conceptProgress).innerJoin(s.concepts,eq(s.concepts.id,s.conceptProgress.conceptId)).where(eq(s.conceptProgress.playerId,playerId)),
  tx.select({id:s.domains.id}).from(s.domains).where(sql`${s.domains.ownerPlayerId} IS NULL OR ${s.domains.ownerPlayerId} = ${playerId}`),
  tx.select().from(s.achievements).where(eq(s.achievements.active,true)),
  tx.select({achievementId:s.playerAchievements.achievementId}).from(s.playerAchievements).where(eq(s.playerAchievements.playerId,playerId)),
  tx.select().from(s.milestones).where(eq(s.milestones.active,true)),
  tx.select({milestoneId:s.playerMilestones.milestoneId}).from(s.playerMilestones).where(eq(s.playerMilestones.playerId,playerId))
 ]);
 const completedQuestCount=quests.filter((row:any)=>row.status==='COMPLETED').length,completedJourneyCount=journeys.filter((row:any)=>row.status==='COMPLETED').length,discovered=progress.filter((row:any)=>row.level!=='UNSEEN'),understandingCount=progress.filter((row:any)=>['UNDERSTANDING','APPLYING','MASTERED'].includes(row.level)).length,applyingCount=progress.filter((row:any)=>['APPLYING','MASTERED'].includes(row.level)).length,masteredCount=progress.filter((row:any)=>row.level==='MASTERED').length;
 const byDomain=new Map<string,string[]>();for(const row of progress){const list=byDomain.get(row.domainId)??[];list.push(row.level);byDomain.set(row.domainId,list);}const exploredDomains=[...byDomain.values()].filter(levels=>calculateDomainRank(levels).discoveredCount>0).length,apprenticeDomains=[...byDomain.values()].filter(levels=>['Apprentice','Adept','Expert','Master'].includes(calculateDomainRank(levels).rank)).length;
 const rules:Record<string,boolean>={'quest.count.1':completedQuestCount>=1,'journey.completed.1':completedJourneyCount>=1,'concept.discovered.10':discovered.length>=10,'streak.days.7':profile.streak>=7,'knowledge.applying.1':applyingCount>=1,'knowledge.mastered.1':masteredCount>=1,'domain.explored.3':exploredDomains>=3,'domain.apprentice.3':apprenticeDomains>=3};
 const unlockedAchievements:any[]=[],knownAchievements=new Set(achievementRows.map((row:any)=>row.achievementId));
 for(const item of catalog){if(!rules[item.ruleKey]||knownAchievements.has(item.id))continue;const [created]=await tx.insert(s.playerAchievements).values({playerId,achievementId:item.id,unlockedAt:now}).onConflictDoNothing().returning({achievementId:s.playerAchievements.achievementId});if(!created)continue;unlockedAchievements.push(item);if(item.rewardCoins>0){await tx.update(s.profiles).set({coins:sql`${s.profiles.coins} + ${item.rewardCoins}`,updatedAt:now}).where(eq(s.profiles.playerId,playerId));await tx.insert(s.coinLedger).values({playerId,source:'achievement_reward',amount:item.rewardCoins,referenceKey:item.key,createdAt:now}).onConflictDoNothing();}}
 const thresholds:Record<string,number>={QUEST_COUNT:completedQuestCount,XP:profile.xp,UNDERSTANDING_CONCEPTS:understandingCount},knownMilestones=new Set(milestoneRows.map((row:any)=>row.milestoneId)),unlockedMilestones:any[]=[];
 for(const item of milestoneCatalog){if((thresholds[item.category]??0)<item.threshold||knownMilestones.has(item.id))continue;const [created]=await tx.insert(s.playerMilestones).values({playerId,milestoneId:item.id,reachedAt:now}).onConflictDoNothing().returning({milestoneId:s.playerMilestones.milestoneId});if(!created)continue;unlockedMilestones.push(item);if(item.rewardCoins>0){await tx.update(s.profiles).set({coins:sql`${s.profiles.coins} + ${item.rewardCoins}`,updatedAt:now}).where(eq(s.profiles.playerId,playerId));await tx.insert(s.coinLedger).values({playerId,source:'milestone_reward',amount:item.rewardCoins,referenceKey:item.key,createdAt:now}).onConflictDoNothing();}}
 return {achievements:unlockedAchievements,milestones:unlockedMilestones};
}
