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
const nativeApiOrigin = String(process.env.COPTIC_NATIVE_API_ORIGIN || '').replace(/\/$/,'');
if(!nativeApiOrigin){
  throw new Error('COPTIC_NATIVE_API_ORIGIN is required for native packaging. Use the permanent HTTPS production API origin.');
}
let parsedNativeApiOrigin;
try {
  parsedNativeApiOrigin = new URL(nativeApiOrigin);
} catch (e) {
  throw new Error('COPTIC_NATIVE_API_ORIGIN must be a valid absolute HTTPS URL.');
}
if(parsedNativeApiOrigin.protocol !== 'https:' || parsedNativeApiOrigin.origin !== nativeApiOrigin){
  throw new Error('COPTIC_NATIVE_API_ORIGIN must be an HTTPS origin with no path, query, or fragment.');
}
if(/vercel\.app$/i.test(parsedNativeApiOrigin.hostname)){
  throw new Error('COPTIC_NATIVE_API_ORIGIN must use the permanent production domain, not a Vercel preview URL.');
}
nativeIndex = nativeIndex.replace('</head>', '<script>window.COPTIC_API_ORIGIN='+JSON.stringify(nativeApiOrigin)+'</script></head>');
fs.writeFileSync(nativeIndexPath,nativeIndex);

const activeChurchClients = ['home-native.js','calendar-native.js','readings-native.js'];
for(const name of activeChurchClients){
  const file = path.join(out,name);
  if(!fs.existsSync(file)) throw new Error('Missing native Church-data client: '+name);
  const source = fs.readFileSync(file,'utf8');
  if(!source.includes("window.COPTIC_API_ORIGIN||''")){
    throw new Error(name+' does not use the configurable Church API origin');
  }
  if(source.includes("fetch('/api/church")){
    throw new Error(name+' still contains a hard-coded same-origin Church API request');
  }
}

console.log('Prepared native web assets in www/ with app.html as index.html and native API origin');
