// Service worker template. The build replaces "trip-shell-0.1.0-mubejakm" and ["./","./assets/index-DBndC8yA.js","./assets/maplibre-gl-BRtB0x-G.js","./assets/index-BrIBhjOc.css","./assets/maplibre-gl-worker-BrB-eljs.js","./manifest.webmanifest","./icon.svg"].
// - The page itself: network first, cached copy when offline (never stuck on an old build).
// - Built files: cache first (their names change when their content changes).
// - Anything from another origin (APIs, map tiles): not handled here.
// Trip data does not live in this cache; it is stored in IndexedDB by the app.

const CACHE = "trip-shell-0.1.0-mubejakm";
const PRECACHE = ["./","./assets/index-DBndC8yA.js","./assets/maplibre-gl-BRtB0x-G.js","./assets/index-BrIBhjOc.css","./assets/maplibre-gl-worker-BrB-eljs.js","./manifest.webmanifest","./icon.svg"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only a good page replaces the offline shell. A 404 or a 5xx served during a
          // deployment is still a response, and storing it would leave the offline app
          // showing the host's error page until the next successful online visit.
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put('./', copy));
          }
          return response;
        })
        .catch(() => caches.match('./', { ignoreVary: true })),
    );
    return;
  }

  // ignoreVary: the built files are served with `Vary: Origin`, and the module scripts are
  // requested with crossorigin=anonymous, so they carry an Origin header the precache
  // requests did not. Honouring Vary would miss every precached asset and the app would
  // not start offline at all.
  event.respondWith(
    caches.match(request, { ignoreVary: true }).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
