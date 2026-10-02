export class ApiError extends Error{
  constructor(message,{status=0,code='API_ERROR'}={}){super(message);this.name='ApiError';this.status=status;this.code=code;}
}

function isState(value){
  return Boolean(value&&typeof value==='object'&&value.profile&&Array.isArray(value.journeys)&&Array.isArray(value.quests)&&value.knowledge&&Array.isArray(value.knowledge.domains)&&Array.isArray(value.knowledge.concepts)&&value.progress&&typeof value.progress.totalXp==='number');
}

export async function getState({fetchImpl=globalThis.fetch}={}){
  let response;
  try{response=await fetchImpl('/api/state',{method:'GET',credentials:'same-origin',headers:{Accept:'application/json'}});}
  catch{throw new ApiError('The server could not be reached. Check your connection and try again.',{code:'NETWORK_ERROR'});}
  let body;
  try{body=await response.json();}
  catch{throw new ApiError('The server returned an unreadable response.',{status:response.status,code:'INVALID_RESPONSE'});}
  if(!response.ok){
    const code=typeof body?.error?.code==='string'?body.error.code:'API_ERROR';
    const message=typeof body?.error?.message==='string'?body.error.message:'The request could not be completed.';
    throw new ApiError(message,{status:response.status,code});
  }
  if(!isState(body))throw new ApiError('The server returned an incomplete player state.',{status:response.status,code:'INVALID_STATE'});
  return body;
}

async function mutate(path,method,{body,fetchImpl=globalThis.fetch}={}){
  let response;
  const headers={Accept:'application/json'};
  const options={method,credentials:'same-origin',headers};
  if(body!==undefined){headers['Content-Type']='application/json';options.body=JSON.stringify(body);}
  try{response=await fetchImpl(path,options);}
  catch{throw new ApiError('The server could not be reached. Check your connection and try again.',{code:'NETWORK_ERROR'});}
  let result;
  try{result=await response.json();}
  catch{throw new ApiError('The server returned an unreadable response.',{status:response.status,code:'INVALID_RESPONSE'});}
  if(!response.ok){
    const code=typeof result?.error?.code==='string'?result.error.code:'API_ERROR';
    const message=typeof result?.error?.message==='string'?result.error.message:'The request could not be completed.';
    throw new ApiError(message,{status:response.status,code});
  }
  return result;
}

const questPath=(id,action)=>`/api/quests/${encodeURIComponent(id)}/${action}`;
const transportOnly=options=>({fetchImpl:options?.fetchImpl});
export const createPlayer=options=>mutate('/api/player','POST',transportOnly(options));
export const logoutPlayer=options=>mutate('/api/player/logout','POST',transportOnly(options));
export const restorePlayer=(code,options)=>mutate('/api/player/restore','POST',{...transportOnly(options),body:{code}});
export const enterDemo=options=>mutate('/api/player/demo','POST',transportOnly(options));
export const getCurrentPlayer=options=>mutate('/api/player/me','GET',transportOnly(options));
export const startQuest=(id,options)=>mutate(questPath(id,'start'),'POST',transportOnly(options));
export const completeQuest=(id,options)=>mutate(questPath(id,'complete'),'POST',transportOnly(options));
export const skipQuest=(id,options)=>mutate(questPath(id,'skip'),'POST',transportOnly(options));
export const updateQuestStep=(questId,stepId,completed,options)=>mutate(`${questPath(questId,'steps')}/${encodeURIComponent(stepId)}`,'PATCH',{...options,body:{completed}});
export const updateQuestNote=(questId,content,options)=>mutate(questPath(questId,'note'),'PUT',{...options,body:{content}});

