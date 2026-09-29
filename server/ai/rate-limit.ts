import {and,eq,gte,inArray} from 'drizzle-orm';
import * as s from '../db/schema.ts';

/** Database-backed short-window guard shared by every player-facing AI action. */
export async function aiRequestIsLimited(db:any,playerId:string,now:Date,limit=10):Promise<boolean>{
 const cutoff=new Date(now.getTime()-60_000);
 const recent=await db.select({id:s.aiUsage.id}).from(s.aiUsage).where(and(eq(s.aiUsage.playerId,playerId),gte(s.aiUsage.createdAt,cutoff),inArray(s.aiUsage.purpose,['COMPANION','ROADMAP','ASSESSMENT'])));
 return recent.length>=limit;
}
