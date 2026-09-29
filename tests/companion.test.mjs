import test from 'node:test';
import assert from 'node:assert/strict';
import {companionPage,draftCard} from '../src/companion.js';

test('account Companion renders pending memory confirmation without exposing internal analyzer rationale',()=>{
 const html=companionPage({builder:{stage:'goal'},messages:[],memoryCandidates:[{id:'memory-1',text:'Learns best through projects.',reasonShort:'private'}]},false,'',true);
 assert.match(html,/ARCANA NOTICED/);assert.match(html,/Learns best through projects/);assert.match(html,/Remember/);assert.match(html,/Dismiss/);assert.doesNotMatch(html,/private/);
});

test('custom roadmap preview renders without a seeded track and exposes Accept and Reject actions',()=>{
 const html=draftCard({aiProposalId:'proposal-1',trackId:'esp32-iot',trackName:'ESP32 IoT',title:'Sensor Systems',minutes:30,days:20,experience:'beginner',chapters:[{title:'Foundations',lane:'Core',topics:['GPIO']}]});
 assert.match(html,/ESP32 IoT/);assert.match(html,/AI-generated preview/);assert.match(html,/data-action="activate"/);assert.match(html,/data-action="reject-roadmap"/);
});
