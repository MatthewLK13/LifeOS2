import * as api from './api-client.js';
import {toViewState} from './server-state.js';

const recoverable=new Set(['NETWORK_ERROR','IDENTITY_UNAVAILABLE','STATE_UNAVAILABLE','API_UNAVAILABLE','INVALID_RESPONSE']);

export async function loadPlayerState(options={}){
 const client=options.api??(options.getCurrentPlayer?options:api);
 const offlineState=options.offlineState;
 try{
  let identity;
  try{identity=await client.getCurrentPlayer();}
  catch(error){
   if(error?.code!=='SESSION_REQUIRED')throw error;
   identity=await client.createPlayer();
  }
  const state=await client.getState();
  return {mode:'server',identity,playerCode:identity.isNew?identity.playerCode:null,state:toViewState(state)};
 }catch(error){
  if(recoverable.has(error?.code)||error?.status>=500)return {mode:'offline',state:offlineState,error};
  throw error;
 }
}
