const staticAssets = [
  './',
  './app.js',
  './styles.css'
];

self.addEventListener('install', async event => {
    console.log("service worker : self.addEventListener - install");
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    console.log("service worker : self.addEventListener - fetch");
    const request = event.request;
    event.respondWith(cacheFirst(request));
});


async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
