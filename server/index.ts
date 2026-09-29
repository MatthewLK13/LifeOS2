import {serve} from '@hono/node-server';
import {createApp} from './app.ts';
import {appEnv} from './config/env.ts';
import {createConfiguredDatabase} from './db/client.ts';
const port=appEnv.API_PORT;
const runtime=appEnv.DATABASE_URL?createConfiguredDatabase():undefined;
const app=createApp({db:runtime?.db,env:appEnv});
serve({fetch:app.fetch,port,hostname:'127.0.0.1'},(info)=>console.log(`LifeOS API foundation listening on http://localhost:${info.port}/api`));
