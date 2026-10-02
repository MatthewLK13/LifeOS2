import type {AIChunk,AIProvider,AIResult,ChatInput,StructuredRequest} from './provider.ts';

type GeminiOptions={apiKey?:string;primaryModel:string;backgroundModel:string;fetchImpl?:typeof fetch};
const API='https://generativelanguage.googleapis.com/v1beta/models';
function safeError(){return new Error('The AI provider could not complete this request.');}
function usageOf(metadata:any){const inputTokens=Number(metadata?.promptTokenCount)||0,outputTokens=Number(metadata?.candidatesTokenCount)||0;return inputTokens||outputTokens?{inputTokens,outputTokens}:undefined;}
function textOf(payload:any){return payload?.candidates?.[0]?.content?.parts?.map((part:any)=>typeof part.text==='string'?part.text:'').join('')||'';}
async function* sseEvents(body:ReadableStream<Uint8Array>,signal?:AbortSignal){
 const reader=body.getReader(),decoder=new TextDecoder();let buffer='';
 try{while(true){if(signal?.aborted)throw new DOMException('The operation was aborted.','AbortError');const {done,value}=await reader.read();buffer+=decoder.decode(value,{stream:!done});const records=buffer.split(/\r?\n\r?\n/);buffer=records.pop()||'';for(const record of records){const data=record.split(/\r?\n/).filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trim()).join('\n');if(data&&data!=='[DONE]'){try{yield JSON.parse(data);}catch{throw safeError();}}}if(done)break;}}
 finally{if(signal?.aborted)await reader.cancel().catch(()=>{});reader.releaseLock();}
}
export class GeminiProvider implements AIProvider{
 private readonly fetchImpl:typeof fetch;private readonly apiKey?:string;private readonly primaryModel:string;private readonly backgroundModel:string;
 constructor(options:GeminiOptions){this.fetchImpl=options.fetchImpl||fetch;this.apiKey=options.apiKey;this.primaryModel=options.primaryModel;this.backgroundModel=options.backgroundModel;}
 private async post(model:string,action:string,body:unknown,signal?:AbortSignal){if(!this.apiKey)throw new Error('The AI provider is not configured.');let response:Response;try{response=await this.fetchImpl(`${API}/${encodeURIComponent(model)}:${action}${action==='streamGenerateContent'?'?alt=sse':''}`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':this.apiKey},body:JSON.stringify(body),signal});}catch(error){if(signal?.aborted)throw error;throw safeError();}if(!response.ok){await response.body?.cancel().catch(()=>{});throw safeError();}return response;}
 async *streamChat(input:ChatInput,signal?:AbortSignal):AsyncIterable<AIChunk>{
  const contents=input.messages.map(message=>({role:message.role,parts:[{text:message.content}]}));
  const response=await this.post(this.primaryModel,'streamGenerateContent',{...(input.system?{systemInstruction:{parts:[{text:input.system}]}}:{}),contents,generationConfig:{maxOutputTokens:1200}},signal);if(!response.body)throw safeError();
  for await(const payload of sseEvents(response.body,signal)){const text=textOf(payload),usage=usageOf(payload.usageMetadata);if(text||usage)yield {text,...(usage?{usage}:{})};}
 }
 async generateStructured<T>(request:StructuredRequest,signal?:AbortSignal):Promise<AIResult<T>>{
  const prompt=`${request.prompt}\n\nReturn only JSON matching this schema:\n${JSON.stringify(request.schema)}`;
  const model=['ROADMAP','ASSESSMENT'].includes(request.purpose)?this.primaryModel:this.backgroundModel;
  const maxOutputTokens=request.purpose==='ROADMAP'?8000:1200;
  const response=await this.post(model,'generateContent',{contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{responseMimeType:'application/json',responseSchema:request.schema,maxOutputTokens}},signal);
  const payload=await response.json().catch(()=>null),text=textOf(payload);if(!text)throw safeError();let data:T;try{data=JSON.parse(text) as T;}catch{throw safeError();}
  return {data,model,...(usageOf(payload?.usageMetadata)?{usage:usageOf(payload.usageMetadata)}:{})};
 }
 summarize<T>(request:StructuredRequest,signal?:AbortSignal){return this.generateStructured<T>(request,signal);}
}
