import test from 'node:test';
import assert from 'node:assert/strict';
import {toViewState} from '../src/server-state.js';

test('aggregate API state maps to the existing desktop view model without fabricating evidence',()=>{
 const api={
  profile:{playerId:'player-1',displayName:'Minh',role:'DEMO',coins:45,timezone:'Asia/Ho_Chi_Minh',preferences:{streak:true,inference:false,reducedMotion:true}},
  activeJourney:{id:'journey-1'},journeys:[{id:'journey-1',title:'Learn Java',goal:'Build a Java app',status:'ACTIVE',version:2,minutesPerDay:30,experienceLevel:'beginner',templateKey:'java',chapters:[{id:'chapter-1',title:'Foundations',summary:'Java basics',orderIndex:0,lane:'Suggested path',metadata:{topics:['Syntax'],requires:[],optional:false},quests:[{id:'quest-1',journeyId:'journey-1',chapterId:'chapter-1',type:'LEARN',title:'Explore Syntax',description:'Try Java',topic:'Syntax',prompt:'Build something',difficulty:'C',xpReward:10,minutes:15,status:'IN_PROGRESS',orderIndex:0,metadata:{originalType:'Learn'},steps:[{id:'step-1',orderIndex:0,content:'Read',completed:true}],notes:'Keep this note'}]}]}],
  quests:[{id:'quest-1',journeyId:'journey-1',chapterId:'chapter-1',type:'LEARN',title:'Explore Syntax',description:'Try Java',topic:'Syntax',prompt:'Build something',difficulty:'C',xpReward:10,minutes:15,status:'IN_PROGRESS',orderIndex:0,metadata:{originalType:'Learn'},steps:[{id:'step-1',orderIndex:0,content:'Read',completed:true}],notes:'Keep this note'}],
  knowledge:{domains:[{id:'java',key:'java',name:'Java',concepts:['java-0','java-1']}],concepts:[{id:'java-0',key:'java-0',domainId:'java',name:'Java foundations',level:'UNDERSTANDING'},{id:'java-1',key:'java-1',domainId:'java',name:'OOP',level:'MASTERED'}],progress:[],ranks:[{domainId:'java',rank:'Adept'}]},
  progress:{totalXp:270,level:3,dailyXp:20,dailyXpCap:120,streak:4,longestStreak:8},achievements:[],milestones:[],inventory:[],conversation:{id:'conversation-1',messages:[{id:'message-1',role:'USER',content:'Hi',status:'COMPLETE'}]},memoryCandidates:[{id:'memory-1',text:'I learn by building projects.',sourceConversationId:'conversation-1'}]
 };
 const result=toViewState(api);
 assert.equal(result.xp,270);assert.equal(result.activeId,'journey-1');assert.equal(result.journeys[0].minutes,30);assert.equal(result.journeys[0].chapters[0].quests[0].status,'in-progress');
 assert.equal(result.quests[0].xp,10);assert.deepEqual(result.quests[0].checks,[0]);assert.equal(result.quests[0].notes,'Keep this note');
 const concept=result.concepts.find(item=>item.id==='java-0');assert.equal(concept.status,'understanding');assert.deepEqual(concept.evidence,[]);assert.equal(result.concepts.find(item=>item.id==='java-1').status,'mastered');
 assert.deepEqual(result.messages,[{id:'message-1',role:'user',text:'Hi',status:'COMPLETE',serverSaved:true}]);assert.deepEqual(result.memoryCandidates,[{id:'memory-1',text:'I learn by building projects.',sourceConversationId:'conversation-1',createdAt:undefined}]);assert.equal(result.profile.displayName,'Minh');assert.equal(result.preferences.reducedMotion,true);
});

test('aggregate API state safely ignores unknown statuses and private/non-user messages',()=>{
 const base={profile:{displayName:'Scribe',coins:0,preferences:{}},activeJourney:null,journeys:[],quests:[],knowledge:{domains:[],concepts:[{id:'unknown-concept',domainId:'custom',name:'Private topic',level:'UNKNOWN'}],progress:[],ranks:[]},progress:{totalXp:0,dailyXp:0,streak:0,longestStreak:0},achievements:[],milestones:[],inventory:[],conversation:{messages:[{role:'SYSTEM',content:'secret'},{role:'ASSISTANT',content:'Welcome',status:'COMPLETE'},{role:'ASSISTANT',content:'partial',status:'FAILED'}]},memoryCandidates:[{id:'private',text:'candidate'}]};
 const result=toViewState(base);assert.equal(result.concepts[0].status,'unobserved');assert.deepEqual(result.concepts[0].evidence,[]);assert.deepEqual(result.messages,[{role:'assistant',text:'Welcome',status:'COMPLETE',serverSaved:true}]);assert.deepEqual(result.memories,[]);
});

test('dynamic account domains and concepts map into renderable branches without evidence',()=>{
 const result=toViewState({profile:{displayName:'Scribe',preferences:{}},journeys:[],quests:[],knowledge:{domains:[{id:'custom-domain',key:null,name:'Home Automation',iconKey:'tree',colorKey:'gold',concepts:['custom-concept']}],concepts:[{id:'custom-concept',key:null,domainId:'custom-domain',name:'MQTT QoS',description:'Message delivery guarantees.',level:'DISCOVERED'}],progress:[],ranks:[{domainId:'custom-domain',rank:'Novice'}]},progress:{totalXp:0,dailyXp:0,streak:0,longestStreak:0}});
 assert.equal(result.domains[0].id,'custom-domain');assert.equal(result.domains[0].name,'Home Automation');assert.equal(result.concepts.at(-1).trackId,'custom-domain');assert.equal(result.concepts.at(-1).domainName,'Home Automation');assert.equal(result.concepts.at(-1).status,'discovered');assert.deepEqual(result.concepts.at(-1).evidence,[]);assert.equal(result.ranks[0].trackId,'custom-domain');
});
