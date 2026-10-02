const MIN_READINESS_COVERAGE = 50;

const conceptSeeds = [
  ['java','Java','APPLYING',0.82,0.9,88,['APPLIED'],'Java'],
  ['sql','SQL','APPLYING',0.8,0.86,58,['APPLIED'],'Data'],
  ['http','HTTP','UNDERSTANDING',0.68,0.74,75,['ASSESSED'],'Backend Engineering'],
  ['rest-api','REST API','UNDERSTANDING',0.66,0.7,80,['ASSESSED'],'Backend Engineering'],
  ['authentication','Authentication','EXPLORING',0.48,0.56,72,['INFERRED','ASSESSED'],'Backend Engineering'],
  ['testing','Testing','DISCOVERED',0.3,0.38,64,['ASSESSED'],'Backend Engineering'],
  ['docker','Docker','UNSEEN',0.08,0.18,0,[],'Backend Engineering'],
  ['backend-engineering','Backend Engineering','DISCOVERED',0.28,0.35,44,['INFERRED'],'Backend Engineering'],
  ['python','Python','UNDERSTANDING',0.64,0.7,77,['ASSESSED'],'Programming'],
  ['statistics','Statistics','EXPLORING',0.42,0.52,62,['ASSESSED'],'AI & Data'],
  ['data-preparation','Data Preparation','DISCOVERED',0.32,0.42,51,['INFERRED'],'AI & Data'],
  ['machine-learning','Machine Learning','DISCOVERED',0.3,0.4,49,['ASSESSED'],'AI & Data'],
  ['model-evaluation','Model Evaluation','UNSEEN',0.1,0.2,0,['INFERRED'],'AI & Data'],
  ['data-cleaning','Data Cleaning','EXPLORING',0.4,0.5,65,['ASSESSED'],'Data Analytics'],
  ['data-visualization','Data Visualization','DISCOVERED',0.3,0.4,48,['INFERRED'],'Data Analytics'],
  ['business-questions','Business Questions','UNDERSTANDING',0.63,0.68,73,['ASSESSED'],'Data Analytics']
  ,['research-planning','Research Planning','EXPLORING',0.42,0.5,55,['INFERRED'],'UX Research']
  ,['interviewing','Interviewing','DISCOVERED',0.3,0.38,0,[],'UX Research']
  ,['usability-testing','Usability Testing','UNSEEN',0.1,0.2,0,[],'UX Research']
  ,['research-synthesis','Research Synthesis','DISCOVERED',0.28,0.35,0,[],'UX Research']
  ,['insight-communication','Insight Communication','UNSEEN',0.1,0.2,0,[],'UX Research']
  ,['research-impact','Research Impact','UNSEEN',0.1,0.2,0,[],'UX Research']
  ,['customer-insight','Customer Insight','EXPLORING',0.42,0.5,52,['INFERRED'],'Product Marketing']
  ,['positioning','Positioning','DISCOVERED',0.3,0.38,0,[],'Product Marketing']
  ,['messaging','Messaging','UNSEEN',0.1,0.2,0,[],'Product Marketing']
  ,['go-to-market-planning','Go-to-Market Planning','UNSEEN',0.1,0.2,0,[],'Product Marketing']
  ,['market-analysis','Market Analysis','DISCOVERED',0.28,0.35,0,[],'Product Marketing']
  ,['campaign-measurement','Campaign Measurement','UNSEEN',0.1,0.2,0,[],'Product Marketing']
].map(([key,name,masteryLevel,masteryProbability,confidence,freshness,evidenceStrength,domainName])=>({
  conceptId:`skill-${key}`,name,masteryLevel,masteryProbability,confidence,coverage:masteryLevel==='UNSEEN'?0:64,freshness,evidenceStrength,domainName
}));

