import test from 'node:test';
import assert from 'node:assert/strict';
import {budgetWeekStart,estimateCostMicros} from '../server/ai/pricing.ts';

test('AI budget week starts Monday at midnight in the configured timezone',()=>{
 const start=budgetWeekStart(new Date('2026-09-28T04:00:00.000Z'),'Asia/Ho_Chi_Minh');assert.equal(start.toISOString(),'2026-09-27T17:00:00.000Z');
});

test('central Gemini pricing returns estimated USD micros per request',()=>{
 assert.equal(estimateCostMicros('gemini-3.8-flash',1000,1000),4500);
 assert.equal(estimateCostMicros('gemini-3.5-flash-lite',1000,1000),2800);
});
