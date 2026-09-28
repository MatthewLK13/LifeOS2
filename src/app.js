import {TRACKS,trackById,STATUSES} from './data.js';
import {STORAGE_KEY,createInitialState,hydrate,activeJourney,levelFor,completeQuest,respondToChat,activateRoadmap,proposeSchedule,applyProposal,settleChat,createRoadmap} from './state.js';
import {icon,esc,btn,badge,progress} from './ui.js';
import {todayPage,knowledgePage,roadmapPage,progressPage,settingsPage} from './pages.js';
import {companionPage} from './companion.js';
import {bindGraph} from './graph.js';

let storageWarning=false,raw=null;
try{raw=localStorage.getItem(STORAGE_KEY);}catch{storageWarning=true;}
let state=hydrate(raw),busy=false,modal=null,returnFocus=null,toastTimer,disposeGraph;
const nav=[['today','book','Today'],['knowledge','tree','My Knowledge'],['roadmap','compass','Roadmap'],['companion','spark','Companion'],['progress','chart','Progress'],['settings','settings','Settings']];
let page=nav.some(([id])=>id===location.hash.slice(1))?location.hash.slice(1):'today';
let view={track:'all',search:'',filter:'all',concept:'python-0',chapter:1,view:'graph'};
const app=document.querySelector('#app');
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageWarning=true;}document.body.classList.toggle('reduced-motion',state.preferences.reducedMotion);}
function commit(next){state=next;save();}
function toast(message){const t=document.querySelector('#toast');t.innerHTML=`${icon('check')}<span>${esc(message)}</span>`;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),4200);}
function navigate(id){if(!nav.some(([n])=>n===id))return;closeModal();page=id;location.hash=id;view.view='graph';render();window.scrollTo({top:0});}
function render(){
  disposeGraph?.();disposeGraph=null;
  const j=activeJourney(state);
  document.title=`${nav.find(([id])=>id===page)[2]} · LifeOS Grimoire`;
  app.innerHTML=`<header class="topbar"><button class="icon-button mobile-menu" data-action="menu" aria-label="Toggle navigation">${icon('menu')}</button><a class="brand" href="#today"><img src="/assets/crest.png" alt=""><span><strong>LIFEOS GRIMOIRE</strong><small>Tome of Mastery · Vol. IV</small></span></a><div class="topbar-center"><span class="little-diamond">✦</span> A little wiser, every day <span class="little-diamond">✦</span></div><div class="topbar-right"><span class="demo-indicator"><i></i> INTERACTIVE DEMO</span><div class="profile-mini"><span><strong>Minh</strong><small>Level ${levelFor(state.xp)} · ${state.xp} XP</small></span><img src="/assets/minh.png" alt="Minh's profile"></div></div></header>
  <aside class="sidebar" aria-label="Main navigation"><div class="chronicle"><div class="eyebrow">CHRONICLE CYCLE ${icon('clock')}</div><h3>Chapter IV</h3><span>The Season of Discovery</span><div class="chronicle-rule"><span>✦</span></div></div><nav>${nav.map(([id,i,label])=>`<a href="#${id}" class="nav-link ${page===id?'active':''}" ${page===id?'aria-current="page"':''}>${icon(i)}<span>${label}</span>${id==='companion'?'<span class="nav-new">NEW</span>':''}</a>`).join('')}</nav><div class="sidebar-bottom"><div class="sidebar-quote">“A thousand branches.<br>One curious mind.”</div><button class="new-journey-btn" data-action="new-journey">${icon('plus')} Begin a new journey</button><div class="local-status">${icon('shield')} Your own sanctuary<span>Saved in this browser</span></div></div></aside>
  <main id="main" tabindex="-1"><div class="page-kicker"><span>LIFEOS ACADEMY <span>/</span> ${nav.find(([id])=>id===page)[2].toUpperCase()}</span><span>✧ THE GRAND ARCHIVES</span></div>${storageWarning?'<div class="notice" role="status">Browser storage is unavailable. You can keep exploring, but changes will last only for this session.</div>':''}${page==='today'?todayPage(state):page==='knowledge'?knowledgePage(state,view):page==='roadmap'?roadmapPage(state,view):page==='companion'?companionPage(state,busy):page==='progress'?progressPage(state):settingsPage(state)}<footer class="page-footer"><span>✦ LIFEOS · A GRIMOIRE OF SMALL VICTORIES</span><span>Craft your own chapter.</span></footer></main>`;
  if(page==='knowledge'||page==='roadmap')disposeGraph=bindGraph(app);
  bindForms();
  if(page==='companion'){const log=document.querySelector('#chat-transcript');log.scrollTop=log.scrollHeight;}
}
function closeModal(){const root=document.querySelector('#modal-root');root.innerHTML='';document.body.classList.remove('modal-open');modal=null;if(returnFocus?.isConnected)returnFocus.focus();}
function openModal(type,id){returnFocus=document.activeElement;modal={type,id};renderModal();}
function dialog(title,body,footer='',wide=false){return `<div class="modal-backdrop"><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><header class="modal-header"><div><div class="eyebrow">LIFEOS · THE GRAND ARCHIVES</div><h2 id="dialog-title">${esc(title)}</h2></div><button class="icon-button" data-action="close" aria-label="Close dialog">${icon('close')}</button></header><div class="modal-body">${body}</div>${footer?`<footer class="modal-footer">${footer}</footer>`:''}</section></div>`;}
function renderModal(){
  if(!modal)return;const {type,id}=modal;let html='';
  if(type==='quest'){
    const q=state.quests.find(q=>q.id===id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===id);if(!q){closeModal();return;}
    const preview=view.examplePlan?.id===q.journeyId;
    html=dialog(q.title,`<div class="meta">${badge(q.type,'red')}${badge(`Rank ${q.difficulty}`,'gold')}<span>${icon('clock')}${q.minutes} min</span><b class="xp-text">+${q.xp} XP</b>${badge(q.status==='completed'?'Completed':q.status==='in-progress'?'In progress':'Ready to explore',q.status==='completed'?'green':'')}</div><p class="quest-intro">${esc(q.description)}</p><div class="quest-objective"><div class="eyebrow">YOUR SMALL ADVENTURE</div><p>${esc(q.prompt)}</p></div><h3>Field notes & steps</h3><div class="checklist">${q.steps.map((step,i)=>`<label><input type="checkbox" data-check="${i}" ${q.checks.includes(i)?'checked':''} ${q.status==='completed'||preview?'disabled':''}><span>${esc(step)}</span></label>`).join('')}</div><label class="input-label" for="quest-notes">Your observation <span>${preview?'Preview only':'Optional · saved locally'}</span></label><textarea id="quest-notes" ${preview?'disabled':''} rows="3" placeholder="What did you notice? What would you like to explore next?" maxlength="2000">${esc(q.notes)}</textarea><a class="resource-link" href="${esc(q.resource)}" target="_blank" rel="noopener noreferrer">${icon('book')} Open learning resource ${icon('external')}</a><p class="small-copy">You decide when the activity is complete. Your checklist is a guide, not a test. Activity XP does not change your knowledge rank.</p>`,`${btn('Back to my grimoire','close')}${view.examplePlan?.id===q.journeyId?badge('Preview · Start the roadmap to record activities','gold'):q.status==='completed'?badge('Recorded in your chronicle','green'):q.status==='active'?btn('Start quest','begin-quest',{id,primary:true,icon:'arrow'}):btn('I have completed this activity','complete-quest',{id,primary:true,icon:'check'})}`,true);
  }else if(type==='evidence'){
    const c=state.concepts.find(c=>c.id===id);
    html=dialog(`${c.name} · Evidence`,`${badge(STATUSES[c.status].label,'gold')}<p>${esc(c.scope)}</p><div class="notice">These are labeled sample conversations. They are not observations about you.</div>${c.evidence.length?c.evidence.map(e=>`<blockquote class="evidence"><div class="eyebrow">MINH · ${esc(e.date)}</div><p>“${esc(e.text)}”</p><footer>${esc(e.reason)}</footer></blockquote>`).join(''):'<div class="empty-state"><h3>No conversation evidence</h3><p>You can still explore and learn this topic.</p></div>'}<p class="small-copy">Self-reports and inferred observations remain separate. Removing this fixture will mark the concept as not yet observed.</p>`,`${btn('Mark as self-reported','self-report',{id,icon:'pen'})}${c.evidence.length?btn('Exclude this evidence','exclude-evidence',{id,icon:'trash'}):''}${btn('Close','close')}`);
  }else if(type==='schedule'){
    const j=activeJourney(state);
    html=dialog('Find your daily rhythm',`<p>Your current plan reserves <strong>${j.minutes} minutes a day</strong>. Choose a pace that fits your life.</p><form id="schedule-form"><label class="input-label" for="daily-minutes">Daily learning time</label><select id="daily-minutes" name="minutes">${[15,30,45,60,90,120].map(m=>`<option value="${m}" ${j.minutes===m?'selected':''}>${m} minutes a day</option>`).join('')}</select><p class="small-copy">The next screen shows the impact. Changes take effect only after you apply them.</p><button class="btn primary" type="submit">${icon('search')} Preview changes</button></form>`);
  }else if(type==='proposal'){
    const p=state.proposal;if(!p){closeModal();return;}
    html=dialog('A new pace, the same ambition',`<div class="eyebrow red-text">PACING PROPOSAL · WAITING FOR YOUR SEAL</div><div class="comparison"><div><small>CURRENT PLAN</small><strong>${p.previous}<span>min / day</span></strong></div>${icon('arrow')}<div><small>PROPOSED PLAN</small><strong>${p.minutes}<span>min / day</span></strong></div></div><div class="impact-list"><p>${icon('clock')} Estimated journey length: <b>${p.days} study days</b></p><p>${icon('shield')} Completed work and XP stay in your chronicle.</p><p>${icon('book')} Your in-progress activity is kept as it is.</p><p>${icon('compass')} Today will show activities within the new daily budget.</p></div><p class="small-copy">An estimate from the demo template, not a guaranteed completion date.</p>`,`${btn('Keep current plan','discard-proposal')}${btn('Apply changes','apply-proposal',{primary:true,icon:'check'})}`);
  }else if(type==='preview-draft'){
    const p=state.draft;if(!p){closeModal();return;}
    html=dialog(p.title,`<div class="meta">${badge(trackById(p.trackId).name,'gold')}<span>${p.minutes} min/day</span><span>${p.days} estimated study days</span></div>${p.chapters.map((c,i)=>`<section class="preview-chapter"><div class="eyebrow">CHAPTER ${i+1}</div><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p><ul>${c.quests.map(q=>`<li>${esc(q.title)} <small>· ${q.minutes} min · +${q.xp} XP</small></li>`).join('')}</ul></section>`).join('')}`,`${btn('Keep exploring','close')}${btn('Start this journey','activate',{primary:true,icon:'flag'})}`,true);
  }else if(type==='finish-journey'){
    const j=activeJourney(state),qs=state.quests.filter(q=>q.journeyId===j.id),done=qs.filter(q=>q.status==='completed').length;
    html=dialog('Every ending is a new beginning',`<span class="large-seal">${icon('flag')}</span><h3>${esc(j.title)}</h3><p>You have completed <strong>${done} of ${qs.length} activities</strong>. ${done<qs.length?'You can keep learning or decide that this journey has served its purpose.':'Take a moment to look back at what you have explored.'}</p><p>Your XP and knowledge remain in your grimoire. Completing a journey does not automatically change your personal rank.</p>`,`${btn('Keep learning','close')}${btn('Confirm journey complete','confirm-finish',{primary:true,icon:'check'})}`);
  }else if(type==='reset'){
    html=dialog('Open a fresh grimoire?',`<p>This restores the original Minh profile and sample RAG journey. Your added journeys, notes, conversations, and demo progress in this browser will be removed.</p><p>You will be ready to give the same presentation again.</p>`,`${btn('Keep my progress','close')}${btn('Reset demo','confirm-reset',{primary:true,icon:'reset'})}`);
  }else if(type==='new-journey'){
    html=dialog('Where will curiosity take you?',`<p>Choose an art to explore. Arcana will ask about your starting point and daily rhythm, then prepare your roadmap.</p><div class="journey-options">${TRACKS.map(t=>`<button data-action="start-track" data-id="${t.id}" style="--domain-color:${t.color}"><span>${icon(t.icon)}</span><div><strong>${esc(t.name)}</strong><small>${esc(t.goal)}</small></div>${icon('arrow')}</button>`).join('')}</div><p class="small-copy">${TRACKS.length} detailed demo templates · Up to three active journeys.</p>`);
  }
  document.querySelector('#modal-root').innerHTML=html;document.body.classList.add('modal-open');bindModalForms();document.querySelector('.modal')?.focus();
}
async function sendChat(text){
  if(busy||!text.trim())return;busy=true;
  const original=structuredClone(state),next=respondToChat(state,text);
  // Show the user's message immediately; keep generated drafts hidden until the reply arrives.
  state={...state,messages:[...state.messages,{role:'user',text:text.trim().slice(0,1600)}]};render();
  await new Promise(r=>setTimeout(r,600));
  commit(settleChat(state,original,next));
  busy=false;render();document.querySelector('#chat-input')?.focus();
}
function startTrack(id){if(busy)return;closeModal();state.builder={stage:'goal'};state.draft=null;save();navigate('companion');sendChat(trackById(id).goal);}
const actions={
 navigate: id=>navigate(id),menu:()=>document.querySelector('.sidebar').classList.toggle('open'),
 quest:id=>openModal('quest',id),close:closeModal,
 'new-journey':()=>openModal('new-journey'), 'start-track':startTrack,
 'knowledge-track':id=>{view.track=id;view.concept=state.concepts.find(c=>c.trackId===id).id;view.search='';view.filter='all';navigate('knowledge');},
 'begin-quest':id=>{const q=state.quests.find(q=>q.id===id);q.status='in-progress';save();render();renderModal();toast('Your next chapter has begun.');},
 'complete-quest':id=>{const old=state.xp;commit(completeQuest(state,id));closeModal();render();toast(`Quest complete. +${state.xp-old} XP added to your chronicle.`);},
 branch:id=>{view.conceptPage=0;view.track=id;view.search='';view.filter='all';view.concept=state.concepts.find(c=>id==='all'||c.trackId===id).id;render();},
 concept:id=>{view.concept=id;render();if(innerWidth<1050)openModal('evidence',id);},
 'concept-page':id=>{view.conceptPage=Number(id);render();},
 chapter:id=>{view.chapter=Number(id);render();},
 view:id=>{view.view=id;render();},
 evidence:id=>openModal('evidence',id),
 'self-report':id=>{state.concepts.find(c=>c.id===id).status='self';save();closeModal();render();toast('Self-report updated. Your domain rank is unchanged.');},
 'exclude-evidence':id=>{const c=state.concepts.find(c=>c.id===id);c.evidence=[];c.status='unobserved';save();closeModal();render();toast('Sample evidence excluded.');},
 schedule:()=>openModal('schedule'),proposal:()=>openModal('proposal'),
 'apply-proposal':()=>{commit(applyProposal(state));closeModal();render();toast('Your new pace is applied. Previous work is preserved.');},
 'discard-proposal':()=>{state.proposal=null;save();closeModal();render();toast('Your current plan is unchanged.');},
 rest:()=>{state.restDay=!state.restDay;save();render();},
 prompt:text=>sendChat(text),
 'restart-chat':()=>{if(busy)return;closeModal();navigate('companion');sendChat('Start over');},
 'preview-draft':()=>openModal('preview-draft'),
 activate:()=>{if(!state.draft)return;commit(activateRoadmap(state,state.draft));view.examplePlan=null;view.chapter=0;closeModal();navigate('roadmap');toast('A new journey begins. Your roadmap is now active.');},
 'start-example':()=>{commit(activateRoadmap(state,view.examplePlan));view.examplePlan=null;view.chapter=0;render();toast('Your detailed roadmap is now active.');},
 'finish-journey':()=>openModal('finish-journey'),
 'confirm-finish':()=>{activeJourney(state).status='completed';save();closeModal();render();toast('Journey completed. Your next adventure is yours to choose.');},
 'delete-memory':id=>{state.memories=state.memories.filter(m=>m.id!==id);save();render();toast('Memory removed from this browser.');},
 reset:()=>openModal('reset'),
 'confirm-reset':()=>{if(busy)return;commit(createInitialState());view={track:'all',search:'',filter:'all',concept:'python-0',chapter:1,view:'graph'};closeModal();navigate('today');toast('Your demo is ready for a fresh adventure.');}
};
document.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target&&!target.disabled){try{actions[target.dataset.action]?.(target.dataset.id);}catch(err){toast(err.message);}}else if(e.target.classList.contains('modal-backdrop'))closeModal();});
document.addEventListener('keydown',e=>{
  if(!modal)return;if(e.key==='Escape'){closeModal();return;}
  if(e.key==='Tab'){const dialog=document.querySelector('.modal'),controls=[...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select,textarea')];if(!controls.length)return;const first=controls[0],last=controls.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===dialog)){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===dialog)){e.preventDefault();first.focus();}}
});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(nav.some(([n])=>n===id)&&id!==page){page=id;closeModal();render();window.scrollTo(0,0);}});
function bindForms(){
  const search=document.querySelector('#concept-search');if(search)search.oninput=e=>{const pos=e.target.selectionStart;view.conceptPage=0;view.search=e.target.value;render();const el=document.querySelector('#concept-search');el.focus();try{el.setSelectionRange(pos,pos);}catch{}};
  const filter=document.querySelector('#status-filter');if(filter)filter.onchange=e=>{view.conceptPage=0;view.filter=e.target.value;render();};
  const select=document.querySelector('#journey-select');if(select)select.onchange=e=>{state.activeId=e.target.value;view.examplePlan=null;view.chapter=0;save();render();};
  const template=document.querySelector('#roadmap-template-select');if(template)template.onchange=e=>{view.examplePlan=e.target.value?createRoadmap({trackId:e.target.value,minutes:30}):null;view.chapter=0;render();};
  const chat=document.querySelector('#chat-form');if(chat)chat.onsubmit=e=>{e.preventDefault();sendChat(new FormData(chat).get('message'));};
  const input=document.querySelector('#chat-input');if(input)input.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();chat.requestSubmit();}};
  document.querySelectorAll('[data-pref]').forEach(el=>el.onchange=()=>{state.preferences[el.dataset.pref]=el.checked;save();toast('Preference saved.');});
  const memory=document.querySelector('#memory-form');if(memory)memory.onsubmit=e=>{e.preventDefault();const text=new FormData(memory).get('memory').trim();if(!text)return;state.memories.push({id:crypto.randomUUID(),text:text.slice(0,240),source:'Added by you · this session'});save();render();toast('A note added to your memory core.');};
}
function bindModalForms(){
  document.querySelectorAll('[data-check]').forEach(el=>el.onchange=()=>{const q=state.quests.find(q=>q.id===modal.id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===modal.id),i=Number(el.dataset.check);q.checks=el.checked?[...new Set([...q.checks,i])]:q.checks.filter(x=>x!==i);save();});
  const notes=document.querySelector('#quest-notes');if(notes)notes.oninput=()=>{(state.quests.find(q=>q.id===modal.id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===modal.id)).notes=notes.value;save();};
  const schedule=document.querySelector('#schedule-form');if(schedule)schedule.onsubmit=e=>{e.preventDefault();commit(proposeSchedule(state,Number(new FormData(schedule).get('minutes'))));modal={type:'proposal'};renderModal();};
}
save();render();
