import test from 'node:test';
import assert from 'node:assert/strict';
import {DAILY_XP_CAP,DEFAULT_TIMEZONE,levelForXp,localDateAt} from './game-rules.ts';
test('retains existing XP cap and level formula',()=>{assert.equal(DAILY_XP_CAP,120);assert.equal(levelForXp(0),1);assert.equal(levelForXp(99),1);assert.equal(levelForXp(100),2);assert.equal(levelForXp(250),3);});
test('game dates follow the Ho Chi Minh calendar across UTC midnight',()=>{assert.equal(localDateAt(new Date('2026-09-27T17:01:00Z')),'Asia/Ho_Chi_Minh'),'2026-09-28');assert.equal(localDateAt(new Date('2026-09-27T16:59:00Z'),DEFAULT_TIMEZONE),'2026-09-27');});
