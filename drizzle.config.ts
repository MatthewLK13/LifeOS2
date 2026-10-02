import {defineConfig} from 'drizzle-kit';
import {requireDevelopmentDatabase} from './server/config/env.ts';
const env=requireDevelopmentDatabase();
export default defineConfig({dialect:'postgresql',schema:'./server/db/schema.ts',out:'./server/db/migrations',dbCredentials:{url:env.DATABASE_URL!},strict:true,verbose:true});
