import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const staticRoot=path.join(root,'dist');
const port=Number(process.env.PORT||4173);
const apiPort=Number(process.env.API_PORT||4174);
if(!Number.isInteger(port)||port<1||port>65535||!Number.isInteger(apiPort)||apiPort<1||apiPort>65535)throw new Error('PORT and API_PORT must be valid TCP port numbers.');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
  if(new URL(req.url,'http://localhost').pathname.startsWith('/api/')){
    const upstream=http.request({hostname:'127.0.0.1',port:apiPort,path:req.url,method:req.method,headers:{...req.headers,host:`127.0.0.1:${apiPort}`}},response=>{
      res.writeHead(response.statusCode||502,response.headers);response.pipe(res);
    });
    upstream.on('error',()=>{if(!res.headersSent)res.writeHead(502,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:{code:'API_UNAVAILABLE',message:'The local API server is not running.'}}));});
    req.pipe(upstream);return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  try{
    const url=new URL(req.url,'http://localhost');const pathname=decodeURIComponent(url.pathname);
    if(pathname!=='/'&&pathname!=='/index.html'&&!/^\/assets\//.test(pathname)){res.writeHead(404);res.end('Not found');return;}
    const file=path.resolve(staticRoot,pathname==='/'?'index.html':'.'+pathname);
    if(!file.startsWith(staticRoot+path.sep)){res.writeHead(403);res.end();return;}
    if(!(await stat(file)).isFile())throw new Error('not a file');
    const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`LifeOS Grimoire is ready at http://localhost:${port}`));
server.on('error',err=>{console.error(err.message);process.exitCode=1;});
