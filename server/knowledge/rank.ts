const weights:Record<string,number>={UNSEEN:0,DISCOVERED:1,EXPLORING:2,UNDERSTANDING:4,APPLYING:7,MASTERED:10};
const known=new Set(Object.keys(weights));

export type DomainRankResult={rank:'Novice'|'Apprentice'|'Adept'|'Expert'|'Master';score:number;discoveredCount:number;understandingPlusCount:number;applyingPlusCount:number;masteredCount:number};

export function calculateDomainRank(levels:string[]):DomainRankResult{
 const safe=levels.filter(level=>known.has(level));
 const discovered=safe.filter(level=>level!=='UNSEEN');
 const understandingPlus=discovered.filter(level=>['UNDERSTANDING','APPLYING','MASTERED'].includes(level));
 const applyingPlus=discovered.filter(level=>['APPLYING','MASTERED'].includes(level));
 const mastered=discovered.filter(level=>level==='MASTERED');
 const score=discovered.length?discovered.reduce((sum,level)=>sum+weights[level]!,0)/(discovered.length*10):0;
 let rank:DomainRankResult['rank']='Novice';
 if(score>=0.82&&mastered.length>=5&&applyingPlus.length>=8)rank='Master';
 else if(score>=0.65&&applyingPlus.length>=4)rank='Expert';
 else if(score>=0.4&&understandingPlus.length>=5)rank='Adept';
 else if(score>=0.2&&discovered.length>=3)rank='Apprentice';
 return {rank,score,discoveredCount:discovered.length,understandingPlusCount:understandingPlus.length,applyingPlusCount:applyingPlus.length,masteredCount:mastered.length};
}
