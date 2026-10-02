export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 book:'M4 3h6a3 3 0 0 1 3 3v15a4 4 0 0 0-4-2H3V3h1Zm9 3a3 3 0 0 1 3-3h5v16h-5a4 4 0 0 0-3 2',
 tree:'M12 3v6M5 15v-4h14v4M3 15h4v5H3zM10 2h4v4h-4zM17 15h4v5h-4zM12 11v5M10 16h4v5h-4z',
 compass:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM16 8l-3 5-5 3 3-5 5-3Z',
 spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4M18 4h4',
 chart:'M4 3v17h17M7 14l4-5 4 3 6-7',
 settings:'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
 arrow:'M4 12h16m-6-6 6 6-6 6',
 chevron:'m9 5 7 7-7 7',
 check:'m5 12 4 4L19 6',
 clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',
 flag:'M5 21V4m0 0c5-4 9 4 14 0v10c-5 4-9-4-14 0',
 trophy:'M8 3h8v7a4 4 0 0 1-8 0V3Zm0 2H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v6m-4 1h8',
 flame:'M12 2c2 5-3 6 0 10 1-3 4-4 5-6 6 9 2 16-5 16S1 15 6 9c0 4 2 4 2 4-1-5 4-6 4-11Z',
 code:'m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20',
 coffee:'M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m4-3v3m4-3v3M3 23h16',
 layers:'m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5',
 search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
 plus:'M12 5v14M5 12h14',minus:'M5 12h14',
 fit:'M9 3H3v6m12-6h6v6M3 15v6h6m6 0h6v-6',
 list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
 close:'m6 6 12 12M6 18 18 6',
 send:'m22 2-7 20-4-9L2 9l20-7Zm0 0L11 13',
 shield:'m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Zm-4 10 3 3 5-6',
 reset:'M3 10a9 9 0 1 1 2 8M3 4v6h6',
 leaf:'M20 3C7 0 0 12 8 18c6 5 14-2 12-15ZM4 21 16 9',
 star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z',
 info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v6M12 7h.01',
 external:'M14 3h7v7m0-7L10 14M10 3H4v17h17v-6',
 menu:'M3 6h18M3 12h18M3 18h18',
 moon:'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z',
 pen:'m15 3 6 6-12 12H3v-6L15 3ZM12 6l6 6',
 trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
 lock:'M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4',
 heart:'M12 21 3 12C-3 3 8-1 12 6c4-7 15-3 9 6l-9 9Z'
};
export function icon(name,cls=''){return `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${paths[name]||paths.spark}"/></svg>`;}
export const btn=(label,action,options={})=>`<button type="button" class="btn ${options.primary?'primary':''} ${options.class||''}" data-action="${action}" ${options.id?`data-id="${esc(options.id)}"`:''} ${options.disabled?'disabled':''}>${options.icon?icon(options.icon):''}${label}</button>`;
export const badge=(text,kind='')=>`<span class="badge ${kind}">${esc(text)}</span>`;
export const sectionHead=(eyebrow,title,description='',actions='')=>`<header class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${description?`<p>${description}</p>`:''}</div>${actions?`<div class="heading-actions">${actions}</div>`:''}</header>`;
export const progress=(value,color='')=>`<div class="progress-track" role="progressbar" aria-label="Progress" aria-valuenow="${Math.round(value)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${Math.min(100,Math.max(0,value))}%;${color?`background:${color}`:''}"></span></div>`;
