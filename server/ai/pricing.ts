// Update model pricing here when Google's published rates change.
export const MODEL_PRICING_USD_PER_MILLION:Record<string,{input:number;output:number}>={
 'gemini-3.8-flash':{input:0.75,output:3.75},
 'gemini-3.5-flash-lite':{input:0.30,output:2.50}
};
export function estimateCostMicros(model:string,inputTokens:number,outputTokens:number){
 const price=MODEL_PRICING_USD_PER_MILLION[model]||MODEL_PRICING_USD_PER_MILLION['gemini-3.8-flash']!;
 return Math.ceil((inputTokens*price.input+outputTokens*price.output));
}
export function budgetWeekStart(now:Date,timezone:string){
 const formatter=new Intl.DateTimeFormat('en-US',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}),parts=formatter.formatToParts(now),part=(key:string)=>parts.find(item=>item.type===key)?.value||'',year=Number(part('year')),month=Number(part('month')),day=Number(part('day')),weekday=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(part('weekday')),localMonday=Date.UTC(year,month-1,day-((weekday+6)%7)),probe=new Date(localMonday),offsetParts=formatter.formatToParts(probe),get=(key:string)=>Number(offsetParts.find(item=>item.type===key)?.value||0),asUtc=Date.UTC(get('year'),get('month')-1,get('day'),get('hour'),get('minute')),offset=asUtc-localMonday;
 return new Date(localMonday-offset);
}
