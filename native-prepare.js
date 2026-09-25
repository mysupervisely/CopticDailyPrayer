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

// Capacitor always launches webDir/index.html. The maintained application shell is
// app.html, while the repository's legacy index.html is not the native entry point.
fs.copyFileSync(path.join(root,'app.html'),path.join(out,'index.html'));

// Fail the native build early if the packaged entry point drifts away from the
// current application shell.
const nativeIndexPath = path.join(out,'index.html');
let nativeIndex = fs.readFileSync(nativeIndexPath,'utf8');
if(!nativeIndex.includes('id="home"') || !nativeIndex.includes('prayer-life-native.js')){
  throw new Error('Native entry point was not prepared from app.html');
}

// The web deployment can use same-origin /api routes. A bundled Capacitor app
// has no Vercel functions at its local origin, so point Church-data requests
// at the production HTTPS deployment when packaging the native shell.
const nativeApiOrigin = process.env.COPTIC_NATIVE_API_ORIGIN || 'https://coptic-daily-prayer-git-chatgpt-mobile-pr-7e1823-my-supervisely.vercel.app';
nativeIndex = nativeIndex.replace('</head>', '<script>window.COPTIC_API_ORIGIN='+JSON.stringify(nativeApiOrigin)+'</script></head>');
fs.writeFileSync(nativeIndexPath,nativeIndex);

for(const name of ['app-shell.js','home-native.js','calendar-native.js','calendar-shell.js','readings-native.js','readings-shell.js']){
  const file = path.join(out,name);
  if(!fs.existsSync(file)) continue;
  let source = fs.readFileSync(file,'utf8');
  source = source.replace(/fetch\('\/api\/church/g, "fetch((window.COPTIC_API_ORIGIN||'')+'/api/church");
  fs.writeFileSync(file,source);
}

console.log('Prepared native web assets in www/ with app.html as index.html and native API origin');
