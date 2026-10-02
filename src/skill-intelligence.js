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
 skills:['python','statistics','business-questions','data-visualization','data-cleaning','rest-api'],
 gaps:[['business-questions','Applying','High'],['data-visualization','Understanding','High'],['statistics','Applying','Medium']],
 recommendations:[
  {kind:'RECOMMENDED',title:'UX Research Skill Check',minutes:10,xp:0,concepts:['business-questions'],mode:'SKILL_CHECK',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'QUICK_WIN',title:'Review Interview Protocols',minutes:15,xp:0,concepts:['business-questions'],why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'CHALLENGE',title:'Run a Usability Study',minutes:45,xp:0,concepts:['business-questions','statistics','data-visualization'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
 ],arcs:['Research Foundations','Interviewing','Synthesis','Validation','Research Impact'],boss:{title:'Run a Usability Study',concepts:['business-questions','statistics','data-visualization']},courses:[{id:'ux-research',title:'UX Research Fundamentals',provider:'Demo Partner',skillFit:90,level:'Beginner',duration:'5 hours',price:'Free',concepts:['Interviewing','Synthesis'],url:'https://example.com/demo/ux-research',category:'RECOMMENDED'}]
};
roles['product-marketing-manager']={
 targetRole:{id:'product-marketing-manager',name:'Product Marketing Manager'},campaignName:'Product Marketing Campaign',readiness:44,coverage:57,confidence:'LOW',
 skills:['business-questions','data-visualization','statistics','data-cleaning','rest-api'],
 gaps:[['business-questions','Applying','High'],['data-visualization','Understanding','High'],['data-cleaning','Applying','Medium']],
 recommendations:[
  {kind:'RECOMMENDED',title:'Market Insight Skill Check',minutes:10,xp:0,concepts:['business-questions'],mode:'SKILL_CHECK',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Strong',evidenceNeed:'High',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'QUICK_WIN',title:'Review Positioning Statements',minutes:15,xp:0,concepts:['business-questions'],why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'Medium',timeFit:'Perfect',difficultyFit:'Good'}},
  {kind:'CHALLENGE',title:'Present a Go-to-Market Brief',minutes:45,xp:0,concepts:['business-questions','statistics','data-visualization'],mode:'BOSS',why:{careerRelevance:'High',skillGap:'High',prerequisiteReadiness:'Good',evidenceNeed:'High',timeFit:'Good',difficultyFit:'Stretch'}}
 ],arcs:['Customer Insight','Positioning','Messaging','Go-to-Market','Growth'],boss:{title:'Present a Go-to-Market Brief',concepts:['business-questions','statistics','data-visualization']},courses:[{id:'product-marketing',title:'Product Marketing Foundations',provider:'Demo Partner',skillFit:87,level:'Beginner',duration:'4 hours',price:'Free',concepts:['Positioning','Messaging'],url:'https://example.com/demo/product-marketing',category:'RECOMMENDED'}]
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

function clone(value){return structuredClone(value);}

function readiness(coverage,score){
 return coverage<MIN_READINESS_COVERAGE?{status:'INSUFFICIENT_EVIDENCE'}:{status:'AVAILABLE',score};
}

function applyCareer(state,roleId,coverageOverride){
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

export function createSkillIntelligenceDemoState({coverage}={}){
 const state={
  learnerState:{learnerName:'Minh',concepts:clone(conceptSeeds),relationships:clone(baseRelationships)},
  campaign:{progress:24,completedHistory:[{id:'history-http',title:'HTTP Foundations',xp:40},{id:'history-sql',title:'SQL Basics',xp:60}],currentArcIndex:1},
  learningHub:{freeResources:[{id:'free-docker-docs',title:'Docker Get Started',provider:'Docker Docs',price:'Free',url:'https://docs.docker.com/get-started/'}],bossChallenges:[],recallActivities:[]},
  demoHistory:[],
  demoNotice:'Illustrative Skill Intelligence demo. These values are not saved to your account.'
 };
 return applyCareer(state,'backend-developer',coverage);
}

export function selectCareerTarget(state,roleId){
 if(!roles[roleId])return state;
 const changed=roleId!==state.career?.targetRole?.id;
 const next=applyCareer(clone(state),roleId);
 return changed?{...next,selectedActionId:undefined,demoBossSubmitted:false}:next;
}

export function selectRecommendation(state,actionId){
 const action=state.recommendations.find(item=>item.id===actionId);if(!action)return state;
 return {...clone(state),selectedActionId:actionId};
}

function transitionConcept(state,conceptId,changes){
 const next=clone(state),concept=next.learnerState.concepts.find(item=>item.conceptId===conceptId);
 if(!concept)return next;Object.assign(concept,changes);return applyCareer(next,next.career.targetRole.id,next.career.coverage);
}

export function completeSkillCheck(state,conceptId='skill-authentication'){
 const concept=state.learnerState.concepts.find(item=>item.conceptId===conceptId);if(!concept)return state;
 const next=transitionConcept(state,conceptId,{masteryLevel:'UNDERSTANDING',confidence:Math.max(concept.confidence,.68),coverage:Math.max(concept.coverage,72),evidenceStrength:[...new Set([...concept.evidenceStrength,'ASSESSED'])]});
 next.demoHistory=[...(state.demoHistory||[]),{type:'SKILL_CHECK_COMPLETED',conceptId,result:'2 / 3'}];next.lastDemoAction={kind:'SKILL_CHECK_COMPLETED',conceptId};
 next.recommendations=next.recommendations.map((action,index)=>index===0?{...action,title:'Implement JWT Authentication',mode:'APPLIED_TRIAL',minutes:30}:action);return next;
}

export function completeAppliedTrial(state,conceptIds=['skill-authentication']){
 let next=clone(state);for(const conceptId of conceptIds){const concept=next.learnerState.concepts.find(item=>item.conceptId===conceptId);if(concept){concept.masteryLevel='APPLYING';concept.confidence=Math.max(concept.confidence,.82);concept.coverage=Math.max(concept.coverage,86);concept.evidenceStrength=[...new Set([...concept.evidenceStrength,'ASSESSED','APPLIED'])];}}
 next=applyCareer(next,next.career.targetRole.id,next.career.coverage);next.demoHistory=[...(state.demoHistory||[]),{type:'APPLIED_TRIAL_COMPLETED',conceptIds:[...conceptIds]}];next.lastDemoAction={kind:'APPLIED_TRIAL_COMPLETED',conceptIds:[...conceptIds]};return next;
}

export function completeBossQuest(state){
 const ids=state.campaign.bossQuests[0]?.conceptIds||[];let next=completeAppliedTrial(state,ids);next.campaign={...next.campaign,bossQuests:next.campaign.bossQuests.map(boss=>({...boss,status:'COMPLETED'}))};next.demoHistory=[...(state.demoHistory||[]),{type:'BOSS_QUEST_COMPLETED',conceptIds:[...ids]}];next.lastDemoAction={kind:'BOSS_QUEST_COMPLETED',conceptIds:[...ids]};return next;
}

export function resetSkillIntelligenceDemoState(){return createSkillIntelligenceDemoState();}

export function completeRecallQuest(state,conceptId){
 const concept=state.learnerState.concepts.find(item=>item.conceptId===conceptId);
 if(!concept)return state;
 const next=clone(state);
 const updated=next.learnerState.concepts.find(item=>item.conceptId===conceptId);
 updated.freshness=100;
 next.learnerState.lastDemoAction={kind:'RECALL_COMPLETE',conceptId};
 return next;
}
