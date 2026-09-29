export type AIMessage={role:'user'|'model';content:string};
export type AIUsage={inputTokens:number;outputTokens:number};
export type AIChunk={text:string;usage?:AIUsage};
export type ChatInput={system?:string;messages:AIMessage[]};
export type StructuredRequest={purpose:string;prompt:string;schema:Record<string,unknown>};
export type AIResult<T>={data:T;usage?:AIUsage;model:string};
export interface AIProvider {
 streamChat(input:ChatInput,signal?:AbortSignal):AsyncIterable<AIChunk>;
 generateStructured<T>(request:StructuredRequest,signal?:AbortSignal):Promise<AIResult<T>>;
 summarize<T>(request:StructuredRequest,signal?:AbortSignal):Promise<AIResult<T>>;
}
