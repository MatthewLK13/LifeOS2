import {handle} from 'hono/vercel';
import {createApp} from '../server/app.ts';
import {appEnv} from '../server/config/env.ts';
import {createConfiguredDatabase} from '../server/db/client.ts';
const runtime=appEnv.DATABASE_URL?createConfiguredDatabase():undefined;
const app=createApp({db:runtime?.db,env:appEnv,trustVercelProxy:true});
export default handle(app);
