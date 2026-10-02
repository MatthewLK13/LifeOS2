import test from 'node:test';
import assert from 'node:assert/strict';
import {createSkillIntelligenceDemoState} from '../src/skill-intelligence.js';
import {renderTodaySkillPage,renderSkillKnowledgePage,renderCareerCampaignPage,renderLearningHubPage} from '../src/skill-pages.js';

test('primary V2 pages contain no legacy fantasy vocabulary',()=>{
 const state=createSkillIntelligenceDemoState();
 const html=[renderTodaySkillPage(state),renderSkillKnowledgePage(state),renderCareerCampaignPage(state),renderLearningHubPage(state)].join('\n');
 assert.doesNotMatch(html,/\b(?:arcana|grimoire|academy|tome|scribe|mana|chronicle|sanctuary|grand archives|codex)\b/i);
});

test('primary V2 page set is exactly Today, Knowledge, Campaign and Learning Hub',()=>{
 const primary=['Today','My Knowledge','Career Campaign','Learning Hub'];
 assert.deepEqual(primary,['Today','My Knowledge','Career Campaign','Learning Hub']);
 assert.doesNotMatch(primary.join(' '),/Companion|Progress|Rank|Settings/);
});
