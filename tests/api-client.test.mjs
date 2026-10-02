import test from 'node:test';
import assert from 'node:assert/strict';
import {getState,ApiError,completeQuest,startQuest,skipQuest,updateQuestStep,updateQuestNote,getJourneys,generateJourney,generateAIJourney,createJourneyProposal,acceptProposal,rejectProposal,finishJourney,archiveJourney,createPlayer,restorePlayer,enterDemo,getCurrentPlayer,streamCompanion,confirmMemory,dismissMemory,createAssessment,submitAssessment,startNewConversation,getInventory,unlockInventoryItem,equipInventoryItem} from '../src/api-client.js';

test('getState sends a same-origin credentialed request and returns the aggregate response',async()=>{
 let request;
 const expected={profile:{displayName:'Minh'},journeys:[],quests:[],knowledge:{domains:[],concepts:[],progress:[],ranks:[]},progress:{totalXp:250,level:3,dailyXp:10,dailyXpCap:120,streak:7,longestStreak:7},achievements:[],milestones:[],inventory:[],preferences:{}};
 const result=await getState({fetchImpl:async(url,options)=>{request={url,options};return new Response(JSON.stringify(expected),{status:200,headers:{'content-type':'application/json'}});}});
 assert.equal(request.url,'/api/state');assert.equal(request.options.credentials,'same-origin');assert.equal(request.options.headers.Accept,'application/json');assert.deepEqual(result,expected);
});

test('quest API helpers send only the requested mutation with same-origin credentials',async()=>{
 const requests=[];const fetchImpl=async(url,options)=>{requests.push({url,options});return new Response(JSON.stringify({ok:true}),{status:200,headers:{'content-type':'application/json'}});};
 await startQuest('quest-1',{fetchImpl,body:{xp:99999,status:'COMPLETED'}});await completeQuest('quest-1',{fetchImpl});await skipQuest('quest-1',{fetchImpl});await updateQuestStep('quest-1','step-2',true,{fetchImpl});await updateQuestNote('quest-1','A useful note',{fetchImpl});
 assert.deepEqual(requests.map(({url,options})=>[url,options.method]),[
  ['/api/quests/quest-1/start','POST'],['/api/quests/quest-1/complete','POST'],['/api/quests/quest-1/skip','POST'],['/api/quests/quest-1/steps/step-2','PATCH'],['/api/quests/quest-1/note','PUT']
 ]);
 assert.ok(requests.every(({options})=>options.credentials==='same-origin'));
 assert.equal(requests[0].options.body,undefined);assert.equal(requests[1].options.body,undefined);assert.equal(requests[3].options.body,'{"completed":true}');assert.equal(requests[4].options.body,'{"content":"A useful note"}');
});

test('journey API helpers centralize session-backed reads, proposals, and lifecycle actions',async()=>{
 const requests=[],fetchImpl=async(url,options)=>{requests.push({url,options});return new Response(JSON.stringify({ok:true}),{status:200,headers:{'content-type':'application/json'}});};
 await getJourneys({fetchImpl});await generateJourney({templateKey:'java',minutesPerDay:30,experienceLevel:'beginner'},{fetchImpl});await createJourneyProposal('journey-1',{type:'PACING',minutesPerDay:15},{fetchImpl});await acceptProposal('proposal-1',{fetchImpl});await rejectProposal('proposal-1',{fetchImpl});await finishJourney('journey-1',{fetchImpl});await archiveJourney('journey-1',{fetchImpl});
 assert.deepEqual(requests.map(({url,options})=>[url,options.method]),[
  ['/api/journeys','GET'],['/api/journeys/generate','POST'],['/api/journeys/journey-1/proposals','POST'],['/api/proposals/proposal-1/accept','POST'],['/api/proposals/proposal-1/reject','POST'],['/api/journeys/journey-1/finish','POST'],['/api/journeys/journey-1/archive','POST']
 ]);
 assert.ok(requests.every(({options})=>options.credentials==='same-origin'));assert.equal(requests[1].options.body,'{"templateKey":"java","minutesPerDay":30,"experienceLevel":"beginner"}');assert.equal(requests[3].options.body,undefined);
});

test('getState reports safe API errors and network failures with typed errors',async()=>{
 await assert.rejects(()=>getState({fetchImpl:async()=>new Response(JSON.stringify({error:{code:'SESSION_REQUIRED',message:'Create a player or restore a Player Code to continue.'}}),{status:401})}),error=>error instanceof ApiError&&error.status===401&&error.code==='SESSION_REQUIRED');
 await assert.rejects(()=>getState({fetchImpl:async()=>{throw new Error('offline');}}),error=>error instanceof ApiError&&error.status===0&&error.code==='NETWORK_ERROR');
});

