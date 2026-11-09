const C='jimena-v8';
const CORE=['./','./index.html','./manifest.webmanifest','./logo-j.svg','./icon-j-192.png','./icon-j-512.png','./icon-j-180.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return;
 const nav=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
 const req=nav?fetch(u.origin+u.pathname,{cache:'no-cache'}):fetch(e.request);
 e.respondWith(req.then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(nav?u.origin+u.pathname:e.request,cp))}return r}).catch(()=>caches.match(nav?u.origin+u.pathname:e.request,{ignoreSearch:true})))});
