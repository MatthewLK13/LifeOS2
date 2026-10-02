import {and,asc,desc,eq} from 'drizzle-orm';
import * as s from '../db/schema.ts';

export type LearnerEvidence={conceptName:string;masteryProbability:number;attempts:number;lastOutcome?:'CORRECT'|'INCORRECT'};
export type PreviousRoadmap={id:string;title:string;goal:string;chapters:Array<{title:string;quests:Array<{title:string;status:string;type:string;conceptNames:string[];task:string;questions:string[]}>}>};

function updateBkt(prior:LearnerEvidence|undefined,conceptName:string,correct:boolean):LearnerEvidence{
 const p=Math.max(.01,Math.min(.99,prior?.masteryProbability??.2)),learn=.2,guess=.2,slip=.1;
 const posterior=correct?(p*(1-slip))/(p*(1-slip)+(1-p)*guess):(p*slip)/(p*slip+(1-p)*(1-guess));
 return {conceptName:prior?.conceptName||conceptName,masteryProbability:Math.max(.01,Math.min(.99,posterior+(1-posterior)*learn)),attempts:(prior?.attempts||0)+1,lastOutcome:correct?'CORRECT':'INCORRECT'};
}

export async function loadAdaptationContext(db:any,playerId:string,previousJourneyId:string|undefined,clientEvidence:LearnerEvidence[]=[]){
 let previousRoadmap:PreviousRoadmap|undefined;
 if(previousJourneyId){
  const [journey]=await db.select().from(s.journeys).where(and(eq(s.journeys.id,previousJourneyId),eq(s.journeys.playerId,playerId))).limit(1);
  if(!journey||journey.templateKey==='__pending__')return null;
  const chapterRows=await db.select().from(s.chapters).where(eq(s.chapters.journeyId,previousJourneyId)).orderBy(asc(s.chapters.orderIndex));
  const questRows=await db.select().from(s.quests).where(and(eq(s.quests.journeyId,previousJourneyId),eq(s.quests.playerId,playerId))).orderBy(asc(s.quests.orderIndex));
  previousRoadmap={id:journey.id,title:journey.title,goal:journey.goal,chapters:chapterRows.slice(0,10).map((chapter:any)=>({title:chapter.title,quests:questRows.filter((quest:any)=>quest.chapterId===chapter.id).slice(0,4).map((quest:any)=>{const problem=quest.metadata?.learningPackage?.outcome?.problem;return {title:quest.title,status:quest.status,type:quest.type,conceptNames:Array.isArray(problem?.conceptNames)?problem.conceptNames.slice(0,6):[],task:String(problem?.task||quest.prompt||'').slice(0,400),questions:Array.isArray(problem?.questions)?problem.questions.slice(0,5).map((question:any)=>String(question.question||'').slice(0,300)):[]};})}))};
 }
 const rows=await db.select({structuredResult:s.assessmentAttempts.structuredResult}).from(s.assessmentAttempts).where(eq(s.assessmentAttempts.playerId,playerId)).orderBy(desc(s.assessmentAttempts.createdAt)).limit(500);
 const evidence=new Map<string,LearnerEvidence>();
 for(const row of rows.reverse())for(const item of Array.isArray(row.structuredResult?.evidence)?row.structuredResult.evidence:[]){
  if(typeof item?.conceptName!=='string'||typeof item?.correct!=='boolean')continue;
  const name=item.conceptName.trim().slice(0,120),key=name.toLowerCase();if(name.length<2)continue;
  evidence.set(key,updateBkt(evidence.get(key),name,item.correct));
 }
 for(const item of clientEvidence){const key=item.conceptName.trim().toLowerCase(),server=evidence.get(key);if(!server||item.attempts>server.attempts)evidence.set(key,item);}
 return {previousRoadmap,learnerEvidence:[...evidence.values()].sort((a,b)=>a.masteryProbability-b.masteryProbability).slice(0,80)};
}
