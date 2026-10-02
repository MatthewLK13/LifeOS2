import test from 'node:test';
import assert from 'node:assert/strict';
import {createSkillIntelligenceEmptyState,completeGeneratedQuest} from '../src/skill-intelligence.js';
import {buildQuestFromAction,getGeneratedQuestById} from '../src/quest-factory.js';

test('new learner starts without evidence and receives a learnable next action',()=>{
  const state=createSkillIntelligenceEmptyState();
  assert.equal(state.learnerState.concepts.every(concept=>concept.masteryLevel==='UNSEEN'&&concept.evidenceStrength.length===0),true);
  assert.equal(state.career.readiness.status,'INSUFFICIENT_EVIDENCE');
  assert.equal(state.recommendations[0].mode,'LEARN');
});

test('quest factory creates a complete quest contract from the engine recommendation',()=>{
  const state=createSkillIntelligenceEmptyState();
  const quest=buildQuestFromAction(state.recommendations[0],state);
  assert.equal(quest.id,state.recommendations[0].id);
  assert.equal(quest.type,'LEARN');
  assert.ok(quest.assignment.instructions);
  assert.ok(quest.rubric.length>0);
  assert.ok(quest.expectedEvidence);
  assert.deepEqual(getGeneratedQuestById(state.recommendations[0].id,state),quest);
});

test('completing a generated quest updates the learner and produces a different next action',()=>{
  const state=createSkillIntelligenceEmptyState();
  const first=state.recommendations[0];
  const next=completeGeneratedQuest(state,first);
  assert.notEqual(next.learnerState.concepts.find(concept=>concept.conceptId===first.conceptIds[0]).masteryLevel,'UNSEEN');
  assert.notEqual(next.recommendations[0].title,first.title);
  assert.equal(next.demoHistory.at(-1).type,'GENERATED_QUEST_COMPLETED');
});
