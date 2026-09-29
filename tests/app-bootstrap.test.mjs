import test from 'node:test';
import assert from 'node:assert/strict';
import {loadPlayerState} from '../src/bootstrap.js';

test('bootstrap reuses a valid session and loads its aggregate state',async()=>{
 const calls=[],result=await loadPlayerState({getCurrentPlayer:async()=>{calls.push('me');return {player:{id:'player-1'},isNew:false};},createPlayer:async()=>{calls.push('create');},getState:async()=>{calls.push('state');return {profile:{displayName:'Minh',preferences:{}},activeJourney:null,journeys:[],quests:[],knowledge:{domains:[],concepts:[],progress:[],ranks:[]},progress:{totalXp:0,dailyXp:0,streak:0,longestStreak:0},achievements:[],milestones:[],inventory:[]};}});
 assert.deepEqual(calls,['me','state']);assert.equal(result.mode,'server');assert.equal(result.identity.player.id,'player-1');assert.equal(result.state.profile.displayName,'Minh');
});

test('bootstrap creates a guest after a missing session and preserves its one-time code',async()=>{
 const result=await loadPlayerState({getCurrentPlayer:async()=>{throw Object.assign(new Error('no session'),{code:'SESSION_REQUIRED',status:401});},createPlayer:async()=>({player:{id:'player-2'},playerCode:'ABCD-EFGH-JK',isNew:true}),getState:async()=>({profile:{displayName:'Scribe',preferences:{}},journeys:[],quests:[],knowledge:{domains:[],concepts:[],progress:[],ranks:[]},progress:{totalXp:0,dailyXp:0,streak:0,longestStreak:0}})});
 assert.equal(result.mode,'server');assert.equal(result.playerCode,'ABCD-EFGH-JK');assert.equal(result.identity.isNew,true);
});

test('bootstrap falls back to local demo only when identity or state service is unavailable',async()=>{
 const localState={xp:250};const result=await loadPlayerState({offlineState:localState,api:{getCurrentPlayer:async()=>{throw Object.assign(new Error('offline'),{code:'NETWORK_ERROR'});}}});
 assert.equal(result.mode,'offline');assert.equal(result.state,localState);
 await assert.rejects(()=>loadPlayerState({offlineState:localState,api:{getCurrentPlayer:async()=>{throw Object.assign(new Error('invalid code'),{code:'PLAYER_CODE_INVALID',status:401});}}}),error=>error.code==='PLAYER_CODE_INVALID');
});
