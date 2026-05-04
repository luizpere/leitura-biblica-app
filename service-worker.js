const CACHE_NAME = 'leitura-biblica-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // Ignorar Firebase/API para não cachear dados dinâmicos ou tokens
  if (e.request.url.includes('firebase') || e.request.url.includes('firestore') || e.request.url.includes('googleapis')) {
    return fetch(e.request);
  }
  // Estratégia: Rede primeiro, cache como fallback
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});