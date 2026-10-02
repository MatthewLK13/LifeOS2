import test from 'node:test';
import assert from 'node:assert/strict';
import {GeminiProvider} from '../server/ai/gemini.ts';

function sseResponse(lines){return new Response(new ReadableStream({start(controller){for(const line of lines)controller.enqueue(new TextEncoder().encode(line));controller.close();}}),{status:200,headers:{'content-type':'text/event-stream'}});}

test('Gemini streaming uses server key header, decodes text and reports provider usage',async()=>{
 let request;
 const provider=new GeminiProvider({apiKey:'server-secret',primaryModel:'gemini-test',backgroundModel:'gemini-lite',fetchImpl:async(url,options)=>{request={url,options};return sseResponse(['data: {"candidates":[{"content":{"parts":[{"text":"Hello "}]}}]}\n\n','data: {"candidates":[{"content":{"parts":[{"text":"world"}]}}],"usageMetadata":{"promptTokenCount":4,"candidatesTokenCount":2}}\n\n']);}});
 const chunks=[];for await(const chunk of provider.streamChat({system:'Be helpful',messages:[{role:'user',content:'Hi'}]}))chunks.push(chunk);
 assert.match(request.url,/models\/gemini-test:streamGenerateContent\?alt=sse/);assert.equal(request.options.headers['x-goog-api-key'],'server-secret');
 assert.equal(chunks.map(chunk=>chunk.text).join(''),'Hello world');assert.deepEqual(chunks.at(-1).usage,{inputTokens:4,outputTokens:2});
});

test('Gemini streaming propagates abort and structured generation validates JSON payload',async()=>{
 let structuredBody;
 const provider=new GeminiProvider({apiKey:'key',primaryModel:'gemini-test',backgroundModel:'gemini-lite',fetchImpl:async(url,options)=>{structuredBody=JSON.parse(options.body);return new Response(JSON.stringify({candidates:[{content:{parts:[{text:'{"ok":true}'}]}}],usageMetadata:{promptTokenCount:3,candidatesTokenCount:1}}),{status:200});}});
 const result=await provider.generateStructured({purpose:'MEMORY',schema:{type:'object'},prompt:'Return JSON'});assert.deepEqual(result.data,{ok:true});assert.equal(structuredBody.generationConfig.responseMimeType,'application/json');
 const controller=new AbortController();controller.abort();await assert.rejects(async()=>{for await(const _ of provider.streamChat({messages:[]},controller.signal)){}},/abort/i);
});

test('Gemini routes roadmap generation to the primary model',async()=>{
 let url;const provider=new GeminiProvider({apiKey:'key',primaryModel:'gemini-primary',backgroundModel:'gemini-background',fetchImpl:async(requestUrl)=>{url=requestUrl;return new Response(JSON.stringify({candidates:[{content:{parts:[{text:'{"chapters":[]}'}]}}]}),{status:200});}});
 const result=await provider.generateStructured({purpose:'ROADMAP',schema:{type:'object'},prompt:'Draft a learning path'});assert.match(url,/models\/gemini-primary:generateContent/);assert.equal(result.model,'gemini-primary');
});
