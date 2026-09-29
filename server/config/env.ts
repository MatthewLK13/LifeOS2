import 'dotenv/config';
import {z} from 'zod';

const envSchema=z.object({
 NODE_ENV:z.enum(['development','test','production']).default('development'),
 VERCEL_ENV:z.enum(['development','preview','production']).optional(),
 DATABASE_ENV:z.enum(['development','test','production']).optional(),
 DATABASE_URL:z.preprocess(value=>value===''?undefined:value,z.string().url().optional()),
 NEON_DEV_DB_HOST:z.string().min(1).optional(),
 ALLOW_PRODUCTION_MIGRATIONS:z.enum(['true','false']).default('false'),
 SESSION_SECRET:z.preprocess(value=>value===''?undefined:value,z.string().min(32).optional()),PLAYER_CODE_PEPPER:z.preprocess(value=>value===''?undefined:value,z.string().min(32).optional()),
 GEMINI_API_KEY:z.preprocess(value=>value===''?undefined:value,z.string().min(1).optional()),AI_PRIMARY_MODEL:z.string().default('gemini-3.8-flash'),AI_BACKGROUND_MODEL:z.string().default('gemini-3.5-flash-lite'),
 GLOBAL_AI_WEEKLY_BUDGET_USD:z.coerce.number().positive().default(2),PLAYER_AI_WEEKLY_TOKEN_LIMIT:z.coerce.number().int().positive().default(250000),DEMO_AI_WEEKLY_TOKEN_LIMIT:z.coerce.number().int().positive().default(500000),
 MAX_PASTE_BYTES:z.coerce.number().int().positive().default(204800),FULL_SESSION_RETENTION:z.coerce.number().int().positive().default(5),SUMMARY_RETENTION:z.coerce.number().int().positive().default(20),
 ADMIN_SECRET:z.preprocess(value=>value===''?undefined:value,z.string().min(32).optional()),CRON_SECRET:z.preprocess(value=>value===''?undefined:value,z.string().min(24).optional()),VAPID_PUBLIC_KEY:z.preprocess(value=>value===''?undefined:value,z.string().optional()),VAPID_PRIVATE_KEY:z.preprocess(value=>value===''?undefined:value,z.string().optional()),VAPID_SUBJECT:z.string().default('mailto:replace@example.com'),
 APP_BASE_URL:z.string().url().default('http://localhost:4173'),APP_TIMEZONE:z.string().default('Asia/Ho_Chi_Minh'),PORT:z.coerce.number().int().min(1).max(65535).default(4173),API_PORT:z.coerce.number().int().min(1).max(65535).default(4174)
}).superRefine((value,ctx)=>{
 if(value.VAPID_PUBLIC_KEY&&!value.VAPID_PRIVATE_KEY||value.VAPID_PRIVATE_KEY&&!value.VAPID_PUBLIC_KEY)ctx.addIssue({code:'custom',path:['VAPID_PUBLIC_KEY'],message:'Configure both VAPID keys together.'});
});
export type AppEnv=z.infer<typeof envSchema>;
export function loadEnv(source:NodeJS.ProcessEnv=process.env):AppEnv{
 const result=envSchema.safeParse(source);
 if(!result.success)throw new Error(`Invalid server configuration: ${result.error.issues.map(issue=>`${issue.path.join('.')}: ${issue.message}`).join('; ')}`);
 return result.data;
}
export function requireDatabaseConnection(source:NodeJS.ProcessEnv=process.env){
 const env=loadEnv(source);
 if(!env.DATABASE_URL||!env.DATABASE_ENV)throw new Error('Database access requires DATABASE_URL and DATABASE_ENV.');
 if(env.DATABASE_ENV==='test')throw new Error('Database access cannot target DATABASE_ENV=test until a separate test host guard is configured.');
 // Vercel sets NODE_ENV=production for Preview builds too, so use its explicit
 // deployment target when available and keep NODE_ENV as the local fallback.
 if(env.VERCEL_ENV==='production'&&env.DATABASE_ENV!=='production')throw new Error('Vercel production deployments must target the production database.');
 if(env.VERCEL_ENV==='preview'&&env.DATABASE_ENV!=='development')throw new Error('Vercel Preview deployments must target the development database.');
 if(env.VERCEL_ENV==='development'&&env.DATABASE_ENV==='production')throw new Error('Vercel development deployments cannot target the production database.');
 if(env.VERCEL_ENV&&env.VERCEL_ENV!=='production'&&env.DATABASE_ENV==='production')throw new Error('Non-production Vercel deployments cannot target the production database.');
 if(!env.VERCEL_ENV&&env.NODE_ENV==='production'&&env.DATABASE_ENV!=='production')throw new Error('Production runtime and database environments must match.');
 if(env.DATABASE_ENV==='development'){
  if(!env.NEON_DEV_DB_HOST)throw new Error('Development database access requires NEON_DEV_DB_HOST as a safety check.');
  const actual=new URL(env.DATABASE_URL).hostname.toLowerCase();
  if(actual!==env.NEON_DEV_DB_HOST.toLowerCase())throw new Error(`Database host does not match NEON_DEV_DB_HOST (actual: ${actual}).`);
 }
 return env;
}
export function requireDevelopmentDatabase(source:NodeJS.ProcessEnv=process.env){
 const env=requireDatabaseConnection(source);
 if(env.DATABASE_ENV==='production'&&env.ALLOW_PRODUCTION_MIGRATIONS!=='true')throw new Error('Production database changes require explicit ALLOW_PRODUCTION_MIGRATIONS=true.');
 return env;
}
export const appEnv=loadEnv();
