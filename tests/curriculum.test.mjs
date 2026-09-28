import test from 'node:test';
import assert from 'node:assert/strict';
import {TRACKS,CONCEPTS} from '../src/data.js';
import {createRoadmap,createInitialState,hydrate,respondToChat} from '../src/state.js';
import {roadmapGraph,knowledgeGraph} from '../src/graph.js';

test('expanded tracks cover distinct concepts with chapter-specific activities',()=>{
  for(const id of ['java','dsa','python','oop','ai','rag','js']){
    const t=TRACKS.find(t=>t.id===id);assert.ok(t,`Missing ${id}`);
    assert.ok(t.concepts.length>=28,`${id} needs deeper concept coverage`);
    const p=createRoadmap({trackId:id,minutes:30});assert.ok(p.chapters.length>=8);
    assert.ok(p.chapters.every(c=>c.topics?.length>=3&&c.summary&&c.quests.length>=4));
    for(const topic of t.concepts)assert.ok(p.chapters.some(c=>c.topics.includes(topic)),`${id}: ${topic}`);
    assert.equal(new Set(p.chapters.map(c=>c.quests.at(-1).prompt)).size,p.chapters.length);
    assert.ok(p.chapters.every(c=>c.quests.every(q=>q.minutes<=30)));
  }
});
test('JavaScript and AI chat create their own plans rather than Java or RAG',()=>{
  for(const [prompt,id] of [['I want to learn JS','js'],['Learn JavaScript','js'],['Learn AI and machine learning','ai'],['Build a RAG chatbot','rag']]){
    let s=respondToChat(createInitialState(),prompt);assert.equal(s.builder.trackId,id);
    s=respondToChat(s,'I know the basics');s=respondToChat(s,'30 minutes a day');
    assert.equal(s.draft.trackId,id);assert.match(s.messages.at(-1).text,new RegExp(`${s.draft.chapters.length} chapters`));
    assert.equal(hydrate(JSON.stringify(s)).draft.trackId,id);
  }
});
test('later roadmap chapters and concepts have finite visible graph coordinates',()=>{
  const p=createRoadmap({trackId:'java',minutes:30});
  const html=roadmapGraph(p,p.chapters.flatMap(c=>c.quests),p.chapters.length-1);
  assert.doesNotMatch(html,/undefined|NaN/);assert.match(html,new RegExp(`data-id="${p.chapters.length-1}"`));
  const concepts=CONCEPTS.filter(c=>c.trackId==='java');
  const graph=knowledgeGraph(CONCEPTS,{track:'java',page:Math.floor((concepts.length-1)/6)});
  assert.ok(graph.includes(concepts.at(-1).id));assert.doesNotMatch(graph,/top:-\d/);
});
test('an older save upgrades its catalog without losing notes, XP, or quest history',()=>{
  const s=createInitialState();s.catalogVersion=1;s.xp=333;s.quests[0].notes='Keep this work';
  const oldId=s.quests[0].id;s.journeys[0].chapters=s.journeys[0].chapters.slice(0,4);
  s.quests=s.quests.filter(q=>q.chapter<4);s.concepts=s.concepts.filter(c=>['python','dsa','java','oop','rag'].includes(c.trackId)).slice(0,30);
  const next=hydrate(JSON.stringify(s));assert.equal(next.xp,333);assert.equal(next.quests.find(q=>q.id===oldId).notes,'Keep this work');assert.ok(next.journeys[0].chapters.length>=8);assert.ok(next.concepts.some(c=>c.trackId==='js'));
});

test('migration keeps new topics when legacy activity IDs collide',()=>{
  const s=createInitialState();s.catalogVersion=1;
  const q=s.quests[0];q.topic='Legacy topic';q.title='Legacy activity';q.notes='Retain me';
  const next=hydrate(JSON.stringify(s));
  const topics=TRACKS.find(t=>t.id===q.trackId).concepts;
  for(const topic of topics)assert.ok(next.quests.some(x=>x.journeyId===q.journeyId&&x.topic===topic),topic);
  assert.equal(next.quests.find(x=>x.id===q.id).notes,'Retain me');
  assert.equal(new Set(next.quests.map(x=>x.id)).size,next.quests.length);
});
