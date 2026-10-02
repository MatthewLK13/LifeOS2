import test from 'node:test';
import assert from 'node:assert/strict';
import {createSkillIntelligenceDemoState,selectCareerTarget,completeRecallQuest,completeSkillCheck,completeAppliedTrial,completeBossQuest,resetSkillIntelligenceDemoState} from '../src/skill-intelligence.js';

test('demo learner presents the specified backend readiness, gaps, and actions',()=>{
 const state=createSkillIntelligenceDemoState();
 assert.equal(state.career.targetRole.name,'Backend Developer');
 assert.deepEqual(state.career.readiness,{status:'AVAILABLE',score:58});
 assert.equal(state.career.coverage,72);
 assert.equal(state.learnerState.learnerName,'Minh');
 assert.deepEqual(state.career.criticalGaps.map(gap=>gap.name),['Authentication','Testing','Docker']);
 assert.deepEqual(state.recommendations.map(action=>action.title),[
  'Authentication Skill Check',
  'Review Authorization Headers',
  'Secure a REST API'
 ]);
 const concepts=Object.fromEntries(state.learnerState.concepts.map(concept=>[concept.name,concept]));
 assert.equal(concepts.Java.masteryLevel,'APPLYING');
 assert.deepEqual(concepts.Java.evidenceStrength,['APPLIED']);
 assert.equal(concepts.SQL.freshness,58);
 assert.equal(concepts['REST API'].masteryLevel,'UNDERSTANDING');
 assert.deepEqual(concepts.Authentication.evidenceStrength,['INFERRED','ASSESSED']);
 assert.equal(concepts.Docker.masteryLevel,'UNSEEN');
 assert.deepEqual(concepts.Docker.evidenceStrength,[]);
 assert.equal(state.learningHub.courseRecommendations[0].title,'Docker Fundamentals');
 assert.equal(state.learningHub.courseRecommendations[0].skillFit,91);
});

test('selecting another career returns coherent role-specific mock gaps and actions',()=>{
 const initial=createSkillIntelligenceDemoState();
 for(const roleId of ['ux-researcher','product-marketing-manager']){
  const selected=selectCareerTarget(initial,roleId);
  assert.equal(selected.career.targetRole.id,roleId);
  assert.notDeepEqual(selected.career.criticalGaps,initial.career.criticalGaps);
  assert.ok(selected.career.coverage>0);
  assert.ok(selected.recommendations[0].conceptIds.some(id=>selected.career.criticalGaps.some(gap=>gap.conceptId===id)));
  assert.equal(initial.career.targetRole.id,'backend-developer');
 }
});

test('switching career clears selections and mock submission status tied to the prior role',()=>{
 const initial={...createSkillIntelligenceDemoState(),selectedActionId:'backend-developer-0',demoBossSubmitted:true};
 const selected=selectCareerTarget(initial,'ux-researcher');
 assert.equal(selected.selectedActionId,undefined);
 assert.equal(selected.demoBossSubmitted,false);
 assert.equal(selected.campaign.bossQuests[0].title,'Run a Usability Study');
});

test('skill check, applied trial, boss quest and reset are immutable demo transitions',()=>{
 const initial=createSkillIntelligenceDemoState(),concept=initial.learnerState.concepts.find(item=>item.conceptId==='skill-authentication');
 const checked=completeSkillCheck(initial,concept.conceptId);
 assert.equal(concept.masteryLevel,'EXPLORING');assert.equal(checked.learnerState.concepts.find(item=>item.conceptId===concept.conceptId).masteryLevel,'UNDERSTANDING');assert.match(checked.recommendations[0].title,/Implement JWT/);assert.equal(checked.demoHistory[0].type,'SKILL_CHECK_COMPLETED');
 const applied=completeAppliedTrial(checked,['skill-authentication']);assert.equal(applied.learnerState.concepts.find(item=>item.conceptId==='skill-authentication').masteryLevel,'APPLYING');assert.ok(applied.learnerState.concepts.find(item=>item.conceptId==='skill-authentication').evidenceStrength.includes('APPLIED'));
 const boss=completeBossQuest(initial);assert.equal(boss.campaign.bossQuests[0].status,'COMPLETED');assert.ok(boss.demoHistory.some(item=>item.type==='BOSS_QUEST_COMPLETED'));
 assert.deepEqual(resetSkillIntelligenceDemoState(),initial);
});

test('semantic graph seed includes each supported relation type',()=>{
 const state=createSkillIntelligenceDemoState();
 assert.deepEqual(new Set(state.learnerState.relationships.map(edge=>edge.type)),new Set(['PREREQUISITE','RELATED','PART_OF','TRANSFERABLE_TO']));
});

test('readiness is withheld below the configured evidence coverage threshold',()=>{
 const state=createSkillIntelligenceDemoState({coverage:23});
 assert.deepEqual(state.career.readiness,{status:'INSUFFICIENT_EVIDENCE'});
 assert.equal('score' in state.career.readiness,false);
 assert.equal(state.career.coverage,23);
});

test('recall improves freshness without changing mastery, campaign history, or recommendations',()=>{
 const before=createSkillIntelligenceDemoState();
 const sql=before.learnerState.concepts.find(concept=>concept.name==='SQL');
 const after=completeRecallQuest(before,sql.conceptId);
 const updated=after.learnerState.concepts.find(concept=>concept.conceptId===sql.conceptId);
 assert.equal(updated.freshness,100);
 assert.equal(updated.masteryLevel,sql.masteryLevel);
 assert.deepEqual(after.campaign,before.campaign);
 assert.deepEqual(after.recommendations,before.recommendations);
 assert.equal(sql.freshness,58);
});