const roles = {
  'backend-developer':{
    targetRole:{id:'backend-developer',name:'Backend Developer'},
    campaignName:'Backend Developer Campaign',readiness:58,coverage:72,confidence:'MEDIUM',
    skills:['java','sql','rest-api','authentication','testing','docker'],
    gaps:[['authentication','Applying','High'],['testing','Applying','High'],['docker','Understanding','Medium']],
    recommendations:[
      {kind:'RECOMMENDED',title:'Authentication Skill Check',minutes:10,xp:0,concepts:['authentication'],mode:'SKILL_CHECK',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
      {kind:'QUICK_WIN',title:'Review Authorization Headers',minutes:15,xp:10,concepts:['authentication'],why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
      {kind:'CHALLENGE',title:'Secure a REST API',minutes:45,xp:0,concepts:['authentication','rest-api','testing'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
    ],
    arcs:['Programming Foundations','Backend Core','Data & Persistence','Security & Testing','Production'],
    boss:{title:'Secure a REST API',concepts:['java','rest-api','authentication','testing']},
    courses:[{id:'docker-fundamentals',title:'Docker Fundamentals',provider:'Demo Partner',skillFit:91,level:'Beginner',duration:'7 hours',price:'399,000 VND',concepts:['Docker Basics','Containers','Docker Compose'],url:'https://example.com/demo/docker-fundamentals',category:'RECOMMENDED'}]
  },
  'ai-ml-engineer':{
    targetRole:{id:'ai-ml-engineer',name:'AI / ML Engineer'},
    campaignName:'AI / ML Engineer Campaign',readiness:46,coverage:63,confidence:'MEDIUM',
    skills:['python','statistics','data-preparation','machine-learning','model-evaluation','sql'],
    gaps:[['data-preparation','Applying','High'],['model-evaluation','Understanding','High'],['machine-learning','Applying','High']],
    recommendations:[
      {kind:'RECOMMENDED',title:'Prepare a Clean Training Dataset',minutes:30,xp:0,concepts:['data-preparation','machine-learning'],mode:'APPLIED_TRIAL',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
      {kind:'QUICK_WIN',title:'Review Train / Test Splits',minutes:15,xp:10,concepts:['model-evaluation'],why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
      {kind:'CHALLENGE',title:'Evaluate a Model Across Skewed Data',minutes:45,xp:0,concepts:['statistics','model-evaluation'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
    ],
    arcs:['Python & Data','Statistics','Machine Learning','Model Evaluation','Applied Systems'],
    boss:{title:'Build and Evaluate a Prediction Service',concepts:['python','data-preparation','machine-learning','model-evaluation']},
    courses:[{id:'ml-foundations',title:'Machine Learning Foundations',provider:'Demo Partner',skillFit:88,level:'Beginner',duration:'8 hours',price:'Free',concepts:['Training Data','Baseline Models','Evaluation'],url:'https://example.com/demo/ml-foundations',category:'RECOMMENDED'}]
  },
  'data-analyst':{
    targetRole:{id:'data-analyst',name:'Data Analyst'},
    campaignName:'Data Analyst Campaign',readiness:49,coverage:68,confidence:'MEDIUM',
    skills:['sql','python','statistics','data-cleaning','data-visualization','business-questions'],
    gaps:[['data-cleaning','Applying','High'],['statistics','Applying','High'],['data-visualization','Applying','Medium']],
    recommendations:[
      {kind:'RECOMMENDED',title:'Clean a Messy Sales Dataset',minutes:30,xp:0,concepts:['data-cleaning','sql'],mode:'APPLIED_TRIAL',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
      {kind:'QUICK_WIN',title:'Review SQL NULL Handling',minutes:15,xp:10,concepts:['sql','data-cleaning'],why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
      {kind:'CHALLENGE',title:'Present a Data-backed Recommendation',minutes:45,xp:0,concepts:['statistics','data-visualization','business-questions'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
    ],
    arcs:['Questions & Data','SQL Foundations','Data Preparation','Analysis & Statistics','Communication'],
    boss:{title:'Turn Sales Data into a Decision',concepts:['sql','data-cleaning','statistics','data-visualization']},
    courses:[{id:'data-analysis',title:'Practical Data Analysis',provider:'Demo Partner',skillFit:89,level:'Beginner',duration:'6 hours',price:'Free',concepts:['Data Cleaning','Exploratory Analysis','Data Stories'],url:'https://example.com/demo/practical-data-analysis',category:'RECOMMENDED'}]
  }
};

roles['ux-researcher']={
 targetRole:{id:'ux-researcher',name:'UX Researcher'},campaignName:'UX Researcher Campaign',readiness:52,coverage:61,confidence:'MEDIUM',
 skills:['research-planning','interviewing','usability-testing','research-synthesis','insight-communication','research-impact'],
 gaps:[['research-planning','Applying','High'],['interviewing','Understanding','High'],['usability-testing','Understanding','High']],
 recommendations:[
  {kind:'RECOMMENDED',title:'Research Planning Skill Check',minutes:10,xp:0,concepts:['research-planning'],mode:'SKILL_CHECK',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'QUICK_WIN',title:'Practice Interview Protocols',minutes:15,xp:0,concepts:['interviewing'],mode:'PRACTICE',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'CHALLENGE',title:'Run a Usability Study',minutes:45,xp:0,concepts:['research-planning','interviewing','usability-testing'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
 ],arcs:['Research Foundations','Interviewing','Usability Testing','Synthesis','Research Impact'],boss:{title:'Run a Usability Study',concepts:['research-planning','interviewing','usability-testing']},courses:[{id:'ux-research',title:'UX Research Fundamentals',provider:'Demo Partner',skillFit:90,level:'Beginner',duration:'5 hours',price:'Free',concepts:['Interviewing','Synthesis'],url:'https://example.com/demo/ux-research',category:'RECOMMENDED'}]
};
roles['product-marketing-manager']={
 targetRole:{id:'product-marketing-manager',name:'Product Marketing Manager'},campaignName:'Product Marketing Campaign',readiness:44,coverage:57,confidence:'LOW',
 skills:['customer-insight','positioning','messaging','go-to-market-planning','market-analysis','campaign-measurement'],
 gaps:[['customer-insight','Applying','High'],['positioning','Understanding','High'],['messaging','Understanding','High']],
 recommendations:[
  {kind:'RECOMMENDED',title:'Customer Insight Skill Check',minutes:10,xp:0,concepts:['customer-insight'],mode:'SKILL_CHECK',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'QUICK_WIN',title:'Review Positioning Statements',minutes:15,xp:0,concepts:['positioning'],mode:'LEARN',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'CHALLENGE',title:'Present a Go-to-Market Brief',minutes:45,xp:0,concepts:['customer-insight','positioning','messaging','go-to-market-planning'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
 ],arcs:['Customer Insight','Positioning','Messaging','Go-to-Market','Growth & Measurement'],boss:{title:'Present a Go-to-Market Brief',concepts:['customer-insight','positioning','messaging','go-to-market-planning']},courses:[{id:'product-marketing',title:'Product Marketing Foundations',provider:'Demo Partner',skillFit:87,level:'Beginner',duration:'4 hours',price:'Free',concepts:['Positioning','Messaging'],url:'https://example.com/demo/product-marketing',category:'RECOMMENDED'}]
};

const baseRelationships = [
  {fromConceptId:'skill-http',toConceptId:'skill-rest-api',type:'PREREQUISITE'},
  {fromConceptId:'skill-rest-api',toConceptId:'skill-authentication',type:'PREREQUISITE'},
  {fromConceptId:'skill-authentication',toConceptId:'skill-testing',type:'RELATED'},
  {fromConceptId:'skill-rest-api',toConceptId:'skill-backend-engineering',type:'PART_OF'},
  {fromConceptId:'skill-java',toConceptId:'skill-python',type:'TRANSFERABLE_TO'},
  {fromConceptId:'skill-sql',toConceptId:'skill-data-cleaning',type:'RELATED'},
  {fromConceptId:'skill-statistics',toConceptId:'skill-model-evaluation',type:'PREREQUISITE'},
  {fromConceptId:'skill-data-preparation',toConceptId:'skill-machine-learning',type:'PREREQUISITE'},
  {fromConceptId:'skill-sql',toConceptId:'skill-business-questions',type:'PART_OF'}
];

roles['backend-developer'].baselineDisplayReadiness=58;roles['backend-developer'].baselineCoverage=72;roles['backend-developer']._baselineReadinessRaw=61.534;roles['backend-developer']._baselineCoverageRaw=70.1;
roles['backend-developer'].skillRequirements=[
 {conceptId:'skill-java',targetMastery:'APPLYING',importance:'HIGH',requiredEvidence:'APPLIED'},
 {conceptId:'skill-sql',targetMastery:'APPLYING',importance:'HIGH',requiredEvidence:'APPLIED'},
 {conceptId:'skill-rest-api',targetMastery:'UNDERSTANDING',importance:'MEDIUM',requiredEvidence:'ASSESSED'},
 {conceptId:'skill-authentication',targetMastery:'APPLYING',importance:'HIGH',requiredEvidence:'APPLIED'},
 {conceptId:'skill-testing',targetMastery:'APPLYING',importance:'HIGH',requiredEvidence:'ASSESSED'},
 {conceptId:'skill-docker',targetMastery:'UNDERSTANDING',importance:'MEDIUM',requiredEvidence:'ASSESSED'}
];
roles['backend-developer'].arcDefinitions=[
 {id:'foundations',title:'Programming Foundations',conceptIds:['java','http']},
 {id:'backend-core',title:'Backend Core',conceptIds:['rest-api']},
 {id:'data',title:'Data & Persistence',conceptIds:['sql']},
 {id:'security-testing',title:'Security & Testing',conceptIds:['authentication','testing']},
 {id:'production',title:'Production',conceptIds:['docker']}
];
roles['ux-researcher'].skillRequirements=roles['ux-researcher'].skills.map((key,index)=>({conceptId:`skill-${key}`,targetMastery:index<2?'APPLYING':'UNDERSTANDING',importance:index<3?'HIGH':'MEDIUM',requiredEvidence:index<2?'ASSESSED':'INFERRED'}));
roles['ux-researcher'].arcDefinitions=['Research Foundations','Interviewing','Usability Testing','Synthesis','Research Impact'].map((title,index)=>({id:`ux-${index+1}`,title,conceptIds:[roles['ux-researcher'].skills[index]]}));
roles['product-marketing-manager'].skillRequirements=roles['product-marketing-manager'].skills.map((key,index)=>({conceptId:`skill-${key}`,targetMastery:index<2?'APPLYING':'UNDERSTANDING',importance:index<3?'HIGH':'MEDIUM',requiredEvidence:index<2?'ASSESSED':'INFERRED'}));
roles['product-marketing-manager'].arcDefinitions=['Customer Insight','Positioning','Messaging','Go-to-Market','Growth & Measurement'].map((title,index)=>({id:`pmm-${index+1}`,title,conceptIds:[roles['product-marketing-manager'].skills[index]]}));

function clone(value){return structuredClone(value);}

function readiness(coverage,score){
 return coverage<MIN_READINESS_COVERAGE?{status:'INSUFFICIENT_EVIDENCE'}:{status:'AVAILABLE',score};
}

function buildCareerState(state,roleId,coverageOverride){
 const role=roles[roleId];
 if(!role)return state;
 const coverage=coverageOverride??role.coverage;
 const concepts=state.learnerState.concepts;
 const conceptByKey=new Map(concepts.map(concept=>[concept.conceptId.replace('skill-',''),concept]));
 const criticalGaps=role.gaps.map(([key,targetMastery,importance])=>{
  const concept=conceptByKey.get(key);
  return {conceptId:concept.conceptId,name:concept.name,currentMastery:concept.masteryLevel,targetMastery,importance,evidenceStatus:concept.evidenceStrength.length?'Observed':'No evidence'};
 });
 const recommendations=clone(role.recommendations).map((action,index)=>{
  const {concepts:conceptKeys,...recommendation}=action;
  return {...recommendation,id:`${roleId}-${index}`,conceptIds:conceptKeys.map(key=>`skill-${key}`)};
 });
 const arcs=role.arcs.map((title,index)=>({
  id:`${roleId}-arc-${index+1}`,title,order:index+1,
  status:index===0?'COMPLETED':index===1?'CURRENT':'UPCOMING',
  adaptive:index>1,chapters:index===0?[{title:'Getting Oriented',status:'COMPLETED',questsCompleted:3}]:[]
 }));
 const bossQuest={
  id:`${roleId}-boss`,title:role.boss.title,difficulty:'BOSS',minutes:90,
  status:'READY',conceptIds:role.boss.concepts.map(key=>`skill-${key}`),
  skills:role.boss.concepts.map(key=>conceptByKey.get(key)?.name).filter(Boolean),
  prerequisites:role.boss.concepts.slice(0,2).map(key=>conceptByKey.get(key)?.name).filter(Boolean),
  expectedEvidence:['Working project submission','Explanation of design choices','Tests or verification notes'],
  objectives:['Implement the core solution','Address one realistic failure case','Explain how you verified the result'],
  instructions:`Build a small ${role.boss.title.toLowerCase()} project. Include your approach, one failure case, and evidence that the result works.`,
  potentialRewards:{xp:100,coins:40,title:'Career Campaign Builder'}
 };
 const skillPassport=role.skills.map(key=>{
  const concept=conceptByKey.get(key);
  return {conceptId:concept.conceptId,name:concept.name,masteryLevel:concept.masteryLevel,evidenceStrength:[...concept.evidenceStrength]};
 });
 return {
  ...state,
  career:{targetRole:clone(role.targetRole),readiness:readiness(coverage,role.readiness),coverage,confidence:role.confidence,criticalGaps},
  recommendations,
  campaign:{...state.campaign,targetRoleId:roleId,title:role.campaignName,arcs,bossQuests:[bossQuest]},
  learningHub:{...state.learningHub,courseRecommendations:[...clone(role.courses).map(course=>({...course,coveredSkills:[...course.concepts],fitReason:`Strong match for ${role.targetRole.name} skill gaps`,providerTrust:'Reviewed demo provider',sponsored:course.price!=='Free',commission:course.price==='Free'?0:75})),{id:`${roleId}-open-practice`,title:`${role.targetRole.name} Open Practice Lab`,provider:'LifeOS Open Library',skillFit:85,level:'Beginner',duration:'2 hours',price:'Free',concepts:role.skills.slice(0,2),url:'https://example.com/free-learning',category:'FREE',coveredSkills:role.skills.slice(0,2),fitReason:'Free practice for core role skills',providerTrust:'Open learning resource',sponsored:false,commission:0}],recommendedForGaps:clone(role.courses)},
  skillPassport:{title:`${role.targetRole.name.replace(' Intern','').toUpperCase()} SKILL PASSPORT`,skills:skillPassport}
 };
}

const MASTERY_SCORE={UNSEEN:0,DISCOVERED:.25,EXPLORING:.45,UNDERSTANDING:.65,APPLYING:.85,MASTERED:1};
const EVIDENCE_FACTOR={NONE:.6,INFERRED:.75,ASSESSED:.9,APPLIED:1};
const IMPORTANCE_WEIGHT={HIGH:1.3,MEDIUM:1.1,SUPPORTING:1};
const EVIDENCE_COVERAGE={NONE:0,INFERRED:.35,ASSESSED:.7,APPLIED:1};
const targetFor=(role,key)=>role.skillRequirements?.find(item=>item.conceptId===`skill-${key}`);
function roleRequirements(role){
 const gaps=new Map(role.gaps.map(([key,target,importance])=>[key,{targetMastery:target,importance}]));
 return role.skills.map((key,index)=>{const configured=gaps.get(key);return {conceptId:`skill-${key}`,targetMastery:configured?.targetMastery||'UNDERSTANDING',importance:configured?.importance|| (index<2?'HIGH':'MEDIUM'),requiredEvidence:configured?.targetMastery==='Applying'?'APPLIED':configured?.targetMastery==='Understanding'?'ASSESSED':'ASSESSED'};});
}
function strongestEvidence(concept){return concept.evidenceStrength?.at(-1)||'NONE';}
export function deriveCareerCoverage(state,role){
 const concepts=new Map(state.learnerState.concepts.map(item=>[item.conceptId,item]));
 const req=role.skillRequirements||roleRequirements(role); let total=0,weight=0;
 for(const item of req){const c=concepts.get(item.conceptId);if(!c)continue;const w=IMPORTANCE_WEIGHT[item.importance]||1;total+=(EVIDENCE_COVERAGE[strongestEvidence(c)]||0)*w;weight+=w;}
 const raw=weight?Math.round(total/weight*100):0;if(state.learnerPreset==='new-learner')return raw;const baseline=role.baselineCoverage??role.coverage??raw;const baseRaw=role._baselineCoverageRaw??Math.max(raw,.01);return Math.max(0,Math.min(100,Math.round(baseline+(raw-baseRaw)*.65)));
}
export function deriveRawCareerReadiness(state,role){
 const concepts=new Map(state.learnerState.concepts.map(item=>[item.conceptId,item]));const req=role.skillRequirements||roleRequirements(role);let total=0,weight=0;
 for(const item of req){const c=concepts.get(item.conceptId);if(!c)continue;const w=IMPORTANCE_WEIGHT[item.importance]||1;const evidence=EVIDENCE_FACTOR[strongestEvidence(c)]||EVIDENCE_FACTOR.NONE;const target=MASTERY_SCORE[item.targetMastery.toUpperCase()]||.65;total+=((MASTERY_SCORE[c.masteryLevel]||0)*evidence/target)*w;weight+=w;}
 return weight?Math.max(0,Math.min(100,total/weight*100)):0;
}
export function deriveCareerReadiness(state,role,coverage=deriveCareerCoverage(state,role)){
 if(coverage<MIN_READINESS_COVERAGE)return {status:'INSUFFICIENT_EVIDENCE'};
 const raw=deriveRawCareerReadiness(state,role);if(state.learnerPreset==='new-learner')return {status:'AVAILABLE',score:Math.round(raw)};const baselineRaw=role._baselineReadinessRaw??raw;const baseline=role.baselineDisplayReadiness??role.readiness??Math.round(raw);const score=Math.max(0,Math.min(100,Math.round(baseline+(raw-baselineRaw)*.6)));return {status:'AVAILABLE',score};
}
export function deriveCareerConfidence(state,role,coverage=deriveCareerCoverage(state,role)){
 const concepts=new Map(state.learnerState.concepts.map(item=>[item.conceptId,item]));const req=role.skillRequirements||roleRequirements(role);const avg=req.reduce((sum,item)=>sum+(concepts.get(item.conceptId)?.confidence||0),0)/(req.length||1);const value=(avg*.6+coverage/100*.4);return value>=.8?'HIGH':value>=.5?'MEDIUM':'LOW';
}
export function deriveCriticalGaps(state,role){
 const concepts=new Map(state.learnerState.concepts.map(item=>[item.conceptId,item]));const req=role.skillRequirements||roleRequirements(role);return req.map(item=>{const concept=concepts.get(item.conceptId);if(!concept)return null;const evidence=strongestEvidence(concept);let gapReason='';if(state.learnerPreset==='backend-stale'&&concept.freshness<60&&evidence!=='NONE'&&MASTERY_SCORE[concept.masteryLevel]>=MASTERY_SCORE.UNDERSTANDING)gapReason='STALE_EVIDENCE';else if(MASTERY_SCORE[concept.masteryLevel]<MASTERY_SCORE[item.targetMastery.toUpperCase()])gapReason='LOW_MASTERY';else if(item.requiredEvidence&&!concept.evidenceStrength.includes(item.requiredEvidence))gapReason=item.requiredEvidence==='APPLIED'?'MISSING_APPLIED':'MISSING_ASSESSED';else if(concept.confidence<.65)gapReason='LOW_CONFIDENCE';if(!gapReason)return null;return {conceptId:concept.conceptId,name:concept.name,currentMastery:concept.masteryLevel,targetMastery:item.targetMastery,importance:item.importance,evidenceStatus:evidence==='NONE'?'No evidence':'Observed',gapReason,freshness:concept.freshness,confidence:concept.confidence};}).filter(Boolean).sort((a,b)=>(IMPORTANCE_WEIGHT[b.importance]-IMPORTANCE_WEIGHT[a.importance])||((a.gapReason==='STALE_EVIDENCE'?1:0)-(b.gapReason==='STALE_EVIDENCE'?1:0))).slice(0,3);
}
function actionTemplate(role,gap,mode,index){const key=gap?.conceptId?.replace('skill-','')||role.skills[index%role.skills.length];const name=stateConceptNameCache.get(key)||key;const titles={RECALL:`Recall ${name}`,SKILL_CHECK:`${name} Skill Check`,APPLIED_TRIAL:name==='Authentication'?'Implement JWT Authentication':`Apply ${name} in a Project`,LEARN:`Learn ${name} Foundations`,PRACTICE:`Practice ${name}`,BOSS:role.boss.title};return {kind:'RECOMMENDED',title:titles[mode]||titles.SKILL_CHECK,minutes:mode==='BOSS'?45:mode==='APPLIED_TRIAL'?30:mode==='RECALL'?12:mode==='SKILL_CHECK'?10:20,xp:0,conceptIds:gap?[gap.conceptId]:[`skill-${key}`],mode,why:{careerRelevance:'High',skillGap:gap?.importance||'Medium',prerequisiteReadiness:'Strong',evidenceNeed:gap?.gapReason||'Current state',timeFit:'Perfect',difficultyFit:'Good'},semantics:mode==='LEARN'?'LEARN':mode==='PRACTICE'?'PRACTICE':mode==='RECALL'?'RECALL':'BUILD'};}
let stateConceptNameCache=new Map();
export function deriveNextActions(state,role){
 stateConceptNameCache=new Map(state.learnerState.concepts.map(c=>[c.conceptId.replace('skill-',''),c.name]));const gaps=deriveCriticalGaps(state,role);let recommendedGap=gaps[0],mode='SKILL_CHECK';const selectedConcept=state.learnerState.concepts.find(c=>c.conceptId===recommendedGap?.conceptId);if(recommendedGap?.gapReason==='STALE_EVIDENCE')mode='RECALL';else if(selectedConcept&&selectedConcept.masteryLevel!=='UNSEEN'&&MASTERY_SCORE[selectedConcept.masteryLevel]>=MASTERY_SCORE.UNDERSTANDING&&!selectedConcept.evidenceStrength.includes('APPLIED')&&recommendedGap.importance==='HIGH')mode='APPLIED_TRIAL';else if(recommendedGap?.gapReason==='MISSING_APPLIED')mode='APPLIED_TRIAL';else if(recommendedGap?.gapReason==='LOW_MASTERY'&&MASTERY_SCORE[recommendedGap.currentMastery] <= MASTERY_SCORE.DISCOVERED)mode='LEARN';else if(recommendedGap?.gapReason==='LOW_MASTERY')mode='SKILL_CHECK';else if(recommendedGap?.gapReason==='LOW_CONFIDENCE')mode='PRACTICE';
 const recommended=recommendedGap?actionTemplate(role,recommendedGap,mode,0):actionTemplate(role,null,'BOSS',0);recommended.kind='RECOMMENDED';
 const quickGap=gaps.find(g=>g.conceptId!==recommendedGap?.conceptId)||gaps[0];const quick=actionTemplate(role,quickGap,quickGap?.gapReason==='STALE_EVIDENCE'?'RECALL':'PRACTICE',1);quick.kind='QUICK_WIN';quick.title=role.targetRole.id==='backend-developer'?'Review Authorization Headers':quick.mode==='RECALL'?`Recall ${quickGap?.name||'a core skill'}`:`Practice ${quickGap?.name||'the next concept'}`;
 const bossReady=deriveBossStatus(state,role)==='READY';const challenge=bossReady?actionTemplate(role,null,'BOSS',2):actionTemplate(role,gaps.at(-1)||recommendedGap,'APPLIED_TRIAL',2);challenge.kind='CHALLENGE';challenge.title=role.targetRole.id==='backend-developer'?'Secure a REST API':bossReady?role.boss.title:`Build evidence for ${challenge.conceptIds[0]?.replace('skill-','')||'this skill'}`;
 return [recommended,quick,challenge].map((action,index)=>({...action,id:`${role.targetRole.id}-${index}` }));
}
export function deriveBossStatus(state,role){if(state.campaign?.bossQuests?.some(item=>item.status==='COMPLETED'&&item.targetRoleId===role.targetRole.id))return 'COMPLETED';const concepts=new Map(state.learnerState.concepts.map(c=>[c.conceptId,c]));const ready=(role.boss.concepts||[]).every(key=>{const c=concepts.get(`skill-${key}`);return c&&MASTERY_SCORE[c.masteryLevel]>=MASTERY_SCORE.UNDERSTANDING&&c.evidenceStrength.length>0;});return ready?'READY':'LOCKED';}
export function deriveCampaignProgress(arcs){const weights={COMPLETED:1,CURRENT:.35,AVAILABLE:.1,LOCKED:0,RECOMMENDED:.35};const total=arcs.reduce((sum)=>sum+1,0)||1;const raw=Math.round(arcs.reduce((sum,arc)=>sum+(weights[arc.status]||0),0)/total*100);return Math.max(0,Math.min(100,Math.round(24+(raw-67)*1.2)));}
export function deriveCampaign(state,role){const concepts=new Map(state.learnerState.concepts.map(c=>[c.conceptId,c]));const requirements=new Map((role.skillRequirements||roleRequirements(role)).map(item=>[item.conceptId,item]));const definitions=role.arcDefinitions||role.arcs.map((title,index)=>({id:`arc-${index+1}`,title,conceptIds:[role.skills[index%role.skills.length]]}));let previousComplete=true;const arcs=definitions.map((arc,index)=>{const complete=arc.conceptIds.every(id=>{const conceptId=id.startsWith('skill-')?id:`skill-${id}`,c=concepts.get(conceptId),req=requirements.get(conceptId);return c&&req&&MASTERY_SCORE[c.masteryLevel]>=MASTERY_SCORE[req.targetMastery.toUpperCase()]&&(!req.requiredEvidence||c.evidenceStrength.includes(req.requiredEvidence));});const available=!complete&&previousComplete;const status=complete?'COMPLETED':available?(index===0?'CURRENT':'AVAILABLE'):'LOCKED';previousComplete=complete;return {...arc,order:index+1,status,adaptive:index>0,skillProgress:Math.round(arc.conceptIds.reduce((sum,id)=>sum+(MASTERY_SCORE[(concepts.get(id.startsWith('skill-')?id:`skill-${id}`)||{}).masteryLevel]||0),0)/(arc.conceptIds.length||1)*100)};});const bossStatus=deriveBossStatus(state,role);return {title:role.campaignName,goal:state.campaign?.goal||'',dailyMinutes:state.preferences?.dailyMinutes||30,targetRoleId:role.targetRole.id,progress:deriveCampaignProgress(arcs),arcs,completedHistory:clone(state.campaign?.completedHistory||[]),bossQuests:[{id:`${role.targetRole.id}-boss`,targetRoleId:role.targetRole.id,title:role.boss.title,difficulty:'BOSS',minutes:45,status:bossStatus,conceptIds:role.boss.concepts.map(key=>`skill-${key}`),skills:role.boss.concepts.map(key=>concepts.get(`skill-${key}`)?.name).filter(Boolean),prerequisites:role.boss.concepts.slice(0,2).map(key=>concepts.get(`skill-${key}`)?.name).filter(Boolean),expectedEvidence:role.targetRole.id==='ux-researcher'?['Research plan','Interview / test protocol','Findings synthesis','Actionable recommendations']:role.targetRole.id==='product-marketing-manager'?['Target audience','Positioning statement','Messaging framework','Launch plan','Success metrics']:['Working project submission','Explanation of design choices','Tests or verification notes'],objectives:['Implement the core solution','Address one realistic failure case','Explain how you verified the result'],instructions:`Build a small ${role.boss.title.toLowerCase()} project. Include your approach, one failure case, and evidence that the result works.`}]};}
export function deriveLearningHub(state,role){const gaps=deriveCriticalGaps(state,role);const gapIds=new Set(gaps.map(g=>g.conceptId.replace('skill-','')));const courses=clone(role.courses||[]).map(course=>({...course,coveredSkills:course.concepts,fitReason:'Strong match for current career gaps',providerTrust:'Reviewed demo provider',sponsored:course.price!=='Free',commission:course.price==='Free'?0:75,skillFit:course.skillFit||80}));if(gaps.some(g=>g.gapReason==='STALE_EVIDENCE'))courses.unshift({id:`${role.targetRole.id}-recall`,title:`Recall Quest · ${gaps.find(g=>g.gapReason==='STALE_EVIDENCE').name}`,provider:'LifeOS Demo',skillFit:99,level:'Review',duration:'12 min',price:'Free',concepts:[gaps.find(g=>g.gapReason==='STALE_EVIDENCE').name],url:'#today',category:'RECALL',coveredSkills:[],fitReason:'Refreshes stale evidence before a new course',providerTrust:'LifeOS demo',sponsored:false,commission:0});courses.sort((a,b)=>((gapIds.has((b.concepts||[]).join('').toLowerCase())?1:0)-(gapIds.has((a.concepts||[]).join('').toLowerCase())?1:0))||b.skillFit-a.skillFit);return {...state.learningHub,courseRecommendations:courses,rerankedAt:state.lastStateChange?.source||'INITIAL'};}
export function deriveSkillPassport(state,role){const concepts=new Map(state.learnerState.concepts.map(c=>[c.conceptId,c]));return {title:`${role.targetRole.name.toUpperCase()} SKILL PASSPORT`,skills:(role.skillRequirements||roleRequirements(role)).map(req=>{const c=concepts.get(req.conceptId);return {conceptId:req.conceptId,name:c?.name||req.conceptId,masteryLevel:c?.masteryLevel||'UNSEEN',evidenceStrength:[...(c?.evidenceStrength||[])],freshness:c?.freshness||0,confidence:c?.confidence||0,targetMastery:req.targetMastery,requiredEvidence:req.requiredEvidence,importance:req.importance};})};}
export function recomputeDerivedState(state){const role=roles[state.career?.targetRole?.id||'backend-developer'];const next=clone(state);next.career=next.career||{};next.career.targetRole=clone(role.targetRole);next.career.coverage=next.coverageOverride??deriveCareerCoverage(next,role);next.career.readiness=deriveCareerReadiness(next,role,next.career.coverage);next.career.confidence=deriveCareerConfidence(next,role,next.career.coverage);next.career.criticalGaps=deriveCriticalGaps(next,role);next.campaign=deriveCampaign(next,role);next.learningHub=deriveLearningHub(next,role);next.skillPassport=deriveSkillPassport(next,role);next.recommendations=deriveNextActions(next,role);return next;}
function applyCareer(state,roleId,coverageOverride){const role=roles[roleId];if(!role)return state;const built=buildCareerState(state,roleId,coverageOverride);built.career={...built.career,targetRole:clone(role.targetRole)};built.career.targetRole.id=roleId;return recomputeDerivedState(built);}

export function createSkillIntelligenceDemoState({coverage}={}){
 const state={
  learnerState:{learnerName:'Minh',concepts:clone(conceptSeeds),relationships:clone(baseRelationships)},
  campaign:{progress:24,completedHistory:[{id:'history-http',title:'HTTP Foundations',xp:40},{id:'history-sql',title:'SQL Basics',xp:60}],currentArcIndex:1},
  learningHub:{freeResources:[{id:'free-docker-docs',title:'Docker Get Started',provider:'Docker Docs',price:'Free',url:'https://docs.docker.com/get-started/'}],bossChallenges:[],recallActivities:[]},
  demoHistory:[],coverageOverride:coverage,
  preferences:{dailyMinutes:45,recommendedActivityMinutes:30},advisorProposals:[],pendingAdvisorProposal:null,lastStateChange:null,
  demoNotice:'Illustrative Skill Intelligence demo. These values are not saved to your account.'
 };
 return applyCareer(state,'backend-developer',coverage);
}

export function createSkillIntelligenceEmptyState({roleId='backend-developer'}={}){
 const state=createSkillIntelligenceDemoState({coverage:0});
 state.learnerState.learnerName='You';
 state.learnerState.concepts=state.learnerState.concepts.map(concept=>({...concept,masteryLevel:'UNSEEN',masteryProbability:0,confidence:0,coverage:0,freshness:0,evidenceStrength:[]}));
 state.campaign={progress:0,completedHistory:[],currentArcIndex:0};
 state.demoHistory=[];state.learnerPreset='new-learner';state.demoNotice='Start with a career goal and build evidence one step at a time.';
 return applyCareer(state,roleId,0);
}

export function selectCareerTarget(state,roleId){
 if(!roles[roleId])return state;
 const changed=roleId!==state.career?.targetRole?.id;
 const next=applyCareer(clone(state),roleId);
 return changed?{...next,selectedActionId:undefined,demoBossSubmitted:false,demoHistory:[...(state.demoHistory||[]),{type:'CAREER_CHANGED',roleId,timestamp:'demo-sequence'}],lastStateChange:{source:'CAREER_CHANGED',skillChanges:[]}}:next;
}

export function selectRecommendation(state,actionId){
 const action=state.recommendations.find(item=>item.id===actionId);if(!action)return state;
 return {...clone(state),selectedActionId:actionId};
}

function transitionConcept(state,conceptId,changes){
 const next=clone(state),concept=next.learnerState.concepts.find(item=>item.conceptId===conceptId);
 if(!concept)return next;Object.assign(concept,changes);return applyCareer(next,next.career.targetRole.id);
}

export function completeSkillCheck(state,conceptId='skill-authentication'){
 const concept=state.learnerState.concepts.find(item=>item.conceptId===conceptId);if(!concept)return state;
 const next=transitionConcept(state,conceptId,{masteryLevel:'UNDERSTANDING',confidence:Math.max(concept.confidence,.68),coverage:Math.max(concept.coverage,72),freshness:100,evidenceStrength:[...new Set([...concept.evidenceStrength,'ASSESSED'])]});
 next.demoHistory=[...(state.demoHistory||[]),{type:'SKILL_CHECK_COMPLETED',conceptIds:[conceptId],conceptId,result:'2 / 3',timestamp:'demo-sequence'}];next.lastDemoAction={kind:'SKILL_CHECK_COMPLETED',conceptId};next.lastStateChange={source:'SKILL_CHECK',skillChanges:[conceptId],recommendationBefore:state.recommendations?.[0]?.title,recommendationAfter:next.recommendations?.[0]?.title};return next;
}

export function completeAppliedTrial(state,conceptIds=['skill-authentication']){
 let next=clone(state);for(const conceptId of conceptIds){const concept=next.learnerState.concepts.find(item=>item.conceptId===conceptId);if(concept){concept.masteryLevel='APPLYING';concept.confidence=Math.max(concept.confidence,.82);concept.coverage=Math.max(concept.coverage,86);concept.freshness=100;concept.evidenceStrength=[...new Set([...concept.evidenceStrength,'ASSESSED','APPLIED'])];}}
 next=applyCareer(next,next.career.targetRole.id);next.demoHistory=[...(state.demoHistory||[]),{type:'APPLIED_TRIAL_COMPLETED',conceptIds:[...conceptIds],timestamp:'demo-sequence'}];next.lastDemoAction={kind:'APPLIED_TRIAL_COMPLETED',conceptIds:[...conceptIds]};next.lastStateChange={source:'APPLIED_TRIAL',skillChanges:[...conceptIds],recommendationBefore:state.recommendations?.[0]?.title,recommendationAfter:next.recommendations?.[0]?.title};return next;
}

export function completeBossQuest(state){
 const ids=state.campaign.bossQuests[0]?.conceptIds||[];let next=completeAppliedTrial(state,ids);next.campaign={...next.campaign,bossQuests:next.campaign.bossQuests.map(boss=>({...boss,status:'COMPLETED'}))};next.demoHistory=[...(state.demoHistory||[]),{type:'BOSS_QUEST_COMPLETED',conceptIds:[...ids],timestamp:'demo-sequence'}];next.lastDemoAction={kind:'BOSS_QUEST_COMPLETED',conceptIds:[...ids]};next.lastStateChange={source:'BOSS_QUEST',skillChanges:[...ids],recommendationBefore:state.recommendations?.[0]?.title,recommendationAfter:next.recommendations?.[0]?.title};return next;
}

export function resetSkillIntelligenceDemoState(){return createSkillIntelligenceDemoState();}

export function completeRecallQuest(state,conceptId){
 const concept=state.learnerState.concepts.find(item=>item.conceptId===conceptId);
 if(!concept)return state;
 let next=clone(state);
 const updated=next.learnerState.concepts.find(item=>item.conceptId===conceptId);
 updated.freshness=100;
 next=applyCareer(next,next.career.targetRole.id);next.campaign=clone(state.campaign);next.demoHistory=[...(state.demoHistory||[]),{type:'RECALL_COMPLETED',conceptIds:[conceptId],timestamp:'demo-sequence'}];next.lastDemoAction={kind:'RECALL_COMPLETED',conceptId};next.lastStateChange={source:'RECALL',skillChanges:[conceptId],recommendationBefore:state.recommendations?.[0]?.title,recommendationAfter:next.recommendations?.[0]?.title};return next;
}

export function completeGeneratedQuest(state,action){
 if(!action?.conceptIds?.length)return state;
 if(action.mode==='SKILL_CHECK'||action.mode==='APPLIED_TRIAL'||action.mode==='RECALL'||action.mode==='BOSS'){
  const updated=action.mode==='SKILL_CHECK'?completeSkillCheck(state,action.conceptIds[0]):action.mode==='APPLIED_TRIAL'?completeAppliedTrial(state,action.conceptIds):action.mode==='RECALL'?completeRecallQuest(state,action.conceptIds[0]):completeBossQuest(state);
  if(updated===state)return state;updated.campaign={...updated.campaign,completedHistory:[...(state.campaign?.completedHistory||[]),{id:action.id,title:action.title,conceptIds:[...action.conceptIds],mode:action.mode}]};return updated;
 }
 const next=clone(state);
 for(const conceptId of action.conceptIds){
  const concept=next.learnerState.concepts.find(item=>item.conceptId===conceptId);if(!concept)continue;
  if(action.mode==='LEARN'){concept.masteryLevel=concept.masteryLevel==='UNSEEN'?'UNDERSTANDING':concept.masteryLevel;concept.masteryProbability=Math.max(concept.masteryProbability,.65);concept.confidence=Math.max(concept.confidence,.5);concept.freshness=100;}
  else if(action.mode==='PRACTICE'){concept.masteryLevel=MASTERY_SCORE[concept.masteryLevel]<MASTERY_SCORE.UNDERSTANDING?'UNDERSTANDING':concept.masteryLevel;concept.masteryProbability=Math.max(concept.masteryProbability,.65);concept.confidence=Math.max(concept.confidence,.58);concept.coverage=Math.max(concept.coverage,55);concept.freshness=100;concept.evidenceStrength=[...new Set([...concept.evidenceStrength,'ASSESSED'])];}
 }
 const updated=applyCareer(next,next.career.targetRole.id);updated.campaign={...updated.campaign,completedHistory:[...(state.campaign?.completedHistory||[]),{id:action.id,title:action.title,conceptIds:[...action.conceptIds],mode:action.mode}]};updated.demoHistory=[...(state.demoHistory||[]),{type:'GENERATED_QUEST_COMPLETED',questId:action.id,conceptIds:[...action.conceptIds],mode:action.mode,timestamp:'demo-sequence'}];updated.lastDemoAction={kind:'GENERATED_QUEST_COMPLETED',questId:action.id};updated.lastStateChange={source:'GENERATED_QUEST',skillChanges:[...action.conceptIds],recommendationBefore:state.recommendations?.[0]?.title,recommendationAfter:updated.recommendations?.[0]?.title};return updated;
}

export function updateBktEvidence(evidence={},conceptName,correct,initialMastery=.2){
 const key=String(conceptName||'').trim().toLowerCase();if(!key)return evidence;
 const prior=evidence[key]||{conceptName:String(conceptName).trim(),masteryProbability:initialMastery,attempts:0};
 const p=Math.max(.01,Math.min(.99,prior.masteryProbability)),learn=.2,guess=.2,slip=.1;
 const posterior=correct?(p*(1-slip))/(p*(1-slip)+(1-p)*guess):(p*slip)/(p*slip+(1-p)*(1-guess));
 const mastery=Math.max(.01,Math.min(.99,posterior+(1-posterior)*learn));
 return {...evidence,[key]:{conceptName:prior.conceptName,masteryProbability:mastery,attempts:(prior.attempts||0)+1,lastOutcome:correct?'CORRECT':'INCORRECT'}};
}

export function selectLearnerPreset(state,preset='canonical'){
 const next=clone(state);const concepts=new Map(next.learnerState.concepts.map(c=>[c.conceptId,c]));
 if(preset==='backend-stale'){for(const key of ['java','sql','rest-api','authentication','testing','docker']){const c=concepts.get(`skill-${key}`);c.masteryLevel=key==='docker'?'UNDERSTANDING':'APPLYING';c.freshness=key==='sql'?40:100;c.confidence=.84;c.evidenceStrength=key==='docker'?['ASSESSED']:['ASSESSED','APPLIED'];}const sql=concepts.get('skill-sql');sql.freshness=40;}
 if(preset==='backend-applied'){const auth=concepts.get('skill-authentication');auth.masteryLevel='UNDERSTANDING';auth.confidence=.75;auth.evidenceStrength=['ASSESSED'];}
 next.learnerPreset=preset;next.lastStateChange={source:'LEARNER_PRESET_CHANGED',skillChanges:[]};return applyCareer(next,next.career.targetRole.id);
}
export function proposeAdvisor(state,intent='WHAT_SHOULD_I_FOCUS_ON',input={}){
 const minutes=Number(input.dailyMinutes||state.preferences?.dailyMinutes||45);const role=state.career.targetRole;const recommendation=state.recommendations?.[0];const copy={EXPLAIN_NEXT_ACTION:{title:'Why this is your next step',explanation:`${recommendation?.title||'This action'} is the best fit for your current ${role.name} gaps and evidence.`},WHAT_SHOULD_I_FOCUS_ON:{title:'Your current focus',explanation:`Focus on ${recommendation?.title||'the highest-priority skill gap'} before adding another topic.`},WHY_DID_MY_CAMPAIGN_CHANGE:{title:'Why your campaign changed',explanation:'The campaign follows current skill evidence, so meaningful practice can move the active arc forward.'},ADJUST_TIME_BUDGET:{title:'Adjust the next activities',explanation:`Keep your ${role.name} goal and shorten near-term activities to fit ${minutes} minutes per day.`}}[intent]||{};return {id:`advisor-proposal-${(state.demoHistory||[]).length+1}`,type:intent==='ADJUST_TIME_BUDGET'?'PACE_ADJUSTMENT':'EXPLANATION',title:copy.title,explanation:copy.explanation,changes:intent==='ADJUST_TIME_BUDGET'?{dailyMinutes:minutes,recommendedActivityMinutes:Math.min(minutes,30)}:{},status:'PENDING'};
}
export function applyAdvisorProposal(state,proposalId){const proposal=state.advisorProposals?.find(item=>item.id===proposalId)||state.pendingAdvisorProposal;if(!proposal)return state;const next=clone(state);next.preferences={...(next.preferences||{}),dailyMinutes:proposal.changes.dailyMinutes||next.preferences?.dailyMinutes||45,recommendedActivityMinutes:proposal.changes.recommendedActivityMinutes||next.preferences?.recommendedActivityMinutes||30};next.advisorProposals=(next.advisorProposals||[]).map(item=>item.id===proposal.id?{...item,status:'APPLIED'}:item);next.pendingAdvisorProposal=null;next.demoHistory=[...(state.demoHistory||[]),{type:'ADVISOR_PROPOSAL_APPLIED',proposalId:proposal.id,timestamp:'demo-sequence'}];next.lastStateChange={source:'ADVISOR_PROPOSAL',skillChanges:[]};return applyCareer(next,next.career.targetRole.id);
}
