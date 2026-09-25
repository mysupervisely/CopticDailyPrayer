const fs = require('fs');
const path = require('path');

const root = __dirname;
const out = path.join(root, 'www');
const excluded = new Set(['www','ios','android','node_modules','.git','.github','docs']);
const allowed = new Set(['.html','.css','.js','.json','.svg','.png','.jpg','.jpeg','.webp','.webmanifest','.ico']);

fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

for(const entry of fs.readdirSync(root,{withFileTypes:true})){
  if(excluded.has(entry.name) || entry.isDirectory()) continue;
  const ext = path.extname(entry.name).toLowerCase();
  if(!allowed.has(ext) && entry.name !== 'manifest.webmanifest') continue;
  fs.copyFileSync(path.join(root,entry.name),path.join(out,entry.name));
}
console.log('Prepared native web assets in www/');
