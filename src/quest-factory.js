const typeByMode={LEARN:'LEARN',PRACTICE:'PRACTICE',SKILL_CHECK:'SKILL_CHECK',APPLIED_TRIAL:'APPLIED_TRIAL',RECALL:'RECALL',BOSS:'BOSS'};
const evidenceByMode={LEARN:'NONE',PRACTICE:'ASSESSED',SKILL_CHECK:'ASSESSED',APPLIED_TRIAL:'APPLIED',RECALL:'NONE',BOSS:'APPLIED'};
const rubricByMode={
 LEARN:['Key idea understood','Relevant example','Next question captured'],
 PRACTICE:['Correct decision','Failure case considered','Verification note'],
 SKILL_CHECK:['Concept accuracy','Reasoning clarity','Confidence signal'],
 APPLIED_TRIAL:['Implementation approach','Failure handling','Verification evidence'],
 RECALL:['Accurate recall','Connection to current goal','Freshness confirmed'],
 BOSS:['Solution quality · 35%','Evidence and verification · 30%','Technical explanation · 20%','Reflection · 15%']
};
function nameFor(state,id){return state?.learnerState?.concepts?.find(concept=>concept.conceptId===id)?.name||id.replace(/^skill-/,'').replaceAll('-',' ');}
export function buildQuestFromAction(action,state){
 const mode=typeByMode[action?.mode]||'PRACTICE';const names=(action?.conceptIds||[]).map(id=>nameFor(state,id));const subject=names[0]||'this skill';
 const instructions={LEARN:`Study the foundations of ${subject}, then explain the idea in your own words.`,PRACTICE:`Work through a short ${subject} scenario and record the decision, failure case, and verification.`,SKILL_CHECK:`Answer the focused questions about ${subject} and submit your reasoning.`,APPLIED_TRIAL:`Apply ${subject} in a small realistic scenario and explain how you verified the result.`,RECALL:`Recall the key ideas of ${subject} without reopening the lesson, then note what you would verify next.`,BOSS:`Bring ${names.join(', ')} together in one realistic project submission.`}[mode];
 const outcomeType=mode==='APPLIED_TRIAL'||mode==='BOSS'?'Project':'Assessment';
 const learningPackage={learn:{explanation:`Understand the core ideas behind ${subject}. Connect the concept to the goal of ${state?.career?.targetRole?.name||'your learning path'}.`,example:`Consider a small ${subject.toLowerCase()} example. Identify the input, the decision being made, and what a correct result should look like.`},practice:{scenario:`Apply ${subject} in a realistic, low-risk scenario before you submit your result.`,steps:['Describe the situation and your approach','Work through the important decision or steps','Note one edge case and how you would verify it']},outcome:{type:outcomeType,prompt:instructions,deliverable:outcomeType==='Project'?'A small solution or plan with an explanation and verification note':'A short answer with your reasoning and a confidence check',rubric:rubricByMode[mode]}};
 return {id:`generated-${state?.demoHistory?.length||0}-${action.id}`,sourceActionId:action.id,title:action.title,type:outcomeType,mode,status:action.kind==='RECOMMENDED'?'RECOMMENDED':'AVAILABLE',minutes:action.minutes,skills:action.conceptIds||[],topic:subject,learningPackage,why:`LifeOS selected this because ${action.why?.skillGap||'your current evidence'} needs the next useful signal.`,assignment:{instructions,items:['Complete the task','State one assumption','Add a verification note']},submission:{type:mode==='SKILL_CHECK'?'QUIZ':mode==='BOSS'?'PROJECT_NOTE':'TEXT',required:true},rubric:rubricByMode[mode],expectedEvidence:evidenceByMode[mode],prerequisites:[],completionEffect:{stateTransition:`GENERATED_${mode}`,conceptIds:[...(action.conceptIds||[])]},generated:true};
}
export function getGeneratedQuestById(id,state){for(const action of state?.recommendations||[]){const quest=buildQuestFromAction(action,state);if(action.id===id||quest.id===id)return quest;}return null;}

export function buildRoadmapQuests(state){
 const targets=new Map((state?.skillPassport?.skills||[]).map(skill=>[skill.conceptId,skill]));
 const concepts=new Map((state?.learnerState?.concepts||[]).map(skill=>[skill.conceptId,skill]));
 return (state?.campaign?.arcs||[]).map(arc=>({...arc,quests:arc.conceptIds.flatMap(rawId=>{
  const conceptId=rawId.startsWith('skill-')?rawId:`skill-${rawId}`,concept=concepts.get(conceptId),target=targets.get(conceptId);if(!concept||!target)return [];
  const mastery={UNSEEN:0,DISCOVERED:1,EXPLORING:2,UNDERSTANDING:3,APPLYING:4,MASTERED:5};const current=mastery[concept.masteryLevel]||0,wanted=mastery[String(target.targetMastery||'UNDERSTANDING').toUpperCase()]||3;let mode='';
  if(concept.freshness>0&&concept.freshness<45&&concept.evidenceStrength.length)mode='RECALL';
  else if(current<wanted)mode=current<2?'LEARN':current>=3&&concept.evidenceStrength.includes('ASSESSED')&&wanted>=4?'APPLIED_TRIAL':'SKILL_CHECK';
  else if(target.requiredEvidence==='APPLIED'&&!concept.evidenceStrength.includes('APPLIED'))mode='APPLIED_TRIAL';
  else if(target.requiredEvidence==='ASSESSED'&&!concept.evidenceStrength.includes('ASSESSED'))mode='SKILL_CHECK';
  if(!mode)return [];
  const name=concept.name,labels={LEARN:`Learn ${name} Foundations`,SKILL_CHECK:`Check your ${name} understanding`,APPLIED_TRIAL:`Apply ${name} in a project`,RECALL:`Refresh ${name}`};
  const action={id:`roadmap-${arc.id}-${conceptId}-${mode}`,sourceActionId:`roadmap-${arc.id}-${conceptId}-${mode}`,kind:'ROADMAP',title:labels[mode],mode,minutes:mode==='APPLIED_TRIAL'?30:mode==='RECALL'?12:mode==='SKILL_CHECK'?10:20,conceptIds:[conceptId],why:{skillGap:target.importance||'your current gap'}};
  return [{...buildQuestFromAction(action,state),sourceActionId:action.id,action,arcId:arc.id}];
 })}));
}
