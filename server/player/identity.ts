import {createHmac,randomBytes,timingSafeEqual} from 'node:crypto';

const ALPHABET='0123456789ABCDEFGHJKMNPQRSTVWXYZ';
export const PLAYER_CODE_LENGTH=10;
export const SESSION_COOKIE_NAME='lifeos_session';
export const SESSION_TTL_SECONDS=30*24*60*60;
const roles=new Set(['GUEST','USER','ADMIN','DEMO']);

export function normalizePlayerCode(value:string):string{
 return value.normalize('NFKC').toUpperCase().replace(/[\s-]/g,'');
}
export function isPlayerCode(value:string):boolean{
 const normalized=normalizePlayerCode(value);
 return normalized.length===PLAYER_CODE_LENGTH&&[...normalized].every(char=>ALPHABET.includes(char));
}
export function formatPlayerCode(value:string):string{
 const normalized=normalizePlayerCode(value);
 if(!isPlayerCode(normalized))throw new Error('Invalid Player Code.');
 return `${normalized.slice(0,4)}-${normalized.slice(4)}`;
}
export function generatePlayerCode(randomSource:(size:number)=>Buffer=randomBytes):string{
 const bytes=randomSource(PLAYER_CODE_LENGTH);
 return [...bytes].map(byte=>ALPHABET[byte&31]!).join('');
}
export function digestPlayerCode(value:string,pepper:string):string{
 const normalized=normalizePlayerCode(value);
 if(!isPlayerCode(normalized))throw new Error('Invalid Player Code.');
 return createHmac('sha256',pepper).update(normalized).digest('hex');
}
function sign(payload:string,secret:string):Buffer{return createHmac('sha256',secret).update(payload).digest();}
export type SessionIdentity={playerId:string;role:string;expiresAt:number};
export function createSessionToken(identity:{playerId:string;role:string},secret:string,now=new Date()):string{
 if(!roles.has(identity.role))throw new Error('Invalid player role.');
 const payload=Buffer.from(JSON.stringify({sub:identity.playerId,role:identity.role,exp:Math.floor(now.getTime()/1000)+SESSION_TTL_SECONDS})).toString('base64url');
 return `${payload}.${sign(payload,secret).toString('base64url')}`;
}
export function verifySessionToken(token:string|undefined,secret:string,now=new Date()):SessionIdentity|null{
 if(!token)return null;
 const pieces=token.split('.');if(pieces.length!==2)return null;
 const [payload,encodedSignature]=pieces;
 try{
  const supplied=Buffer.from(encodedSignature!,'base64url'),expected=sign(payload!,secret);
  if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected))return null;
  const value=JSON.parse(Buffer.from(payload!,'base64url').toString('utf8')) as Record<string,unknown>;
  if(typeof value.sub!=='string'||typeof value.role!=='string'||!roles.has(value.role)||typeof value.exp!=='number'||value.exp<=Math.floor(now.getTime()/1000))return null;
  return {playerId:value.sub,role:value.role,expiresAt:value.exp};
 }catch{return null;}
}
export function readSessionCookie(header:string|undefined):string|undefined{
 const prefix=`${SESSION_COOKIE_NAME}=`;
 return header?.split(';').map(part=>part.trim()).find(part=>part.startsWith(prefix))?.slice(prefix.length);
}
export function makeSessionCookie(token:string,{production=false}={}){
 return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${production?'; Secure':''}`;
}
