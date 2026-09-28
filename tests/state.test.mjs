import test from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState, createRoadmap, activateRoadmap, completeQuest, proposeSchedule, applyProposal, hydrate, respondToChat,settleChat} from '../src/state.js';
import {todayPage,knowledgePage} from '../src/pages.js';

test('completing a quest awards XP once, preserves rank and original state', () => {
  const state = createInitialState();
  const ranks = structuredClone(state.ranks);
  const next = completeQuest(state, 'seed-embeddings');
  assert.equal(next.xp, 270);
  assert.equal(state.xp, 250);
  assert.equal(next.quests.find(q => q.id === 'seed-embeddings').status, 'completed');
  assert.deepEqual(next.ranks, ranks);
  assert.equal(completeQuest(next, 'seed-embeddings').xp, 270);
});
test('daily reward cap limits XP without blocking completion', () => {
  const state = createInitialState(); state.dailyXp = 115;
  const next = completeQuest(state, 'seed-embeddings');
  assert.equal(next.xp, 255);
  assert.equal(next.dailyXp, 120);
  assert.equal(next.quests.find(q => q.id === 'seed-embeddings').status, 'completed');
});
test('five goal templates generate distinct plans with bounded sessions', () => {
  const titles = new Set();
  for (const trackId of ['python','dsa','java','oop','rag']) {
    const plan = createRoadmap({trackId, experience:'beginner', minutes:30});
    titles.add(plan.title);
    assert.equal(plan.trackId, trackId);
    assert.equal(plan.minutes, 30);
    assert.ok(plan.chapters.length >= 4);
    assert.ok(plan.chapters.every(c=>c.quests.every(q=>q.minutes<=30)));
  }
  assert.equal(titles.size, 5);
});
test('roadmap activation is explicit and idempotent, preserving old quests and XP', () => {
  const state = createInitialState();
  const plan = createRoadmap({trackId:'java',experience:'beginner',minutes:30});
  assert.equal(state.journeys.length, 1);
  const next = activateRoadmap(state,plan);
  assert.equal(next.journeys.length, 2);
  assert.equal(next.activeId,plan.id);
  assert.equal(next.xp,250);
  assert.ok(next.quests.some(q=>q.id==='seed-embeddings'));
  assert.equal(activateRoadmap(next,plan).journeys.length,2);
});
test('schedule preview does not mutate active plan; apply preserves in-progress quest', () => {
  const state = createInitialState();
  const proposed = proposeSchedule(state,30);
  assert.equal(proposed.journeys[0].minutes,60);
  assert.equal(proposed.proposal.minutes,30);
  const next = applyProposal(proposed);
  assert.equal(next.journeys[0].minutes,30);
  assert.equal(next.journeys[0].version,2);
  assert.deepEqual(next.quests.find(q=>q.id==='seed-embeddings'),state.quests.find(q=>q.id==='seed-embeddings'));
  assert.equal(next.proposal,null);
  assert.equal(next.xp,250);
});
test('invalid or obsolete storage returns usable seed; valid state round-trips', () => {
  for(const raw of ['bad json','null','{}','{"version":1}', '{"schema":3,"quests":null}']) {
    assert.equal(hydrate(raw).xp,250);
  }
  const state = completeQuest(createInitialState(),'seed-embeddings');
  assert.equal(hydrate(JSON.stringify(state)).xp,270);
});
test('chat collects Java goal, background and time then offers a draft without activating', () => {
  let state = createInitialState();
  state = respondToChat(state,'I want to learn Java from scratch');
  assert.equal(state.builder.trackId,'java');
  assert.equal(state.builder.stage,'experience');
  state = respondToChat(state,'I am a beginner');
  assert.equal(state.builder.stage,'time');
  state = respondToChat(state,'30 minutes a day');
  assert.equal(state.draft.trackId,'java');
  assert.equal(state.draft.minutes,30);
  assert.equal(state.journeys.length,1);
});
test('unsupported chat topic has an honest fallback and does not create a plan', () => {
  const state = respondToChat(createInitialState(),'Teach me medieval pottery');
  assert.equal(state.draft,null);
  assert.match(state.messages.at(-1).text,/demo/i);
});
test('invalid study duration cannot create a roadmap', () => {
  assert.throws(()=>createRoadmap({trackId:'java',experience:'beginner',minutes:0}));
  assert.throws(()=>createRoadmap({trackId:'unknown',experience:'beginner',minutes:30}));
});
test('malformed nested saves recover before screen rendering',()=>{
  const variants=[s=>s.concepts=[],s=>s.concepts[0].status='invalid',s=>s.messages=[{}],s=>s.builder=null,s=>s.journeys[0].chapters=[],s=>s.preferences=null];
  for(const corrupt of variants){const s=createInitialState();corrupt(s);const safe=hydrate(JSON.stringify(s));assert.doesNotThrow(()=>knowledgePage(safe,{track:'all',search:'',filter:'all',concept:'python-0',view:'graph'}));assert.equal(safe.messages[0].role,'assistant');}
});
test('finished journey no longer assigns quests on Today',()=>{
  const s=createInitialState();s.journeys[0].status='completed';
  const html=todayPage(s);assert.doesNotMatch(html,/Continue Quest|Begin Quest/);assert.match(html,/journey complete/i);
});
test('schedule splits unstarted activities to fit budget without increasing XP',()=>{
  const s=createInitialState(),next=applyProposal(proposeSchedule(s,15));
  const planned=next.quests.filter(q=>q.journeyId===s.activeId&&q.status==='active');
  assert.ok(planned.every(q=>q.minutes<=15));
  assert.equal(next.quests.reduce((n,q)=>n+q.xp,0),s.quests.reduce((n,q)=>n+q.xp,0));
});
test('a delayed chat preserves a journey activated while it was replying',()=>{
  const base=createInitialState();base.draft=createRoadmap({trackId:'java',minutes:30});base.builder={stage:'ready',trackId:'java'};
  const response=respondToChat(base,'Explain Java');
  const current=activateRoadmap(base,base.draft);current.preferences.streak=false;
  const result=settleChat(current,base,response);
  assert.equal(result.journeys.length,2);assert.equal(result.draft,null);assert.equal(result.preferences.streak,false);assert.equal(result.builder.stage,'goal');assert.match(result.messages.at(-1).text,/class/);
});
