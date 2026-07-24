const CACHE = 'vinculacion-mas-apps-v1';
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "img/appletv_app_s1.webp",
  "img/appletv_app_s2.webp",
  "img/appletv_app_s3.webp",
  "img/appletv_app_s4.webp",
  "img/appletv_app_s5.webp",
  "img/appletv_app_s6.webp",
  "img/appletv_app_s7.webp",
  "img/appletv_app_s8.webp",
  "img/appletv_app_s9.webp",
  "img/appletv_tv_s1.webp",
  "img/appletv_tv_s2.webp",
  "img/appletv_tv_s3.webp",
  "img/appletv_tv_s4.webp",
  "img/appletv_tv_s5.webp",
  "img/appletv_tv_s6.webp",
  "img/disney_app_s1.webp",
  "img/disney_app_s2.webp",
  "img/disney_app_s3.webp",
  "img/disney_app_s4.webp",
  "img/disney_app_s5.webp",
  "img/disney_app_s6.webp",
  "img/disney_app_s7.webp",
  "img/disney_app_s8.webp",
  "img/disney_app_s9.webp",
  "img/disney_tv_s1.webp",
  "img/disney_tv_s2.webp",
  "img/disney_tv_s3.webp",
  "img/disney_tv_s4.webp",
  "img/disney_tv_s5.webp",
  "img/disney_tv_s6.webp",
  "img/hbomax_app_s1.webp",
  "img/hbomax_app_s10.webp",
  "img/hbomax_app_s11.webp",
  "img/hbomax_app_s2.webp",
  "img/hbomax_app_s3.webp",
  "img/hbomax_app_s4.webp",
  "img/hbomax_app_s5.webp",
  "img/hbomax_app_s6.webp",
  "img/hbomax_app_s7.webp",
  "img/hbomax_app_s8.webp",
  "img/hbomax_app_s9.webp",
  "img/hbomax_tv_s1.webp",
  "img/hbomax_tv_s10.webp",
  "img/hbomax_tv_s2.webp",
  "img/hbomax_tv_s3.webp",
  "img/hbomax_tv_s4.webp",
  "img/hbomax_tv_s5.webp",
  "img/hbomax_tv_s6.webp",
  "img/hbomax_tv_s7.webp",
  "img/hbomax_tv_s8.webp",
  "img/hbomax_tv_s9.webp",
  "img/icon-180.png",
  "img/icon-192.png",
  "img/icon-32.png",
  "img/icon-512.png",
  "img/logo_appletv.webp",
  "img/logo_disney.webp",
  "img/logo_hbomax.webp",
  "img/logo_netflix.webp",
  "img/logo_universal.webp",
  "img/maskable-192.png",
  "img/maskable-512.png",
  "img/netflix_app_s1.webp",
  "img/netflix_app_s10.webp",
  "img/netflix_app_s2.webp",
  "img/netflix_app_s3.webp",
  "img/netflix_app_s4.webp",
  "img/netflix_app_s5.webp",
  "img/netflix_app_s6.webp",
  "img/netflix_app_s7.webp",
  "img/netflix_app_s8.webp",
  "img/netflix_app_s9.webp",
  "img/netflix_intro_s1.webp",
  "img/netflix_intro_s2.webp",
  "img/netflix_intro_s3.webp",
  "img/netflix_intro_s4.webp",
  "img/netflix_intro_s5.webp",
  "img/netflix_intro_s6.webp",
  "img/netflix_tv_s1.webp",
  "img/netflix_tv_s2.webp",
  "img/netflix_tv_s3.webp",
  "img/netflix_tv_s4.webp",
  "img/netflix_tv_s5.webp",
  "img/netflix_tv_s6.webp",
  "img/netflix_tv_s7.webp",
  "img/universal_app_s1.webp",
  "img/universal_app_s10.webp",
  "img/universal_app_s11.webp",
  "img/universal_app_s2.webp",
  "img/universal_app_s3.webp",
  "img/universal_app_s4.webp",
  "img/universal_app_s5.webp",
  "img/universal_app_s6.webp",
  "img/universal_app_s7.webp",
  "img/universal_app_s8.webp",
  "img/universal_app_s9.webp",
  "img/universal_tv_s1.webp",
  "img/wa_icon.webp"
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
