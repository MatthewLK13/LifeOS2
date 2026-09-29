import test from 'node:test';
import assert from 'node:assert/strict';
import {TRACKS,CONCEPTS} from '../src/data.js';
import {createRoadmap,createInitialState,hydrate,detectTrack} from '../src/state.js';
import {knowledgeGraph,roadmapGraph} from '../src/graph.js';
test('twenty direct branches have complete multi-domain curricula and chat routing',()=>{
 assert.equal(TRACKS.length,20);
 for(const id of ['esp32','sensors','iot','xiaozhi','psychology','ielts','badminton','fitness','habits']){
  const t=TRACKS.find(t=>t.id===id);assert.ok(t);assert.ok(t.modules.length>=8);assert.ok(t.concepts.length>=32);
  assert.equal(detectTrack(t.name),id);
 }
});
test('each roadmap is an acyclic branching graph with explicit dependencies',()=>{
 for(const t of TRACKS){
  const p=createRoadmap({trackId:t.id});
  assert.ok(p.chapters.some(c=>c.optional));
  assert.ok(p.chapters.every((c,i)=>Array.isArray(c.requires)&&c.requires.every(n=>n>=0&&n<i)));
  assert.ok(p.chapters.some((_,i)=>p.chapters.filter(c=>c.requires.includes(i)).length>1));
  const html=roadmapGraph(p,p.chapters.flatMap(c=>c.quests),0);
  for(let i=0;i<p.chapters.length;i++)assert.ok(html.includes(`data-id="${i}"`));
  assert.doesNotMatch(html,/NaN|undefined/);
 }
});
test('overview exposes all direct branches and concept leaves together',()=>{
 const html=knowledgeGraph(CONCEPTS,{});
 for(const t of TRACKS){assert.ok(html.includes(`data-id="${t.id}"`));assert.ok(html.includes(`data-id="${t.id}-0"`));}
 assert.ok(html.includes('cross-link'));assert.doesNotMatch(html,/NaN|undefined/);
});
test('dynamic knowledge branches and concepts render in the existing graph',()=>{
 const domain={id:'custom-domain',name:'Home Automation',icon:'tree',color:'#96711d'};
 const concepts=[{id:'custom-concept',trackId:'custom-domain',name:'MQTT QoS',status:'discovered'}];
 const overview=knowledgeGraph(concepts,{domains:[domain]});assert.ok(overview.includes('data-id="custom-domain"'));assert.ok(overview.includes('data-id="custom-concept"'));assert.doesNotMatch(overview,/NaN|undefined/);
 const branch=knowledgeGraph(concepts,{track:'custom-domain',domains:[domain]});assert.ok(branch.includes('MQTT QoS'));assert.doesNotMatch(branch,/NaN|undefined/);
});
test('catalog expansion preserves prior notes, XP and active journey',()=>{
 const s=createInitialState();s.catalogVersion=3;s.concepts=s.concepts.filter(c=>['python','java','js','dsa','oop','ai','rag'].includes(c.trackId));s.xp=431;s.quests[0].notes='Saved note';
 const migrated=hydrate(JSON.stringify(s));assert.equal(migrated.xp,431);assert.equal(migrated.activeId,s.activeId);assert.equal(migrated.quests[0].notes,'Saved note');assert.equal(migrated.concepts.length,CONCEPTS.length);
});
