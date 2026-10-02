import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
execFileSync(process.execPath,['node_modules/typescript/bin/tsc','--noEmit'],{cwd:root,stdio:'inherit'});
for(const file of ['app','pages','companion','graph','ui','data','state','curriculum','breadth','pathways'])execFileSync(process.execPath,['--check',path.join(root,'src',`${file}.js`)],{cwd:root,stdio:'inherit'});
execFileSync(process.execPath,['node_modules/vite/bin/vite.js','build'],{cwd:root,stdio:'inherit'});
console.log('Build complete: dist/ · React demo built with Vite.');
