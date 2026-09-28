import {TRACKS,trackById,CONCEPTS,INITIAL_MESSAGES,questContent,STATUSES} from './data.js';
import {chapterPath} from './pathways.js';
export const STORAGE_KEY='lifeos-grimoire-demo-v1';
const copy=value=>structuredClone(value);
const uid=()=>globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const todayKey=()=>new Date().toLocaleDateString('en-CA');
export const activeJourney=s=>s.journeys.find(j=>j.id===s.activeId)||s.journeys[0];
export const levelFor=xp=>1+Math.floor(xp/100);
export function settleChat(current,base,response){
  const next={...current,messages:response.messages};
  if(JSON.stringify(current.builder)===JSON.stringify(base.builder)&&JSON.stringify(current.draft)===JSON.stringify(base.draft)){next.builder=response.builder;next.draft=response.draft;}
  if(JSON.stringify(current.proposal)===JSON.stringify(base.proposal))next.proposal=response.proposal;
  return next;
}
export function createRoadmap({trackId,experience='beginner',minutes=30,id=uid()}) {
  const track=trackById(trackId);
  if(!track||!Number.isFinite(minutes)||minutes<15||minutes>120)throw new Error('Choose a supported domain and 15–120 minutes per day.');
  const chapters=track.modules.map((module,i)=>({id:id+'-chapter-'+i,...chapterPath(i,track.modules.length),title:module.title,summary:module.summary,topics:[...module.topics],quests:[...module.topics,null].map((topic,n)=>{
    const practice=topic===null,type=practice?'Practice':'Learn',session=Math.min(minutes,experience==='beginner'?20:15);
    return {id:id+'-q-'+i+'-'+n,journeyId:id,chapter:i,trackId,topic:topic||module.title,title:practice?module.practice:'Explore '+topic,type,difficulty:practice?'B':'C',xp:practice?20:10,minutes:session,status:'active',checks:[],notes:'',...questContent(trackId,topic||module.title,type),prompt:practice?module.practice:'Explain '+topic+' using a small example, then connect it to '+module.title.toLowerCase()+'.',steps:practice?['Read the chapter outcome: '+module.practice,'Complete a small version of the chapter activity','Compare two attempts or observations and describe what changes','Record your result and one remaining question']:['Read about '+topic,'Write a short explanation in your own words','Try a minimal example of '+topic,'Connect your example to '+module.title]};
  })}));
  return {id,trackId,title:track.goal,experience,minutes,version:1,status:'active',chapters,days:Math.ceil(chapters.flatMap(c=>c.quests).reduce((n,q)=>n+q.minutes,0)/minutes),createdAt:todayKey()};
}
export function createInitialState(){
  const seed=createRoadmap({trackId:'rag',experience:'some',minutes:60});seed.id='seed-rag';seed.title='Build Document Q&A Chatbot with RAG';
  seed.chapters.forEach((c,i)=>{c.id=`seed-c-${i}`;c.quests.forEach((q,n)=>{q.id=`seed-q-${i}-${n}`;q.journeyId=seed.id;q.status=i<3?'completed':'active';});});
  seed.chapters[3].quests[0]={...seed.chapters[3].quests[0],id:'seed-embeddings',title:'Experiment with Embeddings on 5 Text Samples',type:'Practice',difficulty:'B',xp:20,status:'in-progress',minutes:20,checks:[0],...questContent('rag','embeddings')};
  seed.chapters[0].quests[1]={...seed.chapters[0].quests[1],title:'Review HTTP & API Fundamentals',type:'Review',difficulty:'C',xp:10,...questContent('python','HTTP requests and API responses','Learn')};
  seed.chapters[2].quests[0]={...seed.chapters[2].quests[0],title:'Explore Text Chunking Strategies',type:'Learn',difficulty:'C',xp:10,...questContent('rag','text chunking','Learn')};
  return {schema:1,catalogVersion:4,xp:250,dailyXp:10,rewardDay:todayKey(),activeId:seed.id,journeys:[seed],quests:seed.chapters.flatMap(c=>c.quests),concepts:copy(CONCEPTS),ranks:TRACKS.map(t=>({trackId:t.id,rank:t.rank})),ledger:[{id:'seed-ledger',title:'Review HTTP & API fundamentals',xp:10,date:todayKey()},{id:'prior',title:'Earlier adventures · sample history',xp:240,date:'2026-09-24'}],messages:copy(INITIAL_MESSAGES),builder:{stage:'goal'},draft:null,proposal:null,memories:[{id:'m1',text:'I learn best by building small projects.',source:'Sample conversation · Sep 22'},{id:'m2',text:'My current goal is a document Q&A chatbot.',source:'Confirmed sample goal'}],preferences:{streak:true,inference:true,reducedMotion:false},restDay:false};
}
export function activateRoadmap(state,plan){
  if(!plan||state.journeys.some(j=>j.id===plan.id))return state;
  if(state.journeys.filter(j=>j.status==='active').length>=3)throw new Error('You have three active journeys. Finish a journey before starting another.');
  const next=copy(state);next.journeys.push(copy(plan));next.quests.push(...copy(plan.chapters.flatMap(c=>c.quests)));next.activeId=plan.id;next.draft=null;next.builder={stage:'goal'};next.restDay=false;return next;
}
export function completeQuest(state,id){
  const quest=state.quests.find(q=>q.id===id);if(!quest||quest.status==='completed'||quest.status==='cancelled')return state;
  const next=copy(state);if(next.rewardDay!==todayKey()){next.dailyXp=0;next.rewardDay=todayKey();}
  const gained=Math.max(0,Math.min(quest.xp,120-next.dailyXp));next.quests.find(q=>q.id===id).status='completed';next.xp+=gained;next.dailyXp+=gained;next.ledger.unshift({id:uid(),title:quest.title,xp:gained,date:todayKey()});return next;
}
export function proposeSchedule(state,minutes){
  if(!Number.isFinite(minutes)||minutes<15||minutes>120)throw new Error('Choose 15–120 minutes per day.');
  const next=copy(state),journey=activeJourney(state);next.proposal={journeyId:journey.id,version:journey.version,previous:journey.minutes,minutes,days:Math.ceil(journey.days*journey.minutes/minutes)};return next;
}
export function applyProposal(state){
  const p=state.proposal;if(!p)return state;
  const next=copy(state),journey=next.journeys.find(j=>j.id===p.journeyId);if(!journey||journey.version!==p.version)throw new Error('This preview is out of date. Create a new schedule proposal.');
  journey.minutes=p.minutes;journey.days=p.days;journey.version++;
  next.quests=next.quests.flatMap(q=>{
    if(q.journeyId!==journey.id||q.status!=='active'||q.minutes<=p.minutes)return [q];
    const count=Math.ceil(q.minutes/p.minutes),baseMinutes=Math.floor(q.minutes/count),extraMinutes=q.minutes%count;
    const segments=Array.from({length:count},(_,i)=>({...q,id:`${q.id}-v${journey.version}-${i}`,title:`${q.title} · Part ${i+1}/${count}`,minutes:baseMinutes+(i<extraMinutes?1:0),checks:[],notes:'',xp:0}));
    let remainder=q.xp;segments.forEach(x=>{x.xp=Math.floor(q.xp*x.minutes/q.minutes);remainder-=x.xp;});
    const order=[...segments].sort((a,b)=>(q.xp*b.minutes/q.minutes)%1-(q.xp*a.minutes/q.minutes)%1);
    for(let i=0;i<remainder;i++)order[i].xp++;
    return segments;
  });
  next.proposal=null;return next;
}
function migrateCatalog(s){
  if(s.catalogVersion===4)return;
  if(!s.concepts.length||!s.journeys.every(p=>p?.chapters?.length))throw new Error('Invalid legacy save');
  s.concepts=CONCEPTS.map(c=>{const previous=s.concepts.find(x=>x.trackId===c.trackId&&x.name===c.name);return previous?{...c,status:previous.status,evidence:previous.evidence}:copy(c);});
  for(const plan of s.journeys){
    const fresh=createRoadmap({...plan,id:plan.id});
    const previous=s.quests.filter(q=>q.journeyId===plan.id);
    for(const q of previous){
      const index=fresh.chapters.findIndex(c=>c.topics.includes(q.topic)||c.topics.some(t=>q.title.toLowerCase().includes(t.toLowerCase())));
      q.chapter=index>=0?index:Math.min(q.chapter,fresh.chapters.length-1);
    }
    // Existing activity IDs and rewards remain untouched; new concepts get new activities.
    const ids=new Set(previous.map(q=>q.id));
    const additions=fresh.chapters.flatMap(c=>c.quests).filter(q=>!previous.some(old=>old.topic===q.topic&&old.type===q.type)).map(q=>({...q,id:ids.has(q.id)?`${q.id}-catalog3`:q.id}));
    s.quests.push(...additions);
    plan.chapters=fresh.chapters;plan.days=Math.ceil(s.quests.filter(q=>q.journeyId===plan.id).reduce((n,q)=>n+q.minutes,0)/plan.minutes);
  }
  if(s.draft)s.draft=createRoadmap({...s.draft,id:s.draft.id});
  for(const t of TRACKS)if(!s.ranks.some(r=>r.trackId===t.id))s.ranks.push({trackId:t.id,rank:t.rank});
  s.catalogVersion=4;
}
export function hydrate(raw){
  try{const s=JSON.parse(raw);
    if(s?.schema!==1||!Number.isFinite(s.xp)||s.xp<0||!Number.isFinite(s.dailyXp)||!Array.isArray(s.journeys)||!s.journeys.length||!Array.isArray(s.quests)||!Array.isArray(s.concepts)||!Array.isArray(s.messages)||!Array.isArray(s.memories)||!Array.isArray(s.ledger)||!Array.isArray(s.ranks)||!s.preferences||!s.builder)throw new Error();
    migrateCatalog(s);
    const validQuest=q=>q&&typeof q.id==='string'&&typeof q.title==='string'&&trackById(q.trackId)&&Number.isFinite(q.xp)&&q.xp>=0&&Number.isFinite(q.minutes)&&q.minutes>0&&Array.isArray(q.checks)&&Array.isArray(q.steps)&&q.steps.every(x=>typeof x==='string')&&['active','in-progress','completed','cancelled'].includes(q.status)&&Number.isInteger(q.chapter)&&q.chapter>=0&&q.chapter<100;
    const validPlan=j=>j&&typeof j.id==='string'&&typeof j.title==='string'&&trackById(j.trackId)&&Number.isFinite(j.minutes)&&j.minutes>=15&&j.minutes<=120&&Number.isFinite(j.days)&&Number.isInteger(j.version)&&Array.isArray(j.chapters)&&j.chapters.length>0&&j.chapters.every(c=>c&&typeof c.title==='string'&&Array.isArray(c.quests)&&c.quests.every(validQuest));
    if(!s.journeys.every(validPlan)||!s.quests.every(validQuest)||s.concepts.length!==CONCEPTS.length||!CONCEPTS.every(c=>s.concepts.some(x=>x?.id===c.id&&x.trackId===c.trackId))||!s.concepts.every(c=>typeof c.name==='string'&&Object.hasOwn(STATUSES,c.status)&&Array.isArray(c.evidence)&&c.evidence.every(e=>e&&typeof e.text==='string'))||!s.messages.every(m=>m&&['user','assistant'].includes(m.role)&&typeof m.text==='string')||!['goal','experience','time','ready'].includes(s.builder.stage)||!s.memories.every(m=>m&&typeof m.text==='string'&&typeof m.id==='string')||!s.ledger.every(l=>l&&typeof l.title==='string'&&Number.isFinite(l.xp))||!['streak','inference','reducedMotion'].every(k=>typeof s.preferences[k]==='boolean')||s.draft&&!validPlan(s.draft))throw new Error();
    if(!s.journeys.some(j=>j.id===s.activeId))s.activeId=s.journeys[0].id;
    if(s.rewardDay!==todayKey()){s.rewardDay=todayKey();s.dailyXp=0;}return s;
  }catch{return createInitialState();}
}
export function detectTrack(text){
  const domains=[['xiaozhi',/xiaozhi|小智/i],['esp32',/esp32/i],['sensors',/sensors?|cảm biến/i],['iot',/\biot\b|internet of things/i],['electronics',/electronics|circuits?|điện tử/i],['ielts',/ielts/i],['badminton',/badminton|cầu lông/i],['psychology',/psychology|tâm l[iíý]/i],['thinking',/critical thinking|tư duy/i],['communication',/communication|giao tiếp/i],['english',/english|tiếng anh/i],['fitness',/fitness|thể lực/i],['habits',/habits?|motivation|thói quen/i]];
  const domain=domains.find(([,pattern])=>pattern.test(text));if(domain)return domain[0];
  if(/\b(javascript|js|ecmascript)\b/i.test(text))return 'js';if(/\bjava\b/i.test(text))return 'java';if(/\b(oop|object.oriented|encapsulation|polymorphism)\b/i.test(text))return 'oop';
  if(/\b(dsa|data structures?|algorithms?|interviews?|sorting|trees)\b/i.test(text))return 'dsa';
  if(/\b(rag|pdf|chatbot|retrieval|embeddings?)\b/i.test(text))return 'rag';if(/\b(ai|artificial intelligence|machine learning|deep learning|neural networks?)\b/i.test(text))return 'ai';if(/\bpython\b/i.test(text))return 'python';return null;
}
export function respondToChat(state,input){
  const text=input.trim().slice(0,1600);if(!text)return state;
  const next=copy(state);next.messages.push({role:'user',text});const reply=(message,kind)=>next.messages.push({role:'assistant',text:message,...(kind?{kind}:{})});
  const b=next.builder,matched=detectTrack(text),duration=text.match(/\b(\d{1,3})\s*(?:min|minute)/i);
  const minutes=duration?Number(duration[1]):/^\d+$/.test(text)?Number(text):/\b(an?|one) hour\b/i.test(text)?60:null;
  if(/^(cancel|start over|new journey|create a roadmap)$/i.test(text)){next.builder={stage:'goal'};next.draft=null;reply('A fresh page. What would you like to learn? Explore programming, electronics, ESP32, sensors, IoT, Xiaozhi, psychology, English, IELTS, badminton, fitness, or habits.');}
  else if(b.stage==='experience'){
    const experience=/beginner|scratch|new|no experience/i.test(text)?'beginner':/some|basic|intermediate|familiar|experience|advanced/i.test(text)?'some':null;
    if(experience){next.builder={...b,experience,stage:'time'};reply('That gives us a starting point. How much time can you set aside each day? Choose 15, 30, 45, or 60 minutes (up to 120).');}else reply('For this demo, choose “I am a beginner” or “I know the basics” so I can tailor the starting point.');
  }else if(b.stage==='time'){
    if(minutes&&minutes>=15&&minutes<=120){next.draft=createRoadmap({...b,minutes});next.builder={...b,minutes,stage:'ready'};reply(`Your ${trackById(b.trackId).name} roadmap is ready to preview: ${next.draft.chapters.length} chapters, ${next.draft.chapters.flatMap(c=>c.quests).length} activities, and ${minutes} minutes a day. ${b.experience==='beginner'?'We will begin with guided foundations.':'We will use a faster review pace.'} Nothing is activated until you choose Start this journey.`,'draft');}else reply('Please enter a daily budget between 15 and 120 minutes, for example “30 minutes a day”.');
  }else if(/(?:less|only|schedule|budget|adjust|reduce|minutes? a day)/i.test(text)&&minutes){
    if(minutes>=15&&minutes<=120){next.proposal=proposeSchedule(next,minutes).proposal;reply(`I prepared a ${minutes}-minute daily plan. Review the schedule before applying it. Your existing work and XP will be preserved.`,'proposal');}else reply('Please choose a study budget from 15 to 120 minutes.');
  }else if(matched&&!/explain|what is|what are|help me understand/i.test(text)){next.builder={stage:'experience',trackId:matched};next.draft=null;reply(`Let's chart a path through ${trackById(matched).name}. Before I prepare it, what is your background: are you a beginner, or do you know the basics?`);}
  else if(/explain|what is|what are|help me understand/i.test(text)){const track=trackById(matched||activeJourney(next).trackId);reply(`${track.explanation}\n\nTry it in your next quest and write down what you notice. This is a prepared demo explanation, not a live AI response.`);}
  else if(/next quest|recommend|stuck/i.test(text)){const q=next.quests.find(q=>q.journeyId===next.activeId&&q.status!=='completed');reply(q?`Your next small step is “${q.title}”. Start with the first checklist item. You can open it from Today, and complete it whenever you feel ready.`:'You have completed these activities. Open Roadmap to reflect on your journey.');}
  else reply('This demo offers 20 branches: programming, electronics, ESP32, sensors, IoT, Xiaozhi, psychology, critical thinking, communication, English, IELTS, badminton, fitness, or habits. Choose a branch from the sidebar or say “Learn ESP32”. Responses come from prepared scenarios.');
  next.messages=next.messages.slice(-60);return next;
}
