import {TRACKS,trackById,STATUSES} from './data.js';
import {STORAGE_KEY,createInitialState,hydrate,activeJourney,levelFor,completeQuest,respondToChat,activateRoadmap,proposeSchedule,applyProposal,settleChat,createRoadmap} from './state.js';
import {icon,esc,btn,badge,progress} from './ui.js';
import {todayPage,knowledgePage,roadmapPage,progressPage,settingsPage} from './pages.js';
import {companionPage} from './companion.js';
import {bindGraph} from './graph.js';
import {restorePlayer,enterDemo,getState,createJourneyProposal,generateJourney,generateAIJourney,acceptProposal,rejectProposal,finishJourney,startQuest,completeQuest as completeQuestApi,updateQuestStep,updateQuestNote,streamCompanion,confirmMemory,dismissMemory,createAssessment,submitAssessment,startNewConversation,unlockInventoryItem,equipInventoryItem,getVapidPublicKey,savePushSubscription,deletePushSubscription} from './api-client.js';
import {loadPlayerState} from './bootstrap.js';
import {toViewState} from './server-state.js';

let storageWarning=false,raw=null;
try{raw=localStorage.getItem(STORAGE_KEY);}catch{storageWarning=true;}
let state=hydrate(raw),mode='offline',identity=null,oneTimePlayerCode=null,bootstrapError=null,busy=false,modal=null,returnFocus=null,toastTimer,disposeGraph,chatAbort=null,retryMessage='',aiRoadmapFlow=null;
const nav=[['today','book','Today'],['knowledge','tree','My Knowledge'],['roadmap','compass','Roadmap'],['companion','spark','Companion'],['progress','chart','Progress'],['settings','settings','Settings']];
let page=nav.some(([id])=>id===location.hash.slice(1))?location.hash.slice(1):'today';
let view={track:'all',search:'',filter:'all',concept:'python-0',chapter:1,view:'graph'};
const app=document.querySelector('#app');
function save(){if(mode==='offline'){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageWarning=true;}}document.body.classList.toggle('reduced-motion',state.preferences.reducedMotion);}
function commit(next){state=next;save();}
function toast(message){const t=document.querySelector('#toast');t.innerHTML=`${icon('check')}<span>${esc(message)}</span>`;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),4200);}
async function refreshServerState(){state=toViewState(await getState());render();}
async function serverMutation(request,{message,keepModal=false}={}){
 if(busy)return false;busy=true;
 try{await request();await refreshServerState();if(keepModal)renderModal();if(message)toast(message);return true;}
 catch(error){if(keepModal)renderModal();toast(error.message||'The change could not be saved. Your account state is unchanged.');return false;}
 finally{busy=false;}
}
async function createRoadmapOnServer(plan){
 if(busy)return;busy=true;
 try{if(plan.aiProposalId)await acceptProposal(plan.aiProposalId);else{const created=await generateJourney({templateKey:plan.trackId,experienceLevel:plan.experience,minutesPerDay:plan.minutes,title:plan.title,goal:plan.goal});await acceptProposal(created.proposal.id);}await refreshServerState();state.draft=null;view.examplePlan=null;view.chapter=0;closeModal();navigate('roadmap');toast('A new journey begins. Your roadmap is now active.');}
 catch(error){toast(error.message||'The roadmap could not be saved.');}
 finally{busy=false;}
}
async function previewPacingOnServer(journey,minutes){
 if(busy)return;busy=true;
 try{const {proposal}=await createJourneyProposal(journey.id,{type:'PACING',minutesPerDay:minutes}),preview=proposal.preview;state.proposal={serverProposalId:proposal.id,previous:preview.previousMinutesPerDay,minutes:preview.minutesPerDay,days:Math.ceil(journey.days*journey.minutes/preview.minutesPerDay)};modal={type:'proposal'};renderModal();}
 catch(error){toast(error.message||'The schedule could not be previewed.');}
 finally{busy=false;}
}
function vapidBytes(value){const base64=value.replace(/-/g,'+').replace(/_/g,'/'),padded=base64+'='.repeat((4-base64.length%4)%4),raw=atob(padded);return Uint8Array.from(raw,char=>char.charCodeAt(0));}
async function enablePush(){
 if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window)){toast('Push reminders are not supported in this browser.');return;}
 if(Notification.permission==='denied'){toast('Notifications are blocked in your browser settings. You can keep using LifeOS normally.');return;}
 if(Notification.permission!=='granted'&&await Notification.requestPermission()!=='granted'){toast('Reminder permission was not granted. LifeOS will continue working normally.');return;}
 try{const registration=await navigator.serviceWorker.register('/service-worker.js'),{publicKey}=await getVapidPublicKey(),subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:vapidBytes(publicKey)});await savePushSubscription(subscription.toJSON());await refreshServerState();toast('Daily reminders are enabled.');}catch(error){toast(error.message||'Push reminders could not be enabled.');}
}
async function disablePush(){try{const registration=await navigator.serviceWorker.getRegistration('/'),subscription=await registration?.pushManager.getSubscription();if(subscription){await deletePushSubscription(subscription.endpoint);await subscription.unsubscribe();}await refreshServerState();toast('Daily reminders are disabled.');}catch(error){toast(error.message||'The reminder could not be disabled.');}}
function navigate(id){if(!nav.some(([n])=>n===id))return;if(id!=='companion'&&page==='companion'&&chatAbort)chatAbort.abort();closeModal();page=id;location.hash=id;view.view='graph';render();window.scrollTo({top:0});}
function render(){
  disposeGraph?.();disposeGraph=null;
  const j=activeJourney(state);
  document.title=`${nav.find(([id])=>id===page)[2]} · LifeOS Grimoire`;
  const displayName=state.profile?.displayName||'Minh';
  app.innerHTML=`<header class="topbar"><button class="icon-button mobile-menu" data-action="menu" aria-label="Toggle navigation">${icon('menu')}</button><a class="brand" href="#today"><img src="/assets/crest.png" alt=""><span><strong>LIFEOS GRIMOIRE</strong><small>Tome of Mastery · Vol. IV</small></span></a><div class="topbar-center"><span class="little-diamond">✦</span> A little wiser, every day <span class="little-diamond">✦</span></div><div class="topbar-right"><span class="demo-indicator"><i></i> ${mode==='server'?'ACCOUNT SAVED':'OFFLINE DEMO'}</span><div class="profile-mini"><span><strong>${esc(displayName)}</strong><small>Level ${levelFor(state.xp)} · ${state.xp} XP</small></span><img src="/assets/minh.png" alt="${esc(displayName)}'s profile"></div></div></header>
  <aside class="sidebar" aria-label="Main navigation"><div class="chronicle"><div class="eyebrow">CHRONICLE CYCLE ${icon('clock')}</div><h3>Chapter IV</h3><span>The Season of Discovery</span><div class="chronicle-rule"><span>✦</span></div></div><nav>${nav.map(([id,i,label])=>`<a href="#${id}" class="nav-link ${page===id?'active':''}" ${page===id?'aria-current="page"':''}>${icon(i)}<span>${label}</span>${id==='companion'?'<span class="nav-new">NEW</span>':''}</a>`).join('')}</nav><div class="sidebar-bottom"><div class="sidebar-quote">“A thousand branches.<br>One curious mind.”</div><button class="new-journey-btn" data-action="new-journey">${icon('plus')} Begin a new journey</button><div class="local-status">${icon('shield')} ${mode==='server'?'Connected account':'Offline demo'}<span>${mode==='server'?'Progress saved to your account':'Saved in this browser'}</span></div><button class="text-button" data-action="identity">${mode==='server'?'Switch account':'Restore / enter account'}</button></div></aside>
  <main id="main" tabindex="-1"><div class="page-kicker"><span>LIFEOS ACADEMY <span>/</span> ${nav.find(([id])=>id===page)[2].toUpperCase()}</span><span>✧ THE GRAND ARCHIVES</span></div>${storageWarning&&mode==='offline'?'<div class="notice" role="status">Browser storage is unavailable. You can keep exploring, but changes will last only for this session.</div>':''}${mode==='offline'&&bootstrapError?'<div class="notice" role="status">The account service is unavailable. You are viewing the offline demo saved in this browser.</div>':''}${page==='today'?todayPage(state):page==='knowledge'?knowledgePage(state,view):page==='roadmap'?roadmapPage(state,view):page==='companion'?companionPage(state,busy,retryMessage,mode==='server',aiRoadmapFlow):page==='progress'?progressPage(state):settingsPage(state)}<footer class="page-footer"><span>✦ LIFEOS · A GRIMOIRE OF SMALL VICTORIES</span><span>Craft your own chapter.</span></footer></main>`;
  if(page==='knowledge'||page==='roadmap')disposeGraph=bindGraph(app);
  bindForms();
  if(page==='companion'){const log=document.querySelector('#chat-transcript');log.scrollTop=log.scrollHeight;}
}
function closeModal(){const root=document.querySelector('#modal-root');root.innerHTML='';document.body.classList.remove('modal-open');modal=null;if(returnFocus?.isConnected)returnFocus.focus();}
function openModal(type,id){returnFocus=document.activeElement;modal={type,id};renderModal();}
function dialog(title,body,footer='',wide=false){return `<div class="modal-backdrop"><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><header class="modal-header"><div><div class="eyebrow">LIFEOS · THE GRAND ARCHIVES</div><h2 id="dialog-title">${esc(title)}</h2></div><button class="icon-button" data-action="close" aria-label="Close dialog">${icon('close')}</button></header><div class="modal-body">${body}</div>${footer?`<footer class="modal-footer">${footer}</footer>`:''}</section></div>`;}
async function switchToServer(action,code=''){
 if(busy)return;busy=true;
 try{
  if(action==='restore')await restorePlayer(code);
  else if(action==='demo')await enterDemo();
  const result=await loadPlayerState({offlineState:state});
  if(result.mode!=='server')throw result.error||new Error('The account service is unavailable.');
  mode='server';identity=result.identity;state=result.state;bootstrapError=null;closeModal();render();toast(`Welcome, ${identity.player.displayName}. Your progress is connected.`);
  if(result.playerCode){oneTimePlayerCode=result.playerCode;openModal('player-code');}
 }catch(error){toast(error.message||'The account could not be opened.');}
 finally{busy=false;}
}
function renderModal(){
  if(!modal)return;const {type,id}=modal;let html='';
  if(type==='quest'){
    const q=state.quests.find(q=>q.id===id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===id);if(!q){closeModal();return;}
    const preview=view.examplePlan?.id===q.journeyId;
    html=dialog(q.title,`<div class="meta">${badge(q.type,'red')}${badge(`Rank ${q.difficulty}`,'gold')}<span>${icon('clock')}${q.minutes} min</span><b class="xp-text">+${q.xp} XP</b>${badge(q.status==='completed'?'Completed':q.status==='in-progress'?'In progress':'Ready to explore',q.status==='completed'?'green':'')}</div><p class="quest-intro">${esc(q.description)}</p><div class="quest-objective"><div class="eyebrow">YOUR SMALL ADVENTURE</div><p>${esc(q.prompt)}</p></div><h3>Field notes & steps</h3><div class="checklist">${q.steps.map((step,i)=>`<label><input type="checkbox" data-check="${i}" ${q.checks.includes(i)?'checked':''} ${q.status==='completed'||preview?'disabled':''}><span>${esc(step)}</span></label>`).join('')}</div><label class="input-label" for="quest-notes">Your observation <span>${preview?'Preview only':mode==='server'?'Optional · saved to your account':'Optional · saved locally'}</span></label><textarea id="quest-notes" ${preview?'disabled':''} rows="3" placeholder="What did you notice? What would you like to explore next?" maxlength="2000">${esc(q.notes)}</textarea><a class="resource-link" href="${esc(q.resource)}" target="_blank" rel="noopener noreferrer">${icon('book')} Open learning resource ${icon('external')}</a><p class="small-copy">You decide when the activity is complete. Your checklist is a guide, not a test. Activity XP does not change your knowledge rank.</p>`,`${btn('Back to my grimoire','close')}${view.examplePlan?.id===q.journeyId?badge('Preview · Start the roadmap to record activities','gold'):q.status==='completed'?badge('Recorded in your chronicle','green'):q.status==='active'?btn('Start quest','begin-quest',{id,primary:true,icon:'arrow'}):`${q.type==='Assessment'&&mode==='server'?btn('Try an optional assessment','start-assessment',{id,icon:'spark'}):''}${btn('I have completed this activity','complete-quest',{id,primary:true,icon:'check'})}`}`,true);
  }else if(type==='assessment'){
    const q=state.quests.find(item=>item.id===id),current=modal.assessment,result=modal.result;
    const resultView=result?`<div class="notice">${badge(result.verdict,result.verdict==='STRONG'?'green':'gold')}<p>${esc(result.feedback)}</p>${result.correctCount!==undefined?`<p>${result.correctCount} of ${result.totalCount} answers correct.</p>`:''}${result.misconceptions?.length?`<h3>Points to revisit</h3><ul>${result.misconceptions.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}</div>`:'';
    let form='';
    if(current){
      if(current.subtype==='QUIZ'){
        const questions=current.content.questions.map((item,index)=>`<fieldset class="assessment-question"><legend>${index+1}. ${esc(item.question)}</legend>${item.choices.map((choice,choiceIndex)=>`<label><input type="radio" name="answer-${index}" value="${choiceIndex}" required> ${esc(choice)}</label>`).join('')}</fieldset>`).join('');
        form=`<form id="assessment-answer-form">${questions}<input type="hidden" name="question-count" value="${current.content.questions.length}"><button class="btn primary" type="submit">Submit answers ${icon('check')}</button></form>`;
      }else{
        const answerLabel=current.subtype==='CODE_REVIEW'?'Code to review':'Your written answer';
        form=`<form id="assessment-answer-form"><label class="input-label" for="assessment-answer">${answerLabel} <span>Up to 200 KB</span></label><textarea id="assessment-answer" name="answer" rows="9" required maxlength="204800" placeholder="Write your response here…"></textarea><p class="small-copy">Your pasted response is reviewed as text. Code is never run.</p><button class="btn primary" type="submit">Request feedback ${icon('spark')}</button></form>`;
      }
    }
    const chooser=current?'':`<p>Choose an optional check for ${esc(q?.topic||q?.title||'this topic')}. You can also finish this quest manually at any time.</p><div class="journey-options"><button data-action="create-assessment" data-id="QUIZ"><div><strong>Quick quiz</strong><small>Multiple choice, graded from its answer key</small></div>${icon('arrow')}</button><button data-action="create-assessment" data-id="WRITTEN"><div><strong>Written explanation</strong><small>Get feedback on your understanding</small></div>${icon('arrow')}</button><button data-action="create-assessment" data-id="CODE_REVIEW"><div><strong>Code review</strong><small>Discuss code as text; nothing is executed</small></div>${icon('arrow')}</button></div>`;
    html=dialog(current?.title||'An optional knowledge check',`${resultView}${chooser}${form}`,`${btn('Back to quest','quest',{id})}${result?btn('Done','close',{primary:true}):''}`,true);
  }else if(type==='evidence'){
    const c=state.concepts.find(c=>c.id===id);
    html=c.serverBacked?dialog(`${c.name} · Knowledge`,`${badge(STATUSES[c.status].label,'gold')}<p>${esc(c.scope)}</p><div class="notice">This account stores structured knowledge signals. Private conversation evidence is not exposed in this view.</div><p class="small-copy">This level changes only when a supported learning activity records a knowledge signal.</p>`,btn('Close','close')):dialog(`${c.name} · Evidence`,`${badge(STATUSES[c.status].label,'gold')}<p>${esc(c.scope)}</p><div class="notice">These are labeled sample conversations. They are not observations about you.</div>${c.evidence.length?c.evidence.map(e=>`<blockquote class="evidence"><div class="eyebrow">MINH · ${esc(e.date)}</div><p>“${esc(e.text)}”</p><footer>${esc(e.reason)}</footer></blockquote>`).join(''):'<div class="empty-state"><h3>No conversation evidence</h3><p>You can still explore and learn this topic.</p></div>'}<p class="small-copy">Self-reports and inferred observations remain separate. Removing this fixture will mark the concept as not yet observed.</p>`,`${btn('Mark as self-reported','self-report',{id,icon:'pen'})}${c.evidence.length?btn('Exclude this evidence','exclude-evidence',{id,icon:'trash'}):''}${btn('Close','close')}`);
  }else if(type==='schedule'){
    const j=activeJourney(state);
    html=dialog('Find your daily rhythm',`<p>Your current plan reserves <strong>${j.minutes} minutes a day</strong>. Choose a pace that fits your life.</p><form id="schedule-form"><label class="input-label" for="daily-minutes">Daily learning time</label><select id="daily-minutes" name="minutes">${[15,30,45,60,90,120].map(m=>`<option value="${m}" ${j.minutes===m?'selected':''}>${m} minutes a day</option>`).join('')}</select><p class="small-copy">The next screen shows the impact. Changes take effect only after you apply them.</p><button class="btn primary" type="submit">${icon('search')} Preview changes</button></form>`);
  }else if(type==='proposal'){
    const p=state.proposal;if(!p){closeModal();return;}
    html=dialog('A new pace, the same ambition',`<div class="eyebrow red-text">PACING PROPOSAL · WAITING FOR YOUR SEAL</div><div class="comparison"><div><small>CURRENT PLAN</small><strong>${p.previous}<span>min / day</span></strong></div>${icon('arrow')}<div><small>PROPOSED PLAN</small><strong>${p.minutes}<span>min / day</span></strong></div></div><div class="impact-list"><p>${icon('clock')} Estimated journey length: <b>${p.days} study days</b></p><p>${icon('shield')} Completed work and XP stay in your chronicle.</p><p>${icon('book')} Your in-progress activity is kept as it is.</p><p>${icon('compass')} Today will show activities within the new daily budget.</p></div><p class="small-copy">An estimate from the demo template, not a guaranteed completion date.</p>`,`${btn('Keep current plan','discard-proposal')}${btn('Apply changes','apply-proposal',{primary:true,icon:'check'})}`);
  }else if(type==='preview-draft'){
    const p=state.draft;if(!p){closeModal();return;}
    html=dialog(p.title,`<div class="meta">${badge(p.trackName||trackById(p.trackId)?.name||p.trackId,'gold')}<span>${p.minutes} min/day</span><span>${p.days} estimated study days</span></div>${p.chapters.map((c,i)=>`<section class="preview-chapter"><div class="eyebrow">CHAPTER ${i+1}</div><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p><ul>${c.quests.map(q=>`<li>${esc(q.title)} <small>· ${q.minutes} min · +${q.xp} XP</small></li>`).join('')}</ul></section>`).join('')}`,`${btn('Keep exploring','close')}${p.aiProposalId?btn('Reject roadmap','reject-roadmap'):''}${btn('Start this journey','activate',{primary:true,icon:'flag'})}`,true);
  }else if(type==='finish-journey'){
    const j=activeJourney(state),qs=state.quests.filter(q=>q.journeyId===j.id),done=qs.filter(q=>q.status==='completed').length;
    html=dialog('Every ending is a new beginning',`<span class="large-seal">${icon('flag')}</span><h3>${esc(j.title)}</h3><p>You have completed <strong>${done} of ${qs.length} activities</strong>. ${done<qs.length?'You can keep learning or decide that this journey has served its purpose.':'Take a moment to look back at what you have explored.'}</p><p>Your XP and knowledge remain in your grimoire. Completing a journey does not automatically change your personal rank.</p>`,`${btn('Keep learning','close')}${btn('Confirm journey complete','confirm-finish',{primary:true,icon:'check'})}`);
  }else if(type==='reset'){
    html=dialog('Open a fresh grimoire?',`<p>This restores the original Minh profile and sample RAG journey. Your added journeys, notes, conversations, and demo progress in this browser will be removed.</p><p>You will be ready to give the same presentation again.</p>`,`${btn('Keep my progress','close')}${btn('Reset demo','confirm-reset',{primary:true,icon:'reset'})}`);
  }else if(type==='new-journey'){
    html=dialog('Where will curiosity take you?',`<p>Choose an art to explore. Arcana will ask about your starting point and daily rhythm, then prepare your roadmap.</p><div class="journey-options">${TRACKS.map(t=>`<button data-action="start-track" data-id="${t.id}" style="--domain-color:${t.color}"><span>${icon(t.icon)}</span><div><strong>${esc(t.name)}</strong><small>${esc(t.goal)}</small></div>${icon('arrow')}</button>`).join('')}</div><p class="small-copy">${TRACKS.length} detailed curriculum templates · ${mode==='server'?'You can keep multiple active journeys.':'Up to three active demo journeys.'}</p>`);
  }else if(type==='identity'){
    html=dialog('Your learning account',`<p>Restore a saved grimoire with its Player Code, or enter the seeded Minh demo account.</p><form id="restore-player-form"><label class="input-label" for="player-code">Player Code</label><input id="player-code" name="code" autocomplete="off" autocapitalize="characters" minlength="10" maxlength="32" placeholder="ABCD-EFGH-JK" required><button class="btn primary" type="submit">${icon('shield')} Restore my progress</button></form><div class="thin-rule"></div><button class="btn" data-action="enter-demo">Enter demo as Minh</button><p class="small-copy">If the account server is offline, your browser demo remains available.</p>`,btn('Close','close'));
  }else if(type==='player-code'){
    html=dialog('Keep your Player Code safe',`<p>This is the only time your recovery code will be shown. Save it somewhere private so you can restore this grimoire on another browser.</p><div class="recovery-code" aria-label="Your Player Code">${esc(oneTimePlayerCode||'')}</div><p class="small-copy">Anyone with this code can access the account. The server stores only a secure digest.</p>`,`${btn('Copy code','copy-player-code')}${btn('I saved it','close',{primary:true,icon:'check'})}`);
  }
  document.querySelector('#modal-root').innerHTML=html;document.body.classList.add('modal-open');bindModalForms();document.querySelector('.modal')?.focus();
}
async function sendChat(text){
  if(busy||!text.trim())return;
  if(mode==='server'&&aiRoadmapFlow){await answerAiRoadmapQuestion(text.trim());return;}
  if(mode==='server'&&isRoadmapRequest(text.trim())){beginAiRoadmapFlow(text.trim());return;}
  busy=true;
  if(mode==='server'){
    const message=text.trim().slice(0,1600);retryMessage='';chatAbort=new AbortController();state={...state,messages:[...state.messages,{role:'user',text:message},{role:'assistant',text:'',live:true}]};render();
    try{await streamCompanion(message,{signal:chatAbort.signal,onToken:token=>{const live=state.messages.at(-1);if(live?.live)live.text+=token;const reply=document.querySelector('#live-reply');if(reply)reply.textContent=live?.text||'';const log=document.querySelector('#chat-transcript');if(log)log.scrollTop=log.scrollHeight;}});await refreshServerState();retryMessage='';}
    catch(error){const stopped=chatAbort.signal.aborted;try{await refreshServerState();}catch{}retryMessage=message;toast(stopped?'Reply stopped. Your message is saved and can be retried.':error.message||'Arcana could not finish this reply.');}
    finally{busy=false;chatAbort=null;render();document.querySelector('#chat-input')?.focus();}
    return;
  }
  const original=structuredClone(state),next=respondToChat(state,text);
  // Show the user's message immediately; keep generated drafts hidden until the reply arrives.
  state={...state,messages:[...state.messages,{role:'user',text:text.trim().slice(0,1600)}]};render();
  await new Promise(r=>setTimeout(r,600));
  commit(settleChat(state,original,next));
  busy=false;render();document.querySelector('#chat-input')?.focus();
}
function isRoadmapRequest(text){return /^(?:(?:i\s+(?:want|would like|['’]d like)\s+to\s+learn)|(?:help me learn)|(?:teach me)|(?:create|make|build)\s+(?:a\s+)?(?:new\s+)?(?:roadmap|learning plan|journey)|(?:learn a new subject)|(?:mình|tôi|em)\s+muốn\s+học|(?:lộ trình)\s+(?:học|cho))/i.test(text);}
function topicFromRequest(text){return text.replace(/^(?:i\s+(?:want|would like|['’]d like)\s+to\s+learn|help me learn|teach me|learn a new subject|(?:mình|tôi|em)\s+muốn\s+học|lộ trình\s+(?:học|cho)|create\s+(?:a\s+)?(?:new\s+)?(?:roadmap|learning plan|journey)(?:\s+for)?|make\s+(?:a\s+)?(?:new\s+)?(?:roadmap|learning plan|journey)(?:\s+for)?|build\s+(?:a\s+)?learning plan(?:\s+for)?)\s*/i,'').replace(/[.!?]+$/,'').trim();}
function flowExchange(user,assistant){state={...state,messages:[...state.messages,{role:'user',text:user},{role:'assistant',text:assistant}]};render();}
function beginAiRoadmapFlow(initial,knownGoal=''){
 const topic=topicFromRequest(initial);aiRoadmapFlow={topic:topic.length>=2?topic:'',goal:knownGoal,experienceLevel:'',minutesPerDay:0,stage:topic.length>=2?(knownGoal?'experience':'goal'):'topic'};
 state.draft=null;state.proposal=null;state.builder={stage:aiRoadmapFlow.stage==='goal'?'goal':aiRoadmapFlow.stage};view.examplePlan=null;closeModal();if(page!=='companion')navigate('companion');
 const question=aiRoadmapFlow.stage==='topic'?'What subject would you like to explore?':aiRoadmapFlow.stage==='goal'?'What would you like to be able to do with this subject?':`What is your current experience with ${aiRoadmapFlow.topic}?`;
 flowExchange(initial,question);
}
async function answerAiRoadmapQuestion(answer){
 const flow=aiRoadmapFlow;if(!flow)return;let question='';
  if(flow.stage==='topic'){if(answer.length<2){flowExchange(answer,'Please name the subject you want to study.');return;}flow.topic=answer.slice(0,120);flow.stage='goal';question=`What would you like to be able to do with ${flow.topic}?`}
 else if(flow.stage==='goal'){if(answer.length<3){flowExchange(answer,'Tell me a little more about the outcome you want.');return;}flow.goal=answer.slice(0,240);flow.stage='experience';question=`Where are you starting with ${flow.topic}: beginner, know the basics, or experienced?`}
 else if(flow.stage==='experience'){const normalized=answer.toLowerCase();flow.experienceLevel=/\b(experienced|advanced|professional|expert)\b|có kinh nghiệm|nâng cao/.test(normalized)?'experienced':/\b(basics|some|intermediate|know a little)\b|cơ bản|biết một chút/.test(normalized)?'some':/\b(beginner|new|start from scratch|no experience)\b|mới bắt đầu|chưa có kinh nghiệm/.test(normalized)?'beginner':'';if(!flow.experienceLevel){flowExchange(answer,'Choose beginner, know the basics, or experienced so I can set the right starting point.');return;}flow.stage='time';question='How much time can you set aside each day? Choose 15, 30, 45, 60, 90, or 120 minutes.'}
 else if(flow.stage==='time'){
  const digits=answer.match(/\d{1,3}/),minutes=digits?Number(digits[0]):/quarter|fifteen|15/i.test(answer)?15:/half an hour|thirty|30|nửa giờ/i.test(answer)?30:/forty.?five|45/i.test(answer)?45:/one hour|sixty|60|một giờ/i.test(answer)?60:/ninety|90/i.test(answer)?90:/two hours|120|hai giờ/i.test(answer)?120:0;
  if(![15,30,45,60,90,120].includes(minutes)){flowExchange(answer,'Please choose 15, 30, 45, 60, 90, or 120 minutes per day.');return;}
  flow.minutesPerDay=minutes;flowExchange(answer,`I have your goal, starting point, and ${minutes} minutes a day. I’m preparing a detailed roadmap preview now.`);await createCustomRoadmapPreview();return;
 }
 state.builder={stage:flow.stage};flowExchange(answer,question);
}
async function createCustomRoadmapPreview(){
 if(!aiRoadmapFlow||busy)return;aiRoadmapFlow.stage='generating';busy=true;render();
 try{const result=await generateAIJourney({topic:aiRoadmapFlow.topic,goal:aiRoadmapFlow.goal,experienceLevel:aiRoadmapFlow.experienceLevel,minutesPerDay:aiRoadmapFlow.minutesPerDay}),preview=result.proposal.preview;
  state.draft={id:`ai-${result.proposal.id}`,aiProposalId:result.proposal.id,trackId:preview.templateKey,trackName:preview.trackName,title:preview.title,goal:preview.goal,minutes:preview.minutesPerDay,days:preview.estimatedDays,experience:preview.experienceLevel,chapters:preview.chapters.map(chapter=>({...chapter,quests:chapter.quests.map(quest=>({...quest,xp:quest.xpReward}))}))};
  state.builder={stage:'ready'};aiRoadmapFlow=null;state={...state,messages:[...state.messages,{role:'assistant',text:'Here is a roadmap built around your subject, goal, experience, and daily time. Review the chapters, then accept it to add the journey to your grimoire.',kind:'draft'}]};render();
 }catch(error){if(aiRoadmapFlow)aiRoadmapFlow.stage='time';toast(error.message||'Arcana could not prepare that roadmap. Your journeys are unchanged.');state={...state,messages:[...state.messages,{role:'assistant',text:'We can keep your current journeys as they are. Please try the final time estimate again when you are ready.'}]};render();}
 finally{busy=false;render();}
}
function startTrack(id){if(busy)return;const track=trackById(id),dynamic=state.domains?.find(domain=>domain.id===id||domain.key===id);if(mode==='server'){beginAiRoadmapFlow(`I want to learn ${track?.name||dynamic?.name||id}`,track?.goal||'');return;}if(!track){toast('Arcana can add a full roadmap for this new branch once custom journey generation is connected.');return;}closeModal();state.builder={stage:'goal'};state.draft=null;save();navigate('companion');sendChat(track.goal);}
const actions={
 navigate: id=>navigate(id),menu:()=>document.querySelector('.sidebar').classList.toggle('open'),
 quest:id=>openModal('quest',id),close:closeModal,
 'start-assessment':id=>{modal={type:'assessment',id};renderModal();},
 'create-assessment':subtype=>{if(busy)return;const q=state.quests.find(item=>item.id===modal?.id);if(!q)return;busy=true;void createAssessment({subtype,topic:q.topic||q.title,prompt:q.prompt||q.description||q.title,questId:q.id}).then(({assessment})=>{modal={...modal,assessment};renderModal();}).catch(error=>toast(error.message||'This assessment could not be prepared. You can complete the quest manually.')).finally(()=>{busy=false;});},
 'new-journey':()=>openModal('new-journey'), 'start-track':startTrack,
 'knowledge-track':id=>{view.track=id;view.concept=state.concepts.find(c=>c.trackId===id).id;view.search='';view.filter='all';navigate('knowledge');},
 'begin-quest':id=>mode==='server'?serverMutation(()=>startQuest(id),{message:'Your next chapter has begun.',keepModal:true}):(()=>{const q=state.quests.find(q=>q.id===id);q.status='in-progress';save();render();renderModal();toast('Your next chapter has begun.');})(),
 'complete-quest':id=>{if(mode==='server'){const old=state.xp;void serverMutation(()=>completeQuestApi(id)).then(ok=>{if(ok){closeModal();render();toast(`Quest complete. +${state.xp-old} XP added to your chronicle.`);}});return;}const old=state.xp;commit(completeQuest(state,id));closeModal();render();toast(`Quest complete. +${state.xp-old} XP added to your chronicle.`);},
 branch:id=>{view.conceptPage=0;view.track=id;view.search='';view.filter='all';view.concept=state.concepts.find(c=>id==='all'||c.trackId===id).id;render();},
 concept:id=>{view.concept=id;render();if(innerWidth<1050)openModal('evidence',id);},
 'concept-page':id=>{view.conceptPage=Number(id);render();},
 chapter:id=>{view.chapter=Number(id);render();},
 view:id=>{view.view=id;render();},
 evidence:id=>openModal('evidence',id),
 'self-report':id=>{state.concepts.find(c=>c.id===id).status='self';save();closeModal();render();toast('Self-report updated. Your domain rank is unchanged.');},
 'exclude-evidence':id=>{const c=state.concepts.find(c=>c.id===id);c.evidence=[];c.status='unobserved';save();closeModal();render();toast('Sample evidence excluded.');},
 schedule:()=>openModal('schedule'),proposal:()=>openModal('proposal'),
 'apply-proposal':()=>{if(mode==='server'){const proposal=state.proposal;if(!proposal?.serverProposalId){toast('This proposal is no longer available.');return;}void serverMutation(()=>acceptProposal(proposal.serverProposalId)).then(ok=>{if(ok){state.proposal=null;closeModal();render();toast('Your new pace is applied. Previous work is preserved.');}});return;}commit(applyProposal(state));closeModal();render();toast('Your new pace is applied. Previous work is preserved.');},
 'discard-proposal':()=>{if(mode==='server'&&state.proposal?.serverProposalId){const id=state.proposal.serverProposalId;void serverMutation(()=>rejectProposal(id)).then(ok=>{if(ok){state.proposal=null;closeModal();render();toast('Your current plan is unchanged.');}});return;}state.proposal=null;save();closeModal();render();toast('Your current plan is unchanged.');},
 rest:()=>{state.restDay=!state.restDay;save();render();},
 prompt:text=>sendChat(text),
 'restart-chat':()=>{if(busy)return;aiRoadmapFlow=null;state.draft=null;closeModal();navigate('companion');sendChat('Start over');},
 'new-conversation':()=>{if(mode!=='server'||busy)return;busy=true;void startNewConversation().then(()=>refreshServerState()).catch(error=>toast(error.message||'The previous conversation could not be closed.')).finally(()=>{busy=false;render();});},
 'unlock-item':id=>void serverMutation(()=>unlockInventoryItem(id),{message:'Keepsake added to your inventory.'}),
 'equip-item':id=>void serverMutation(()=>equipInventoryItem(id),{message:'Your grimoire appearance has been updated.'}),
 'enable-push':()=>void enablePush(),
 'disable-push':()=>void disablePush(),
 'stop-chat':()=>chatAbort?.abort(),
 'retry-chat':()=>retryMessage&&sendChat(retryMessage),
 'reject-roadmap':()=>{const id=state.draft?.aiProposalId;if(!id)return;void serverMutation(()=>rejectProposal(id),{message:'Roadmap rejected. Your current journeys are unchanged.'}).then(ok=>{if(ok){state.draft=null;state.messages=[...state.messages,{role:'assistant',text:'I have left your grimoire unchanged. We can explore another subject whenever you like.'}];render();}});},
 'confirm-memory':id=>mode==='server'?void serverMutation(()=>confirmMemory(id),{message:'Memory saved. Arcana can now use this learning preference.'}):undefined,
 'dismiss-memory':id=>mode==='server'?void serverMutation(()=>dismissMemory(id),{message:'Suggestion dismissed. It will not guide future replies.'}):undefined,
 'preview-draft':()=>openModal('preview-draft'),
 activate:()=>{if(!state.draft)return;if(mode==='server'){void createRoadmapOnServer(state.draft);return;}commit(activateRoadmap(state,state.draft));view.examplePlan=null;view.chapter=0;closeModal();navigate('roadmap');toast('A new journey begins. Your roadmap is now active.');},
 'start-example':()=>{if(mode==='server'){if(view.examplePlan)void createRoadmapOnServer(view.examplePlan);return;}commit(activateRoadmap(state,view.examplePlan));view.examplePlan=null;view.chapter=0;render();toast('Your detailed roadmap is now active.');},
 'finish-journey':()=>openModal('finish-journey'),
 'confirm-finish':()=>{if(mode==='server'){const journey=activeJourney(state);if(journey)void serverMutation(()=>finishJourney(journey.id)).then(ok=>{if(ok){closeModal();toast('Journey completed. Your next adventure is yours to choose.');}});return;}activeJourney(state).status='completed';save();closeModal();render();toast('Journey completed. Your next adventure is yours to choose.');},
 'delete-memory':id=>{state.memories=state.memories.filter(m=>m.id!==id);save();render();toast('Memory removed from this browser.');},
 reset:()=>openModal('reset'),
 identity:()=>openModal('identity'),
 'enter-demo':()=>switchToServer('demo'),
 'copy-player-code':async()=>{try{await navigator.clipboard.writeText(oneTimePlayerCode||'');toast('Player Code copied. Store it somewhere private.');}catch{toast('Copy was blocked. Select the code and copy it manually.');}},
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
  const assessment=document.querySelector('#assessment-answer-form');if(assessment)assessment.onsubmit=async e=>{e.preventDefault();if(busy)return;const current=modal?.assessment;if(!current)return;let input;if(current.subtype==='QUIZ'){const formData=new FormData(assessment),count=Number(formData.get('question-count'));input={answers:Array.from({length:count},(_,index)=>Number(formData.get(`answer-${index}`)))};if(input.answers.some((answer,index)=>!formData.has(`answer-${index}`))){toast('Answer each question before submitting.');return;}}else input={answer:String(new FormData(assessment).get('answer')||'')};busy=true;try{const {result}=await submitAssessment(current.id,input);modal={...modal,result};await refreshServerState();renderModal();}catch(error){toast(error.message||'The assessment could not be submitted.');}finally{busy=false;}};
  document.querySelectorAll('[data-check]').forEach(el=>el.onchange=()=>{const q=state.quests.find(q=>q.id===modal.id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===modal.id),i=Number(el.dataset.check);if(mode==='server'){const stepId=q?.stepIds?.[i];if(!stepId){toast('This step cannot be updated yet.');renderModal();return;}void serverMutation(()=>updateQuestStep(q.id,stepId,el.checked),{keepModal:true});return;}q.checks=el.checked?[...new Set([...q.checks,i])]:q.checks.filter(x=>x!==i);save();});
  const notes=document.querySelector('#quest-notes');if(notes)notes.oninput=()=>{if(mode!=='server'){(state.quests.find(q=>q.id===modal.id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===modal.id)).notes=notes.value;save();}};
  if(notes&&mode==='server')notes.onblur=()=>{const q=state.quests.find(q=>q.id===modal.id);if(q&&notes.value!==q.notes)void serverMutation(()=>updateQuestNote(q.id,notes.value),{keepModal:true});};
  const schedule=document.querySelector('#schedule-form');if(schedule)schedule.onsubmit=e=>{e.preventDefault();const minutes=Number(new FormData(schedule).get('minutes'));if(mode==='server'){const journey=activeJourney(state);if(journey)void previewPacingOnServer(journey,minutes);return;}commit(proposeSchedule(state,minutes));modal={type:'proposal'};renderModal();};
  const restore=document.querySelector('#restore-player-form');if(restore)restore.onsubmit=e=>{e.preventDefault();switchToServer('restore',String(new FormData(restore).get('code')||'').trim());};
}
save();render();
void loadPlayerState({offlineState:state}).then(result=>{
 if(result.mode==='offline'){bootstrapError=result.error;render();return;}
 mode='server';identity=result.identity;state=result.state;render();
 if(result.playerCode){oneTimePlayerCode=result.playerCode;openModal('player-code');}
}).catch(error=>{bootstrapError=error;mode='offline';render();});