test('identity API helpers use same-origin sessions and return one-time player codes only from create and restore',async()=>{
 const requests=[],fetchImpl=async(url,options)=>{requests.push({url,options});return new Response(JSON.stringify({player:{id:'p1',displayName:'Minh'},playerCode:url==='/api/player'?'ABCD-EFGH-JK':undefined}),{status:200,headers:{'content-type':'application/json'}});};
 const created=await createPlayer({fetchImpl});const restored=await restorePlayer('ABCD-EFGH-JK',{fetchImpl});await enterDemo({fetchImpl});await getCurrentPlayer({fetchImpl});
 assert.equal(created.playerCode,'ABCD-EFGH-JK');assert.equal(restored.playerCode,undefined);
 assert.deepEqual(requests.map(({url,options})=>[url,options.method]),[['/api/player','POST'],['/api/player/restore','POST'],['/api/player/demo','POST'],['/api/player/me','GET']]);
 assert.ok(requests.every(({options})=>options.credentials==='same-origin'));
 assert.equal(requests[1].options.body,'{"code":"ABCD-EFGH-JK"}');
});

test('streamCompanion sends same-origin credentials, decodes token events and surfaces typed errors',async()=>{
 const chunks=[new TextEncoder().encode('event: token\ndata: {"text":"Hello"}\n\nevent: done\ndata: {}\n\n')],calls=[];
 const response=await streamCompanion('Hi',{fetchImpl:async(url,options)=>{calls.push({url,options});return new Response(new ReadableStream({start(controller){chunks.forEach(chunk=>controller.enqueue(chunk));controller.close();}}),{status:200,headers:{'content-type':'text/event-stream'}});},onToken:text=>assert.equal(text,'Hello')});
 assert.deepEqual(response,{stopped:false});assert.equal(calls[0].url,'/api/companion/chat');assert.equal(calls[0].options.credentials,'same-origin');assert.equal(calls[0].options.body,'{"message":"Hi"}');
 await assert.rejects(()=>streamCompanion('Hi',{fetchImpl:async()=>new Response(JSON.stringify({error:{code:'AI_UNAVAILABLE',message:'Live chat unavailable'}}),{status:503})}),error=>error instanceof ApiError&&error.code==='AI_UNAVAILABLE');
});

test('memory decision helpers use session-backed owner routes',async()=>{
 const requests=[],fetchImpl=async(url,options)=>{requests.push([url,options]);return new Response('{"memory":{"status":"CONFIRMED"}}',{status:200});};
 await confirmMemory('memory id',{fetchImpl});await dismissMemory('memory-2',{fetchImpl});assert.deepEqual(requests.map(([url,options])=>[url,options.method]),[['/api/memories/memory%20id/confirm','POST'],['/api/memories/memory-2/dismiss','POST']]);assert.ok(requests.every(([,options])=>options.credentials==='same-origin'));
});

test('AI roadmap generation helper posts only the onboarding fields with session credentials',async()=>{
 let request;const input={topic:'ESP32',goal:'Build a sensor monitor',experienceLevel:'beginner',minutesPerDay:30};
 await generateAIJourney(input,{fetchImpl:async(url,options)=>{request={url,options};return new Response('{"proposal":{}}',{status:201});}});
 assert.equal(request.url,'/api/journeys/generate-ai');assert.equal(request.options.method,'POST');assert.equal(request.options.credentials,'same-origin');assert.equal(request.options.body,JSON.stringify(input));
});

test('assessment helpers post session-backed inputs without moving grading authority into the browser',async()=>{
 const requests=[],fetchImpl=async(url,options)=>{requests.push({url,options});return new Response('{"assessment":{"id":"a1"},"result":{"verdict":"STRONG"}}',{status:200});};
 const create={subtype:'QUIZ',topic:'Java',prompt:'Explain references',questId:'q1'},answers={answers:[0,1]};await createAssessment(create,{fetchImpl});await submitAssessment('a1',answers,{fetchImpl});
 assert.deepEqual(requests.map(({url,options})=>[url,options.method]),[['/api/assessments','POST'],['/api/assessments/a1/submit','POST']]);assert.ok(requests.every(({options})=>options.credentials==='same-origin'));assert.equal(requests[0].options.body,JSON.stringify(create));assert.equal(requests[1].options.body,JSON.stringify(answers));
});

test('starting a new Companion conversation uses the authenticated same-origin endpoint',async()=>{
 let request;await startNewConversation({fetchImpl:async(url,options)=>{request={url,options};return new Response('{"conversation":{"id":"c2"}}',{status:201});}});assert.equal(request.url,'/api/companion/conversations/new');assert.equal(request.options.method,'POST');assert.equal(request.options.credentials,'same-origin');assert.equal(request.options.body,undefined);
});

test('inventory client helpers use credentialed same-origin catalog, purchase, and equip routes',async()=>{
 const requests=[],fetchImpl=async(url,options)=>{requests.push({url,options});return new Response('{"items":[]}',{status:200});};await getInventory({fetchImpl});await unlockInventoryItem('item-1',{fetchImpl});await equipInventoryItem('item-1',{fetchImpl});assert.deepEqual(requests.map(({url,options})=>[url,options.method]),[['/api/inventory','GET'],['/api/inventory/item-1/unlock','POST'],['/api/inventory/item-1/equip','POST']]);assert.ok(requests.every(({options})=>options.credentials==='same-origin'));assert.equal(requests[1].options.body,undefined);
});