export const getJourneys=options=>mutate('/api/journeys','GET',transportOnly(options));
export const generateJourney=(input,options)=>mutate('/api/journeys/generate','POST',{...transportOnly(options),body:input});
export const generateAIJourney=(input,options)=>mutate('/api/journeys/generate-ai','POST',{...transportOnly(options),body:input});
export const getRoadmapAdvice=(input,options)=>mutate('/api/journeys/advice','POST',{...transportOnly(options),body:input});
export const createJourneyProposal=(journeyId,input,options)=>mutate(`/api/journeys/${encodeURIComponent(journeyId)}/proposals`,'POST',{...transportOnly(options),body:input});
export const acceptProposal=(proposalId,options)=>mutate(`/api/proposals/${encodeURIComponent(proposalId)}/accept`,'POST',transportOnly(options));
export const rejectProposal=(proposalId,options)=>mutate(`/api/proposals/${encodeURIComponent(proposalId)}/reject`,'POST',transportOnly(options));
export const finishJourney=(journeyId,options)=>mutate(`/api/journeys/${encodeURIComponent(journeyId)}/finish`,'POST',transportOnly(options));
export const archiveJourney=(journeyId,options)=>mutate(`/api/journeys/${encodeURIComponent(journeyId)}/archive`,'POST',transportOnly(options));

export async function streamCompanion(message,{signal,onToken=()=>{},fetchImpl=globalThis.fetch}={}){
 let response;try{response=await fetchImpl('/api/companion/chat',{method:'POST',credentials:'same-origin',headers:{Accept:'text/event-stream','Content-Type':'application/json'},body:JSON.stringify({message}),signal});}
 catch(error){if(signal?.aborted)throw error;throw new ApiError('The server could not be reached. Check your connection and try again.',{code:'NETWORK_ERROR'});}
 if(!response.ok){let body;try{body=await response.json();}catch{}throw new ApiError(body?.error?.message||'The Companion request could not be completed.',{status:response.status,code:body?.error?.code||'API_ERROR'});}
 if(!response.body)throw new ApiError('The server returned an empty stream.',{code:'INVALID_RESPONSE'});
 const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';
 try{while(true){const {done,value}=await reader.read();buffer+=decoder.decode(value,{stream:!done});const events=buffer.split(/\r?\n\r?\n/);buffer=events.pop()||'';for(const record of events){const type=record.match(/^event:\s*(\w+)/m)?.[1],data=record.split(/\r?\n/).find(line=>line.startsWith('data:'))?.slice(5).trim();if(!data)continue;let payload;try{payload=JSON.parse(data);}catch{throw new ApiError('The server sent an invalid stream event.',{code:'INVALID_RESPONSE'});}if(type==='token')onToken(payload.text||'');else if(type==='error')throw new ApiError(payload.message||'Arcana could not finish this reply.',{code:'AI_UNAVAILABLE'});else if(type==='aborted')return {stopped:true};else if(type==='done')return {stopped:false};}if(done)break;}}
 finally{reader.releaseLock();}
 return {stopped:false};
}
export const confirmMemory=(id,options)=>mutate(`/api/memories/${encodeURIComponent(id)}/confirm`,'POST',transportOnly(options));
export const dismissMemory=(id,options)=>mutate(`/api/memories/${encodeURIComponent(id)}/dismiss`,'POST',transportOnly(options));
export const createAssessment=(input,options)=>mutate('/api/assessments','POST',{...transportOnly(options),body:input});
export const submitAssessment=(id,input,options)=>mutate(`/api/assessments/${encodeURIComponent(id)}/submit`,'POST',{...transportOnly(options),body:input});
export const startNewConversation=options=>mutate('/api/companion/conversations/new','POST',transportOnly(options));
export const getInventory=options=>mutate('/api/inventory','GET',transportOnly(options));
export const unlockInventoryItem=(id,options)=>mutate(`/api/inventory/${encodeURIComponent(id)}/unlock`,'POST',transportOnly(options));
export const equipInventoryItem=(id,options)=>mutate(`/api/inventory/${encodeURIComponent(id)}/equip`,'POST',transportOnly(options));
export const getVapidPublicKey=options=>mutate('/api/notifications/vapid-public-key','GET',transportOnly(options));
export const savePushSubscription=(subscription,options)=>mutate('/api/notifications/subscription','POST',{...transportOnly(options),body:subscription});
export const deletePushSubscription=(endpoint,options)=>mutate('/api/notifications/subscription','DELETE',{...transportOnly(options),body:{endpoint}});
