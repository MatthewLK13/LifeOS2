// Drizzle Kit's bundled tsx requests OS account metadata when choosing a temp path.
// Some managed Windows sessions deny uv_os_get_passwd; provide local metadata there.
const os=require('node:os');
try{os.userInfo();}catch{
 os.userInfo=()=>({uid:-1,gid:-1,username:process.env.USERNAME||'lifeos',homedir:process.env.USERPROFILE||process.cwd(),shell:process.env.ComSpec||null});
 require('node:module').syncBuiltinESMExports();
}
require('../node_modules/drizzle-kit/bin.cjs');
