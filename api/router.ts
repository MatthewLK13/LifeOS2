import {handle} from 'hono/vercel';
import {createApp} from '../server/app.ts';
import {appEnv} from '../server/config/env.ts';
import {createConfiguredDatabase} from '../server/db/client.ts';

const runtime=appEnv.DATABASE_URL?createConfiguredDatabase():undefined;
const app=createApp({db:runtime?.db,env:appEnv,trustVercelProxy:true});
const baseHandler=handle(app);

function routed(handler:typeof baseHandler){
 return (req:Request)=>{
  const url=new URL(req.url);
  const path=url.searchParams.get('__path');
  let nextRequest=req;
  if(path){
   url.searchParams.delete('__path');
   const target=new URL(path,'https://vercel.local');
   for(const [key,value] of url.searchParams)target.searchParams.append(key,value);
   nextRequest=new Request(target,req);
  }
  return handler(nextRequest);
 };
}

export const GET=routed(baseHandler);
export const POST=routed(baseHandler);
export const PUT=routed(baseHandler);
export const PATCH=routed(baseHandler);
export const DELETE=routed(baseHandler);
export const OPTIONS=routed(baseHandler);
