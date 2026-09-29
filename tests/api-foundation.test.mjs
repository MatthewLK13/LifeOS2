import test from 'node:test';
import assert from 'node:assert/strict';
import {app} from '../server/app.ts';
import {loadEnv,requireDatabaseConnection,requireDevelopmentDatabase} from '../server/config/env.ts';
test('API health and canonical catalog are available without a database or AI key',async()=>{
 const health=await app.request('/api/health');assert.equal(health.status,200);assert.equal((await health.json()).ok,true);
 const catalog=await app.request('/api/catalog');assert.equal(catalog.status,200);const data=await catalog.json();assert.equal(data.tracks.length,20);assert.equal(data.concepts.length,664);assert.equal(data.timezone,'Asia/Ho_Chi_Minh');
 assert.ok(data.concepts.every(concept=>!('evidence' in concept)));
});
test('identity endpoints fail closed until database and server secrets are configured',async()=>{
 const response=await app.request('/api/player',{method:'POST'});assert.equal(response.status,503);
 assert.equal((await response.json()).error.code,'IDENTITY_UNAVAILABLE');
});
test('API returns safe typed 404 and configuration never prints secret contents',async()=>{
 const missing=await app.request('/api/not-a-route');assert.equal(missing.status,404);assert.equal((await missing.json()).error.code,'NOT_FOUND');
 assert.equal(loadEnv({DATABASE_URL:'',SESSION_SECRET:'',PLAYER_CODE_PEPPER:''}).DATABASE_URL,undefined);
 assert.throws(()=>loadEnv({SESSION_SECRET:'secret-too-short'}),/SESSION_SECRET/);
 assert.throws(()=>requireDevelopmentDatabase({DATABASE_ENV:'development',DATABASE_URL:'postgres://x:y@wrong.example/db',NEON_DEV_DB_HOST:'dev.example'}),/does not match/);
 const production={NODE_ENV:'production',DATABASE_ENV:'production',DATABASE_URL:'postgres://x:y@prod.example/db',ALLOW_PRODUCTION_MIGRATIONS:'false'};
 assert.equal(requireDatabaseConnection(production).DATABASE_ENV,'production');
 assert.throws(()=>requireDevelopmentDatabase(production),/explicit/);
 const preview={NODE_ENV:'production',VERCEL_ENV:'preview',DATABASE_ENV:'development',DATABASE_URL:'postgres://x:y@dev.example/db',NEON_DEV_DB_HOST:'dev.example'};
 assert.equal(requireDatabaseConnection(preview).DATABASE_ENV,'development');
 assert.throws(()=>requireDatabaseConnection({...preview,VERCEL_ENV:'production'}),/production deployments/);
 assert.throws(()=>requireDatabaseConnection({...preview,DATABASE_ENV:'production',DATABASE_URL:'postgres://x:y@prod.example/db'}),/Preview deployments/);
 assert.throws(()=>requireDatabaseConnection({...preview,VERCEL_ENV:'development',DATABASE_ENV:'production',DATABASE_URL:'postgres://x:y@prod.example/db'}),/cannot target the production database/);
 assert.throws(()=>requireDatabaseConnection({NODE_ENV:'production',DATABASE_ENV:'development',DATABASE_URL:'postgres://x:y@dev.example/db',NEON_DEV_DB_HOST:'dev.example'}),/must match/);
 assert.throws(()=>requireDevelopmentDatabase({DATABASE_ENV:'test',DATABASE_URL:'postgres://x:y@prod.example/db'}),/separate test host guard/);
 assert.equal(loadEnv({API_PORT:'4175'}).API_PORT,4175);
 assert.throws(()=>loadEnv({API_PORT:'70000'}),/API_PORT/);
});
