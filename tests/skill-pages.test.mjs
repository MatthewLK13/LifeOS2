import test from 'node:test';
import assert from 'node:assert/strict';
import {createSkillIntelligenceDemoState,selectCareerTarget} from '../src/skill-intelligence.js';
import {renderTodaySkillPage,renderRecommendationExplanation,renderCareerCampaignPage,renderBossQuestDetail,renderSkillKnowledgePage,renderSkillGapDetail,renderSkillPassport,renderProgressSkillPage,renderLearningHubPage,renderCourseDetail,rankCoursesByFit} from '../src/skill-pages.js';

test('Today renders the target career, readiness, coverage, and explicit demo notice',()=>{
 const html=renderTodaySkillPage(createSkillIntelligenceDemoState(),{demoPreview:true});
 assert.match(html,/Backend Developer/);
 assert.match(html,/58%/);
 assert.match(html,/72%/);
 assert.match(html,/Illustrative Skill Intelligence demo/);
 assert.match(html,/demo-preview/);
 assert.match(html,/name="careerTarget"/);
});

test('Today presents the three critical gaps as clickable Knowledge details',()=>{
 const html=renderTodaySkillPage(createSkillIntelligenceDemoState());
 for(const label of ['Authentication','Testing','Docker'])assert.match(html,new RegExp(label));
 assert.equal((html.match(/data-action="skill-detail"/g)||[]).length,3);
 assert.match(html,/data-page="knowledge"/);
 assert.match(html,/current mastery/i);
 assert.match(html,/target mastery/i);
});

test('Today renders all three action choices in order and marks only Recommended',()=>{
 const html=renderTodaySkillPage(createSkillIntelligenceDemoState());
 const positions=['Authentication Skill Check','Review Authorization Headers','Secure a REST API'].map(title=>html.indexOf(title));
 assert.ok(positions.every(position=>position>=0));
 assert.ok(positions[0]<positions[1]&&positions[1]<positions[2]);
 assert.equal((html.match(/data-recommendation="RECOMMENDED"/g)||[]).length,1);
 assert.equal((html.match(/data-action="recommendation-detail"/g)||[]).length,3);
 assert.equal((html.match(/data-action="choose-recommendation"/g)||[]).length,3);
});

test('Today visibly reflects a selected action without implying completion',()=>{
 const vm={...createSkillIntelligenceDemoState(),selectedActionId:'backend-developer-1'};
 const html=renderTodaySkillPage(vm);
 assert.match(html,/Selected for your next step/);
  assert.match(html,/Skill changes appear only after you complete a demo activity/);
});

test('readiness hides a percentage when evidence coverage is insufficient',()=>{
 const html=renderTodaySkillPage(createSkillIntelligenceDemoState({coverage:23}));
 assert.match(html,/Insufficient evidence/);
 assert.match(html,/Evidence Coverage/);
 assert.match(html,/23%/);
 assert.doesNotMatch(html,/Career Readiness[^<]*23%/);
});

test('recommendation explanation translates all six factors into readable labels',()=>{
 const action=createSkillIntelligenceDemoState().recommendations[0];
 const html=renderRecommendationExplanation(action);
 for(const label of ['Career relevance','Skill gap','Prerequisite readiness','Evidence need','Time fit','Difficulty fit'])assert.match(html,new RegExp(label));
 assert.match(html,/Perfect/);
 assert.doesNotMatch(html,/0\.\d{2,}|weight/i);
});

test('Career Campaign separates preserved history from adaptive future arcs',()=>{
 const vm=createSkillIntelligenceDemoState();
 const html=renderCareerCampaignPage(vm);
 assert.match(html,/COMPLETED/);
 assert.match(html,/HTTP Foundations/);
 assert.match(html,/NEXT IN THE CAMPAIGN/);
 assert.match(html,/Security &amp; Testing|Security & Testing/);
 assert.match(html,/Secure a REST API/);
});

