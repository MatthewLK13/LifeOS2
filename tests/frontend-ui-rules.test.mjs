import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createSkillIntelligenceDemoState} from '../src/skill-intelligence.js';
import {renderTodaySkillPage,renderCareerCampaignPage} from '../src/skill-pages.js';

const styles=fs.readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/ui.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');

test('frontend uses the V2 token architecture and neutral foundation',()=>{
  for(const token of ['--primitive-bg: #F8FAFC','--primitive-surface: #FFFFFF','--primitive-primary: #4F7DF3','--primitive-evidence: #2CB5A0','--primitive-advisor: #8B7CF6','--primitive-warning: #B7791F','--primitive-error: #C24141','--primitive-border: #E4EAF2','--color-bg: var(--primitive-bg)','--color-surface: var(--primitive-surface)','--button-primary-bg: var(--color-primary)','--radius-control: 6px','--radius-card: 10px','--motion-fast: 150ms'])assert.match(styles,new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.match(styles,/\.brand-mark\s*\{[^}]*background:\s*var\(--color-primary\)/s);
  assert.match(styles,/main\s*\{[^}]*background:\s*var\(--color-bg\)/s);
  assert.match(styles,/\.btn\.primary\s*\{/);
  assert.match(styles,/\.badge\.green\s*\{/);
  assert.match(styles,/--focus-ring:/);
  assert.match(styles,/@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(styles,/#17233d|#eee5c9|#3a3221|#16130d/i);
});

test('shared UI primitives preserve accessible icon and button semantics',()=>{
  assert.match(ui,/aria-hidden="true" focusable="false"/);
  assert.match(ui,/button type="button"/);
});

test('shell foundation includes keyboard-operable drawer semantics',()=>{
  for(const token of ['main-navigation','aria-controls','aria-expanded','close-menu','drawer-scrim','queueMicrotask','drawerReturnFocus','classList.toggle(\'open\''])assert.match(app,new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.match(app,/e\.key==='Escape'.*setDrawer\(false\)/s);
  assert.match(styles,/\.drawer-scrim:not\(\[hidden\]\)/);
  assert.match(styles,/body\.drawer-open\s*\{[^}]*overflow:\s*hidden/s);
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
