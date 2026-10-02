import {TRACKS,trackById,STATUSES} from './data.js';
import {esc,icon} from './ui.js';
import {CROSS_LINKS} from './breadth.js';
import {chapterPath} from './pathways.js';
function edge(x1,y1,x2,y2,color,dashed=false){return `<path d="M${x1} ${y1} C${x1} ${(y1+y2)/2},${x2} ${(y1+y2)/2},${x2} ${y2}" stroke="${color}" stroke-width="2.4" fill="none" ${dashed?'stroke-dasharray="6 7"':''}/>`;}
function node({x,y,id,title,subtitle,symbol,color,selected=false,action='concept',kind=''}){return `<button type="button" class="graph-node ${selected?'selected':''} ${kind}" data-action="${action}" data-id="${esc(id)}" style="left:${x}px;top:${y}px;--node-color:${color}" aria-label="${esc(title)}${subtitle?`: ${esc(subtitle)}`:''}" aria-pressed="${selected}"><span class="node-orb">${icon(symbol)}<span class="orb-spark">✦</span></span><strong>${esc(title)}</strong><span class="node-caption">${esc(subtitle||'')}</span></button>`;}
export function knowledgeGraph(concepts,{track='all',search='',filter='all',selected='',page=0,domains=TRACKS.map(t=>({id:t.id,name:t.name,color:t.color,icon:t.icon,modules:t.modules,concepts:t.concepts}))}){
  let edges='',nodes='';const matches=concepts.filter(c=>(track==='all'||c.trackId===track)&&(filter==='all'||c.status===filter)&&c.name.toLowerCase().includes(search.toLowerCase()));
  if(!matches.length)return '<div class="empty-state"><h3>No concepts found</h3><p>Try another search or clear your filters.</p></div>';
  if(track==='all'&&!search&&filter==='all'){
    const positions=new Map();
    domains.forEach((domain,i)=>{
      const members=concepts.filter(c=>c.trackId===domain.id),a=-Math.PI/2+i*2*Math.PI/domains.length,x=1200+850*Math.cos(a),y=1020+680*Math.sin(a);positions.set(domain.id,[x,y]);
      edges+=edge(1200,1050,x,y+40,domain.color);
      nodes+=node({x,y,id:domain.id,title:domain.name,subtitle:members.length+' concepts',symbol:domain.icon||'tree',color:domain.color,action:'branch',kind:'branch-node atlas-branch'});
      members.slice(0,3).forEach((c,k)=>{
        const b=a+(k-1)*.085,lx=1200+1090*Math.cos(b),ly=1020+900*Math.sin(b);
        edges+=edge(x,y+40,lx,ly+40,domain.color,true);
        nodes+=node({x:lx,y:ly,id:c.id,title:c.name,subtitle:'Explore concept',symbol:domain.icon||'leaf',color:domain.color,selected:selected===c.id,kind:'atlas-leaf'});
      });
    });
    for(const [from,to] of CROSS_LINKS){const a=positions.get(from),b=positions.get(to);if(a&&b)edges+='<g class="cross-link">'+edge(a[0],a[1]+40,b[0],b[1]+40,'#735982',true)+'</g>';}
    nodes+=node({x:1200,y:990,id:'all',title:'MY KNOWLEDGE',subtitle:domains.length+' branches · A world to discover',symbol:'tree',color:'#96711d',action:'branch',kind:'root-node atlas-core'});
    return canvas(edges,nodes,2100,2400,'atlas');
  }else if(track!=='all'&&!search&&filter==='all'){
    const domain=domains.find(item=>item.id===track),template=trackById(track);
    if(template){
      template.modules.forEach((m,i)=>{const x=500+(i%2)*1000,y=180+Math.floor(i/2)*390;
        edges+=edge(1000,90,x,y,'#b7a77e',true);
        nodes+=`<div class="module-map-label" style="left:${x}px;top:${y}px">${esc(m.title)}</div>`;
        m.topics.forEach((topic,k)=>{const c=matches.find(c=>c.name===topic),cx=x+(k%2===0?-210:210),cy=y+65+Math.floor(k/2)*145;if(!c)return;
          edges+=edge(x,y+20,cx,cy+30,template.color);
          nodes+=node({x:cx,y:cy,id:c.id,title:c.name,subtitle:STATUSES[c.status].short,symbol:template.icon,color:STATUSES[c.status].color,selected:selected===c.id});
        });
      });
      nodes+=node({x:1000,y:10,id:'all',title:template.name,subtitle:'Return to all branches',symbol:'tree',color:template.color,action:'branch',kind:'root-node'});
      return canvas(edges,nodes,Math.ceil(template.modules.length/2)*390+190,2000,'domain-atlas');
    }
    const info=domain||{name:'Knowledge',color:'#96711d',icon:'tree'},pageStart=Math.min(page,Math.floor((matches.length-1)/6))*6;
    matches.slice(pageStart,pageStart+6).forEach((c,i)=>{const x=i%2===0?260:740,y=60+Math.floor(i/2)*185;if(i>=2)edges+=edge(x,y-110,x,y+20,STATUSES[c.status].color,true);nodes+=node({x,y,id:c.id,title:c.name,subtitle:STATUSES[c.status].short,symbol:info.icon||'tree',color:STATUSES[c.status].color,selected:selected===c.id});});
    nodes+=node({x:500,y:625,id:'all',title:info.name.toUpperCase(),subtitle:'Return to all branches',symbol:'tree',color:info.color,action:'branch',kind:'root-node'});
  }else{
    const pageStart=Math.min(page,Math.floor((matches.length-1)/6))*6,domain=domains.find(item=>item.id===track);
    matches.slice(pageStart,pageStart+6).forEach((c,i)=>{const x=i%2===0?260:740,y=60+Math.floor(i/2)*185;if(i>=2)edges+=edge(x,y-110,x,y+20,STATUSES[c.status].color,true);nodes+=node({x,y,id:c.id,title:c.name,subtitle:STATUSES[c.status].short,symbol:trackById(c.trackId)?.icon||domain?.icon||'tree',color:STATUSES[c.status].color,selected:selected===c.id});});
    nodes+=node({x:500,y:625,id:'all',title:track==='all'?'SEARCH RESULTS':trackById(track)?.name?.toUpperCase()||domain?.name?.toUpperCase()||'KNOWLEDGE',subtitle:'Back to all branches',symbol:'tree',color:'#96711d',action:'branch',kind:'root-node'});
  }
  return canvas(edges,nodes,780);
}
function canvas(edges,nodes,height,width=1000,kind=''){return '<div class="graph-viewport '+kind+'" tabindex="0" aria-label="Interactive skill map. Use Tab to reach a skill node. Use arrow keys to pan. Drag empty space to pan and use the zoom controls for scale."><div class="graph-plane" style="width:'+width+'px;height:'+height+'px"><svg class="graph-lines" width="'+width+'" height="'+height+'" aria-hidden="true"><circle cx="'+width/2+'" cy="'+height/2+'" r="'+height*.35+'" class="orbit"/><circle cx="'+width/2+'" cy="'+height/2+'" r="'+height*.24+'" class="orbit"/>'+edges+'</svg>'+nodes+'<span class="map-corner north">N<br>✧</span><span class="map-watermark">LIFEOS SKILL MAP</span></div><div class="map-hint">'+icon('compass')+' Tab to select · Arrow keys to pan · Drag to explore · Zoom for details</div></div>';}
export function roadmapGraph(journey,quests,selected=0){
  let edges='',nodes='';const chapters=journey.chapters.map((c,i)=>({...chapterPath(i,journey.chapters.length),...c})),depths=[];
  chapters.forEach((c,i)=>depths[i]=c.requires.length?1+Math.max(...c.requires.map(p=>depths[p])):0);
  const coords=chapters.map((c,i)=>{const peers=chapters.map((_,n)=>n).filter(n=>depths[n]===depths[i]);return [600+(peers.indexOf(i)-(peers.length-1)/2)*480,60+depths[i]*220];});
  chapters.forEach((c,i)=>{const [x,y]=coords[i],qs=quests.filter(q=>q.chapter===i),done=qs.filter(q=>q.status==='completed').length,color=qs.length&&done===qs.length?'#3f6b45':i===selected?'#b23a1f':c.optional?'#795286':'#96711d';
    c.requires.forEach(p=>edges+=edge(coords[p][0],coords[p][1]+65,x,y+30,c.optional?'#795286':'#9a865c',c.optional));
    nodes+=node({x,y,id:String(i),title:c.title,subtitle:`${c.lane} · ${done}/${qs.length} complete`,symbol:done===qs.length?'check':c.optional?'spark':'flag',color,selected:i===selected,action:'chapter',kind:'roadmap-node branching-node'});
    nodes+=`<div class="graph-topic-label" style="left:${x}px;top:${y+140}px">${esc(c.topics.slice(0,2).join(' · '))}</div>`;
  });
  return canvas(edges,nodes,Math.max(...depths)*220+280,1200,'roadmap-atlas');
}
export function bindGraph(container){
  const viewport=container.querySelector('.graph-viewport'),plane=container.querySelector('.graph-plane');if(!viewport||!plane)return;
  let scale=1,x=0,y=0,drag=null;
  const width=parseFloat(plane.style.width);
  const draw=()=>{plane.style.transform=`translate(${x}px,${y}px) scale(${scale})`;viewport.classList.toggle('zoom-detail',scale>=.55);};
  const fit=()=>{scale=Math.min(viewport.clientWidth/width,(viewport.clientHeight-30)/parseFloat(plane.style.height),1);x=(viewport.clientWidth-width*scale)/2;y=10;draw();};fit();
  const resize=new ResizeObserver(()=>fit());resize.observe(viewport);
  container.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>{if(b.dataset.zoom==='fit'){fit();return;}const old=scale;scale=Math.min(1.8,Math.max(.35,scale+(b.dataset.zoom==='in'?.15:-.15)));const cx=viewport.clientWidth/2,cy=viewport.clientHeight/2;x=cx-(cx-x)*scale/old;y=cy-(cy-y)*scale/old;draw();});
  viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={sx:e.clientX,sy:e.clientY,x,y};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');});
  viewport.addEventListener('pointermove',e=>{if(!drag)return;x=drag.x+e.clientX-drag.sx;y=drag.y+e.clientY-drag.sy;draw();});
  const end=()=>{drag=null;viewport.classList.remove('dragging');};viewport.addEventListener('pointerup',end);viewport.addEventListener('pointercancel',end);
  viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;const d={ArrowLeft:[30,0],ArrowRight:[-30,0],ArrowUp:[0,30],ArrowDown:[0,-30]}[e.key];if(d){e.preventDefault();x+=d[0];y+=d[1];draw();}});
  return ()=>resize.disconnect();
}
