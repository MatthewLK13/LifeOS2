import {migrate} from 'drizzle-orm/neon-serverless/migrator';
import {createDevelopmentDatabase} from './client.ts';

const {db,pool}=createDevelopmentDatabase();
try{await migrate(db,{migrationsFolder:'server/db/migrations'});console.log('Development database migrations are up to date.');}
finally{await pool.end();}
