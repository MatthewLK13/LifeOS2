import {CONCEPTS,INITIAL_MESSAGES,trackById} from './data.js';

const questStatus={AVAILABLE:'active',IN_PROGRESS:'in-progress',COMPLETED:'completed',SKIPPED:'cancelled'};
const journeyStatus={ACTIVE:'active',COMPLETED:'completed',ARCHIVED:'archived'};
const conceptStatus={UNSEEN:'unobserved',DISCOVERED:'discovered',EXPLORING:'exploring',UNDERSTANDING:'understanding',APPLYING:'applying',MASTERED:'mastered'};
const questType={LEARN:'Learn',PRACTICE:'Practice',ASSESSMENT:'Assessment',PROJECT:'Project'};
const questView=q=>({
 id:q.id,journeyId:q.journeyId,chapter:q.chapterOrderIndex??0,trackId:q.trackId??'',topic:q.topic??q.title,
 title:q.title,type:q.metadata?.originalType??questType[q.type]??'Learn',difficulty:q.difficulty??'C',xp:q.xpReward,
 minutes:q.minutes,status:questStatus[q.status]??'active',checks:(q.steps??[]).flatMap((step,index)=>step.completed?[index]:[]),
 notes:q.notes??'',description:q.description??'',prompt:q.prompt??'',steps:(q.steps??[]).map(step=>step.content),stepIds:(q.steps??[]).map(step=>step.id),resource:q.metadata?.resource??'#'
});

export function toViewState(apiState){
 const colors={gold:'#96711d',violet:'#795286',green:'#3f6b45',blue:'#385e79',red:'#b23a1f'};
 const domainDtos=(apiState.knowledge.domains??[]).map(domain=>({id:domain.key??domain.id,key:domain.key??domain.id,name:domain.name,description:domain.description??'',icon:domain.iconKey??'tree',color:colors[domain.colorKey]??domain.colorKey??'#96711d',dynamic:domain.source==='AI_DYNAMIC'}));
 const trackByDomain=new Map((apiState.knowledge.domains??[]).map(domain=>[domain.id,domain.key??domain.id]));
 const domainByKey=new Map(domainDtos.map(domain=>[domain.id,domain]));
 const quests=(apiState.quests??[]).map(q=>{
  const journey=(apiState.journeys??[]).find(item=>item.id===q.journeyId);
  const chapter=journey?.chapters?.find(item=>item.id===q.chapterId);
  return questView({...q,trackId:journey?.templateKey??'',chapterOrderIndex:chapter?.orderIndex});
 });
 const journeys=(apiState.journeys??[]).map(j=>({
  id:j.id,trackId:j.templateKey,title:j.title,goal:j.goal,experience:j.experienceLevel,minutes:j.minutesPerDay,
  version:j.version,status:journeyStatus[j.status]??'active',createdAt:j.createdAt,
  chapters:(j.chapters??[]).map(chapter=>({
   id:chapter.id,title:chapter.title,summary:chapter.summary,lane:chapter.lane,
   requires:chapter.metadata?.requires??[],optional:chapter.metadata?.optional??false,topics:chapter.metadata?.topics??[],
   quests:(chapter.quests??[]).map(q=>questView({...q,trackId:j.templateKey,chapterOrderIndex:chapter.orderIndex}))
  })),
  days:Math.ceil((j.chapters??[]).flatMap(chapter=>chapter.quests??[]).reduce((sum,q)=>sum+q.minutes,0)/Math.max(1,j.minutesPerDay))
 }));
 const conceptById=new Map((apiState.knowledge.concepts??[]).map(concept=>[concept.id,concept]));
 const concepts=CONCEPTS.map(seed=>{
  const remote=conceptById.get(seed.id);
  const domain=domainByKey.get(remote?.domainId??seed.trackId);
  return {...seed,trackId:remote?trackByDomain.get(remote.domainId)??remote.domainId:seed.trackId,scope:remote?.description??seed.scope,domainName:domain?.name??trackById(seed.trackId)?.name,domainIcon:domain?.icon,domainColor:domain?.color,status:conceptStatus[remote?.level]??'unobserved',evidence:[],serverBacked:true};
 }).concat((apiState.knowledge.concepts??[]).filter(concept=>!CONCEPTS.some(seed=>seed.id===concept.id)).map(concept=>({
  id:concept.id,trackId:trackByDomain.get(concept.domainId)??concept.domainId,name:concept.name,scope:concept.description??'',domainName:domainByKey.get(trackByDomain.get(concept.domainId)??concept.domainId)?.name??'Knowledge',domainIcon:domainByKey.get(trackByDomain.get(concept.domainId)??concept.domainId)?.icon??'tree',domainColor:domainByKey.get(trackByDomain.get(concept.domainId)??concept.domainId)?.color??'#96711d',status:conceptStatus[concept.level]??'unobserved',evidence:[],serverBacked:true
 })));
 const activeJourneyId=apiState.activeJourney?.id??journeys.find(j=>j.status==='active')?.id??null;
 const ranks=(apiState.knowledge.ranks??[]).map(rank=>({trackId:trackByDomain.get(rank.domainId)??rank.domainId,rank:rank.rank}));
 const messages=(apiState.conversation?.messages??[]).filter(message=>['USER','ASSISTANT'].includes(message.role)&&message.status==='COMPLETE').map(message=>({...message.id?{id:message.id}:{},role:message.role==='USER'?'user':'assistant',text:message.content,status:message.status,serverSaved:true}));
 return {
  mode:'server',schema:1,catalogVersion:4,profile:apiState.profile,xp:apiState.progress.totalXp,dailyXp:apiState.progress.dailyXp,
  rewardDay:apiState.profile.dailyXpDate,activeId:activeJourneyId,journeys,quests,concepts,domains:domainDtos,ranks,
  ledger:[],messages:messages.length?messages:structuredClone(INITIAL_MESSAGES),builder:{stage:'goal'},draft:null,proposal:null,
  memories:[],memoryCandidates:(apiState.memoryCandidates??[]).map(candidate=>({id:candidate.id,text:candidate.text,sourceConversationId:candidate.sourceConversationId??null,createdAt:candidate.createdAt})),preferences:{streak:true,inference:true,reducedMotion:false,...(apiState.profile.preferences??{}),...(apiState.preferences??{})},restDay:false,
  progress:apiState.progress,achievements:apiState.achievements??[],milestones:apiState.milestones??[],inventory:apiState.inventory??[],inventoryCatalog:apiState.inventoryCatalog??[],pushEnabled:apiState.pushEnabled===true,conversation:apiState.conversation??null
 };
}
