export const DAILY_XP_CAP=120;
export const DEFAULT_TIMEZONE='Asia/Ho_Chi_Minh';
export const levelForXp=(xp:number)=>1+Math.floor(xp/100);
export function localDateAt(now:Date,timeZone=DEFAULT_TIMEZONE):string{
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part=(type:Intl.DateTimeFormatPartTypes)=>parts.find(x=>x.type===type)?.value;
 const y=part('year'),m=part('month'),d=part('day');
 if(!y||!m||!d)throw new Error(`Could not calculate local date for timezone ${timeZone}.`);
 return `${y}-${m}-${d}`;
}
export function previousLocalDate(date:string):string{
 const parts=/^(\d{4})-(\d{2})-(\d{2})$/.exec(date);if(!parts)throw new Error('Expected a local date in YYYY-MM-DD format.');
 const value=new Date(Date.UTC(Number(parts[1]),Number(parts[2])-1,Number(parts[3])-1));
 return `${value.getUTCFullYear()}-${String(value.getUTCMonth()+1).padStart(2,'0')}-${String(value.getUTCDate()).padStart(2,'0')}`;
}
