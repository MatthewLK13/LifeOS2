import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateDomainRank} from '../server/knowledge/rank.ts';

test('domain rank requires breadth as well as score',()=>{
 assert.equal(calculateDomainRank(['MASTERED']).rank,'Novice');
 assert.equal(calculateDomainRank(['APPLYING','APPLYING','APPLYING']).rank,'Apprentice');
 assert.equal(calculateDomainRank(Array(5).fill('UNDERSTANDING')).rank,'Adept');
 assert.equal(calculateDomainRank(Array(4).fill('APPLYING')).rank,'Expert');
 assert.equal(calculateDomainRank([...Array(5).fill('MASTERED'),...Array(3).fill('APPLYING')]).rank,'Master');
});

test('domain score ignores unseen concepts and handles an empty domain',()=>{
 assert.equal(calculateDomainRank(['UNSEEN','UNSEEN']).score,0);
 assert.equal(calculateDomainRank(['UNSEEN','UNDERSTANDING']).score,0.4);
 assert.deepEqual(calculateDomainRank([]),{rank:'Novice',score:0,discoveredCount:0,understandingPlusCount:0,applyingPlusCount:0,masteredCount:0});
});
