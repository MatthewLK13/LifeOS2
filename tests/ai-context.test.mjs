import test from 'node:test';
import assert from 'node:assert/strict';
import {buildChatContext} from '../server/ai/context.ts';

test('chat context is bounded, keeps latest message, and includes only provided confirmed memories',()=>{
 const result=buildChatContext({displayName:'Scribe',timezone:'Asia/Ho_Chi_Minh',journey:{title:'Java',goal:'Build apps'},knowledge:['Classes: UNDERSTANDING'],memories:['Confirmed project learning preference'],summaries:['A short summary'],messages:Array.from({length:40},(_,i)=>({role:i%2?'ASSISTANT':'USER',content:`Old message ${i} `.repeat(500)})),currentMessage:'Explain inheritance'});
 assert.ok(result.system.length<8001);assert.ok(result.messages.length<=21);assert.equal(result.messages.at(-1).content,'Explain inheritance');assert.equal(result.messages.at(-1).role,'user');assert.ok(result.system.includes('Confirmed project learning preference'));assert.ok(result.system.includes('Build apps'));assert.ok(result.messages.reduce((sum,item)=>sum+item.content.length,0)+result.system.length<=24000);
});
