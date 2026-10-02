export const achievementsSeed=[
 ['first_steps','First Steps','Complete your first quest.','quest.count.1',10],['first_grimoire','First Grimoire','Complete your first journey.','journey.completed.1',25],['curious_mind','Curious Mind','Discover or explore ten concepts.','concept.discovered.10',15],['seven_suns','Seven Suns','Maintain a seven-day streak.','streak.days.7',25],['deep_diver','Deep Diver','Apply your understanding of a concept.','knowledge.applying.1',15],['scholar','Scholar','Master a concept through sustained practice.','knowledge.mastered.1',50],['branching_out','Branching Out','Explore three knowledge domains.','domain.explored.3',20],['polymath','Polymath','Reach Apprentice in three domains.','domain.apprentice.3',50]
].map(([key,name,description,ruleKey,rewardCoins])=>({key,name,description,ruleKey,rewardCoins,iconAssetKey:key,active:true}));
export const milestonesSeed=[
 ...[10,25,50,100].map(n=>({key:`quests_${n}`,category:'QUEST_COUNT',threshold:n,name:`${n} small victories`,description:`Complete ${n} learning activities.`,rewardCoins:n===10?10:20})),
 ...[500,1000,5000].map(n=>({key:`xp_${n}`,category:'XP',threshold:n,name:`${n} XP`,description:`Earn ${n} experience points.`,rewardCoins:n===500?15:30})),
 ...[10,25,50].map(n=>({key:`knowledge_${n}`,category:'UNDERSTANDING_CONCEPTS',threshold:n,name:`${n} concepts understood`,description:`Reach understanding in ${n} concepts.`,rewardCoins:n===10?20:40}))
].map(item=>({...item,active:true}));
export const inventorySeed=[
 ['avatar_scribe','AVATAR','The Scribe','A curious keeper of many branches.','COMMON','avatars/scribe.png'],
 ['avatar_explorer','AVATAR','The Explorer','A traveler through uncharted ideas.','COMMON','avatars/explorer.png'],
 ['avatar_artificer','AVATAR','The Artificer','A maker of useful things.','COMMON','avatars/artificer.png'],
 ['frame_burnished','FRAME','Burnished Frame','A warm brass frame for a well-kept grimoire.','COMMON','frames/burnished.svg'],
 ['title_pathfinder','TITLE','Pathfinder','An honor for exploring new branches.','UNCOMMON','titles/pathfinder.svg']
].map(([key,category,name,description,rarity,assetKey])=>({key,category,name,description,rarity,assetKey,priceCoins:0,active:true}));
