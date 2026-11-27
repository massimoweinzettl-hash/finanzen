/* Finanzen – Service Worker (wie Trainingslog): macht die App offline nutzbar.
   index.html zuerst aus dem Netz (höchstens 2,5 s), sonst aus dem Cache; alles andere aus dem Cache, im Hintergrund aufgefrischt.
   Anfragen mit „fresh“ (Versionsprüfung) gehen direkt ans Netz. CACHE nur ändern, wenn sich FILES ändert – dann auch SWC/SWF in index.html. */
const CACHE = "finanzen-v1";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./inter.woff2", "./space-grotesk.woff2"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
const isPage = (req, url) => req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin || url.searchParams.has("fresh")) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; });
    if (isPage(req, url)) {
      const timeout = new Promise((r) => setTimeout(() => r(null), 2500));
      const net = await Promise.race([fresh.catch(() => null), timeout]);
      if (net && net.ok) return net;
      if (hit) { event.waitUntil(fresh.catch(() => {})); return hit; }
      return fresh;
    }
    if (hit) { event.waitUntil(fresh.catch(() => {})); return hit; }
    return fresh;
  })());
});
