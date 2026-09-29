import test from 'node:test';
import assert from 'node:assert/strict';
import {generateCustomRoadmap,CustomRoadmapSchema} from '../server/ai/roadmap.ts';

const activity={title:'Explore the circuit',type:'Learn',difficulty:'C',minutes:20,prompt:'Explain the wiring and label its important parts.',steps:['Read the pin map','Draw the circuit'],description:'Sensor basics',topic:'GPIO'};
const generated={title:'ESP32 Connected Sensor Systems',domainName:'ESP32 & IoT',chapters:Array.from({length:6},(_,i)=>({title:`Chapter ${i+1}`,summary:'Build a working connected device.',lane:i<3?'Foundations':'Applied practice',topics:['GPIO','Sensors','MQTT'],requires:i? [i-1]:[],optional:false,quests:[activity,{...activity,title:'Wire one sensor'}]}))};

test('custom roadmap generation grounds output and derives bounded schedule metadata',async()=>{
 let request;const provider={async generateStructured(value){request=value;return {data:generated,usage:{inputTokens:500,outputTokens:600},model:'gemini-primary'};}};
 const result=await generateCustomRoadmap(provider,{topic:'ESP32 and sensors',goal:'Build a greenhouse monitor',experienceLevel:'beginner',minutesPerDay:30},[{name:'IoT',description:'Devices, sensors and protocols.'}]);
 assert.equal(request.purpose,'ROADMAP');assert.match(request.prompt,/Build a greenhouse monitor/);assert.match(request.prompt,/IoT/);assert.equal(result.draft.trackId,'esp32-iot');assert.equal(result.draft.experience,'beginner');assert.ok(result.draft.days>=4);assert.equal(result.draft.chapters.length,6);assert.deepEqual(result.draft.chapters[0].requires,[]);
});

test('custom roadmap schema rejects unsupported quest types, forward dependencies and oversized output',()=>{
 const invalid=structuredClone(generated);invalid.chapters[0].quests[0].type='Unknown';assert.equal(CustomRoadmapSchema.safeParse(invalid).success,false);
 const cyclic=structuredClone(generated);cyclic.chapters[0].requires=[1];assert.equal(CustomRoadmapSchema.safeParse(cyclic).success,false);
 const oversized=structuredClone(generated);oversized.chapters=[];assert.equal(CustomRoadmapSchema.safeParse(oversized).success,false);
});
