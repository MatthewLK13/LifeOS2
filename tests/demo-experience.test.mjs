import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlannerState,startPlanner,answerPlannerStep,buildCampaignProposal,acceptCampaignProposal} from '../src/demo-planner.js';
import {getQuestById,getCampaignChapters,getDemoSubmission} from '../src/demo-quests.js';
import {createSkillIntelligenceDemoState} from '../src/skill-intelligence.js';
import {renderCareerCampaignPage} from '../src/skill-pages.js';

test('deterministic planner collects answers and creates a real campaign proposal',()=>{
 let planner=startPlanner(createPlannerState());
 planner=answerPlannerStep(planner,'backend-developer');
 planner=answerPlannerStep(planner,'Have project experience');
 planner=answerPlannerStep(planner,'Build production-ready backend APIs');
 planner=answerPlannerStep(planner,'30');
 const preview=buildCampaignProposal(planner);
 assert.equal(preview.status,'PREVIEW');
 assert.equal(preview.proposal.chapters.length,5);
 assert.ok(preview.proposal.chapters.every(chapter=>chapter.quests.length>0));
 assert.equal(preview.proposal.bossQuestId,'backend-secure-rest-api');
 assert.equal(acceptCampaignProposal(preview).status,'ACCEPTED');
});

test('quest definitions expose assignment, submission, rubric, and evidence contracts',()=>{
 const skillCheck=getQuestById('backend-auth-skill-check');
 assert.equal(skillCheck.type,'SKILL_CHECK');assert.equal(skillCheck.submission.type,'QUIZ');assert.ok(skillCheck.assignment.items.length>=3);assert.equal(skillCheck.expectedEvidence,'ASSESSED');
 const applied=getQuestById('backend-jwt-applied-trial');assert.equal(applied.submission.type,'TEXT');assert.ok(applied.rubric.length>=4);assert.equal(applied.expectedEvidence,'APPLIED');
 assert.ok(getDemoSubmission('backend-secure-rest-api').summary);
});

test('campaign presentation contains concrete quest nodes and opens quest detail actions',()=>{
 const html=renderCareerCampaignPage(createSkillIntelligenceDemoState());
 assert.match(html,/Authentication Skill Check/);assert.match(html,/Implement JWT Authentication/);assert.match(html,/API Error Handling Practice/);assert.match(html,/data-action="quest-detail"/);
});

test('canonical quest chapters remain connected to the backend career',()=>{
 const chapters=getCampaignChapters('backend-developer');assert.deepEqual(chapters.map(chapter=>chapter.title),['Programming Foundations','Backend Core','Data & Persistence','Security & Testing','Production']);
});
