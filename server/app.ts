import {Hono} from 'hono';
import {TRACKS} from '../shared/catalog/tracks.mjs';
import {CONCEPTS} from '../shared/catalog/concepts.mjs';
import {appEnv} from './config/env.ts';
import {createPlayerRoutes} from './player/routes.ts';
import {createStateRoutes} from './state/routes.ts';
import {createQuestRoutes} from './quests/routes.ts';
import {createJourneyRoutes} from './journeys/routes.ts';
import {createAIChatRoutes} from './ai/routes.ts';
import {GeminiProvider} from './ai/gemini.ts';
import type {AIProvider} from './ai/provider.ts';
import {createMemoryRoutes} from './memory/routes.ts';
import {createAssessmentRoutes} from './assessments/routes.ts';
import {createProgressionRoutes} from './progression/routes.ts';
import {createNotificationRoutes} from './notifications/routes.ts';
import {createAdminRoutes} from './admin/routes.ts';

type AppOptions={db?:any;env?:typeof appEnv;now?:()=>Date;clientIp?:(headers:Headers)=>string;trustVercelProxy?:boolean;aiProvider?:AIProvider;notificationPushSender?:(subscription:any,payload:string)=>Promise<unknown>};
export function createApp({db,env=appEnv,now,clientIp,trustVercelProxy,aiProvider,notificationPushSender}:AppOptions={}){
 const app=new Hono().basePath('/api');
 app.get('/health',(c)=>c.json({ok:true,service:'lifeos-api',phase:db?'aggregate-state':'database-foundation'}));
 app.get('/catalog',(c)=>c.json({tracks:TRACKS.map(({modules,...track})=>({...track,modules})),concepts:CONCEPTS.map(({evidence,...concept})=>concept),timezone:env.APP_TIMEZONE}));
 app.route('/',createPlayerRoutes({db,env,now,clientIp,trustVercelProxy}));
 app.route('/',createStateRoutes({db,env,now}));
 app.route('/',createQuestRoutes({db,env,now}));
 const provider=aiProvider||(env.GEMINI_API_KEY?new GeminiProvider({apiKey:env.GEMINI_API_KEY,primaryModel:env.AI_PRIMARY_MODEL,backgroundModel:env.AI_BACKGROUND_MODEL}):undefined);
 app.route('/',createJourneyRoutes({db,env,now,provider}));
 app.route('/',createAIChatRoutes({db,env,now,provider}));
 app.route('/',createMemoryRoutes({db,env,now}));
 app.route('/',createAssessmentRoutes({db,env,now,provider}));
 app.route('/',createProgressionRoutes({db,env,now}));
 app.route('/',createNotificationRoutes({db,env,now,pushSender:notificationPushSender}));
 app.route('/',createAdminRoutes({db,env,now}));
 app.notFound((c)=>c.json({error:{code:'NOT_FOUND',message:'No API route matches this request.'}},404));
 app.onError((error,c)=>{
  console.error('LifeOS API request failed:',error.message);
  return c.json({error:{code:'INTERNAL_ERROR',message:'The request could not be completed.'}},500);
 });
 return app;
}
export const app=createApp();
