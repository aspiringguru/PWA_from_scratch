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
    console.log("service worker : self.addEventListener - fetch")
});
