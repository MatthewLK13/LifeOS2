import {and,eq,sql} from 'drizzle-orm';
import {z} from 'zod';
import * as s from '../db/schema.ts';
import {recordKnowledgeSignal} from '../knowledge/service.ts';
import type {AIProvider,AIResult} from './provider.ts';

export const LearningAnalysisSchema=z.object({
 signals:z.array(z.object({conceptName:z.string().trim().min(1).max(120),suggestedDomainName:z.string().trim().min(1).max(120).optional(),signalType:z.enum(['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']),confidence:z.number().min(0).max(1),reasonShort:z.string().max(240)}).strict()).max(12),
 memoryCandidates:z.array(z.object({text:z.string().trim().min(1).max(240),confidence:z.number().min(0).max(1)}).strict()).max(3)
}).strict();
export type LearningAnalysis=z.infer<typeof LearningAnalysisSchema>;
const schemaJson={type:'OBJECT',properties:{signals:{type:'ARRAY',maxItems:12,items:{type:'OBJECT',properties:{conceptName:{type:'STRING'},suggestedDomainName:{type:'STRING'},signalType:{type:'STRING',enum:['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']},confidence:{type:'NUMBER'},reasonShort:{type:'STRING'}},required:['conceptName','signalType','confidence','reasonShort'],propertyOrdering:['conceptName','suggestedDomainName','signalType','confidence','reasonShort']}},memoryCandidates:{type:'ARRAY',maxItems:3,items:{type:'OBJECT',properties:{text:{type:'STRING'},confidence:{type:'NUMBER'}},required:['text','confidence'],propertyOrdering:['text','confidence']}}},required:['signals','memoryCandidates'],propertyOrdering:['signals','memoryCandidates']};
const trivial=/^(hi|hello|hey|thanks?|thank you|ok(?:ay)?|got it|cool|go to (today|roadmap|knowledge|settings)|open (today|roadmap|knowledge|settings)|start over)[.!\s]*$/i;
const meaningful=/(\b(explain|why|how|compare|difference|implement|debug|because|therefore|my approach|i think|trade[- ]?off|analyze|analyse|solve|design|code|error|concept|understand|learn|built|project|answer)\b|[?`{};]|\bclass\s+\w+|\bfunction\s+\w+)/i;
export function shouldAnalyzeLearningMessage(value:string){const text=value.trim();if(!text||text.length<25||trivial.test(text))return false;return meaningful.test(text);}

export async function analyzeLearningTurn(provider:AIProvider,input:{userMessage:string;assistantMessage:string},signal?:AbortSignal):Promise<LearningAnalysis&{usage?:AIResult<LearningAnalysis>['usage'];model?:string}>{
 const result=await provider.generateStructured<unknown>({purpose:'KNOWLEDGE_ANALYSIS',schema:schemaJson,prompt:`Analyze this learning exchange. Return only supported observations. A signal must reflect the player's demonstrated learning, not the assistant's explanation. Use only DISCOVERY, EXPLORATION, UNDERSTANDING, or APPLICATION; never assign a level. Use confidence from 0 to 1. Do not invent knowledge. Suggest at most three durable, useful memories only for an explicit learning goal, learning preference, schedule constraint, background, or long-running project. Never suggest sensitive or incidental details.\n\nPLAYER MESSAGE:\n${input.userMessage}\n\nASSISTANT RESPONSE:\n${input.assistantMessage}`},signal);
 const parsed=LearningAnalysisSchema.safeParse(result.data);if(!parsed.success)throw new Error('The learning analyzer returned invalid structured data.');
 return {...parsed.data,...(result.usage?{usage:result.usage}:{}),model:result.model};
}

export async function persistLearningAnalysis(db:any,input:{playerId:string;conversationId:string;sourceId:string;analysis:LearningAnalysis;now?:Date}){
 const now=input.now??new Date(),results=[];
 for(const signal of input.analysis.signals){if(signal.confidence<.55)continue;results.push(await recordKnowledgeSignal(db,input.playerId,signal,{sourceType:'CHAT',sourceId:input.sourceId,conversationId:input.conversationId,now}));}
 const memories=[];
 for(const candidate of input.analysis.memoryCandidates){if(candidate.confidence<.7)continue;const normalized=candidate.text.normalize('NFKC').trim().toLocaleLowerCase();const [existing]=await db.select({id:s.memories.id}).from(s.memories).where(and(eq(s.memories.playerId,input.playerId),sql`lower(${s.memories.text}) = ${normalized}`,sql`${s.memories.status} IN ('PENDING','CONFIRMED')`)).limit(1);if(existing)continue;
  const [created]=await db.insert(s.memories).values({playerId:input.playerId,text:candidate.text,status:'PENDING',sourceConversationId:input.conversationId,createdAt:now}).returning({id:s.memories.id,text:s.memories.text});if(created)memories.push(created);
 }
 return {signals:results,memoryCandidates:memories};
}
