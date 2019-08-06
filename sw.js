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
    const url = new URL(request.url);
    if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});


async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}

async function networkFirst(request) {
    console.log("async function networkFirst(request)")
    const dynamicCache = await caches.open('news-dynamic');
    try {
        const networkResponse = await fetch(request);
        dynamicCache.put(request, networkResponse.clone());
        console.log("async function networkFirst returning networkResponse");
        return networkResponse;
    } catch (err) {
        const cachedResponse = await dynamicCache.match(request);
        console.log("async function networkFirst returning cachedResponse");
        return await cachedResponse;
    }
}
