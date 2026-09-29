import {Pool,neonConfig} from '@neondatabase/serverless';
import ws from 'ws';
import {drizzle, type NeonDatabase} from 'drizzle-orm/neon-serverless';
import * as schema from './schema.ts';
import {requireDatabaseConnection,requireDevelopmentDatabase} from '../config/env.ts';

export function createDatabase(databaseUrl:string){
 neonConfig.webSocketConstructor=ws;
 const pool=new Pool({connectionString:databaseUrl,max:1,connectionTimeoutMillis:8000,idleTimeoutMillis:1000});
 return {pool,db:drizzle({client:pool,schema})};
}
export type Database=NeonDatabase<typeof schema>;
export function createConfiguredDatabase(){return createDatabase(requireDatabaseConnection().DATABASE_URL!);}
export function createDevelopmentDatabase(){return createDatabase(requireDevelopmentDatabase().DATABASE_URL!);}