test('Boss Quest explains objectives, skills, prerequisites, evidence, mock submission, and cosmetic rewards',()=>{
 const vm=createSkillIntelligenceDemoState();
 const html=renderBossQuestDetail(vm.campaign.bossQuests[0]);
 for(const label of ['Boss Quest','Requirements','Expected evidence','Demo submission','skill profile'])assert.match(html,new RegExp(label,'i'));
 assert.match(html,/Working project submission/);
});

test('My Knowledge V2 shows learner metrics, semantic relation legend, and no private conversation content',()=>{
 const vm=createSkillIntelligenceDemoState();
 const html=renderSkillKnowledgePage(vm);
 for(const label of ['Mastery','Confidence','Evidence coverage','Freshness','PREREQUISITE','RELATED','PART OF','TRANSFERABLE TO'])assert.match(html,new RegExp(label,'i'));
 assert.match(html,/Docker/);
 assert.match(html,/skill-graph-edges/);
 assert.match(html,/skill-graph-node/);
 assert.doesNotMatch(html,/private chat|conversation transcript|sample conversations/i);
});

test('Career Skill Map contains only target-role skills and shows their semantic edges',()=>{
 const vm=selectCareerTarget(createSkillIntelligenceDemoState(),'ai-ml-engineer');
 const html=renderSkillKnowledgePage(vm);
 assert.match(html,/AI \/ ML Engineer/);
 assert.match(html,/Machine Learning/);
 assert.doesNotMatch(html,/>Authentication</);
 assert.doesNotMatch(html,/>Docker</);
 assert.match(html,/prerequisite/i);
});

test('skill detail presents evidence sources without exposing evidence text and offers freshness-only Recall',()=>{
 const vm=createSkillIntelligenceDemoState();
 const concept=vm.learnerState.concepts.find(item=>item.conceptId==='skill-docker');
 const html=renderSkillGapDetail(vm.career.criticalGaps.find(g=>g.conceptId===concept.conceptId),concept);
 for(const label of ['Confidence','Coverage','Freshness','Recall Quest','No evidence'])assert.match(html,new RegExp(label,'i'));
 assert.doesNotMatch(html,/conversation transcript|private chat evidence text/);
});

test('Progress separates character level from competency and passport shows role skills with evidence',()=>{
 const vm=createSkillIntelligenceDemoState();
 const html=renderProgressSkillPage(vm);
 assert.match(html,/CHARACTER LEVEL · GAME PROGRESSION/);
 assert.match(html,/DOMAIN RANK · COMPETENCY/);
 assert.match(html,/CAREER READINESS/);
 assert.match(html,/BOSS QUEST PROGRESS/);
 assert.match(html,/ASSESSMENT PROGRESS/);
 assert.match(html,/STRONG EVIDENCE SKILLS/);
 assert.match(html,/SKILL PASSPORT/);
 assert.match(renderSkillPassport(vm),/Evidence strength/);
 assert.match(renderSkillPassport(vm),/Java/);
});

test('Learning Hub shows free alternatives and discloses sponsored placements with an independent fit order',()=>{
 const vm=createSkillIntelligenceDemoState();
 const html=renderLearningHubPage(vm);
 assert.match(html,/FREE ALTERNATIVES/);
 assert.match(html,/Sponsored placement/);
 assert.match(html,/recommendation fit is based on skill relevance/i);
 assert.match(html,/Boss Challenges/i);
 const courses=[{id:'a',skillFit:88,commission:1},{id:'b',skillFit:90,commission:0},{id:'c',skillFit:82,commission:999}];
 const before=rankCoursesByFit(courses).map(course=>course.id);
 const after=rankCoursesByFit(courses.map(course=>({...course,commission:999-course.commission}))).map(course=>course.id);
 assert.deepEqual(before,after);
 assert.match(renderCourseDetail(vm.learningHub.courseRecommendations[0]),/Fit/i);
});
