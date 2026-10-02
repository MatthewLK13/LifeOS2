import test from 'node:test';
import assert from 'node:assert/strict';
import {shouldAnalyzeLearningMessage,LearningAnalysisSchema,analyzeLearningTurn} from '../server/ai/analyzer.ts';

test('learning gate skips low-value chat and allows conceptual and applied reasoning',()=>{
 assert.equal(shouldAnalyzeLearningMessage('Thanks!'),false);
 assert.equal(shouldAnalyzeLearningMessage('Go to the roadmap page'),false);
 assert.equal(shouldAnalyzeLearningMessage('Please explain why Java interfaces support multiple implementations and how that differs from abstract classes.'),true);
 assert.equal(shouldAnalyzeLearningMessage('Here is my code: class Bird { void fly() {} } why does the override fail?'),true);
});

test('learning analysis validates strict bounded structured output before it can be persisted',async()=>{
 let request;
 const provider={async generateStructured(value){request=value;return {data:{signals:[{conceptName:'Interfaces',suggestedDomainName:'Java',signalType:'UNDERSTANDING',confidence:.82,reasonShort:'Explains contracts'}],memoryCandidates:[{text:'Learns best through small projects',confidence:.91}]},model:'test'};}};
 const result=await analyzeLearningTurn(provider,{userMessage:'Explain interfaces and their role.',assistantMessage:'An interface defines a contract.'});
 assert.equal(result.signals[0].signalType,'UNDERSTANDING');assert.equal(result.memoryCandidates[0].confidence,.91);assert.equal(request.purpose,'KNOWLEDGE_ANALYSIS');
 assert.equal(LearningAnalysisSchema.safeParse({signals:[{conceptName:'X',signalType:'MASTERED',confidence:1,reasonShort:'Too high'}],memoryCandidates:[]}).success,false);
 assert.equal(LearningAnalysisSchema.safeParse({signals:[{conceptName:'X',signalType:'DISCOVERY',confidence:1,reasonShort:'ok',playerId:'injected'}],memoryCandidates:[]}).success,false);
});
