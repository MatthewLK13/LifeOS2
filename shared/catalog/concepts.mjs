import {TRACKS} from './tracks.mjs';

export const STATUSES={
  mastered:{label:'Mastered',short:'Mastered',color:'#8b5e2b'},
  applying:{label:'Applying',short:'Applying',color:'#3f6b45'},
  understanding:{label:'Signs of understanding',short:'Understanding',color:'#385e79'},
  discovered:{label:'Discovered',short:'Discovered',color:'#96711d'},
  self:{label:'Self-reported',short:'Self-reported',color:'#96711d'},
  exploring:{label:'Exploring',short:'Exploring',color:'#795286'},
  unobserved:{label:'Not yet observed',short:'Unobserved',color:'#8a8270'}
};
export const CONCEPTS=TRACKS.flatMap((t,ti)=>t.concepts.map((name,i)=>({
  id:`${t.id}-${i}`,key:`${t.id}-${i}`,trackId:t.id,name,
  status:ti===0?(['applying','understanding','applying','understanding','self','exploring'][i]||'unobserved'):(['understanding','self','exploring'][i]||'unobserved'),
  chapter:t.modules.findIndex(m=>m.topics.includes(name)),
  scope:`${name} · ${t.modules.find(m=>m.topics.includes(name)).summary}`,
  evidence:i<3?[{date:'Sep 24, 2026',text:t.id==='rag'?'I would compare passages with similar meaning, then inspect the retrieved text before trusting the answer.':`When working with ${name.toLowerCase()}, I start with a small example and compare what changes when the input changes.`,reason:'Illustrative conversation excerpt. This fixture is not an assessment of the current viewer.'},{date:'Sep 22, 2026',text:`I used ${name.toLowerCase()} in a small ${t.name} exercise and explained my choice using a different example.`,reason:'Second illustrative session; limited to the stated concept.'}]:[]
})));
