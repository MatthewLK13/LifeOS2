import {createDevelopmentDatabase} from './client.ts';
import {seedDatabase} from './seed.ts';
import {loadEnv} from '../config/env.ts';
const env=loadEnv();
if(!env.PLAYER_CODE_PEPPER)throw new Error('Seeding requires PLAYER_CODE_PEPPER in the server environment.');
const {db,pool}=createDevelopmentDatabase();
try{console.log('Seed complete:',await seedDatabase(db,{codePepper:env.PLAYER_CODE_PEPPER}));}
finally{await pool.end();}
