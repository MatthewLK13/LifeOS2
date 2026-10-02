import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createSkillIntelligenceDemoState} from '../src/skill-intelligence.js';
import {renderTodaySkillPage,renderCareerCampaignPage} from '../src/skill-pages.js';

const styles=fs.readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');

test('frontend uses the shared UI rule tokens and neutral foundation overrides',()=>{
  for(const token of ['--space-1:4px','--space-4:16px','--space-6:32px','--radius-sm:4px','--radius-md:6px','--radius-lg:10px','--text-page:32px','--control-lg:40px','--motion-fast:100ms'])assert.match(styles,new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.match(styles,/\.brand-mark\{background:var\(--primary\)\}/);
  assert.match(styles,/main\{background:var\(--bg\);background-image:none/);
});

test('primary V2 pages expose one clear primary action and readable status text',()=>{
  const state=createSkillIntelligenceDemoState();
  const today=renderTodaySkillPage(state,{demoPreview:true});
  const campaign=renderCareerCampaignPage(state);
  assert.match(today,/class="btn primary"/);
  assert.match(today,/data-action="planner-open"/);
  assert.match(campaign,/class="campaign-quest-list paper"/);
  assert.match(campaign,/data-action="advisor-open"/);
  assert.match(campaign,/QUEST NODES/);
});
