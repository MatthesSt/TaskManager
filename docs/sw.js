if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let o = {};
    const c = e => i(e, t),
      l = { module: { uri: t }, exports: o, require: c };
    s[t] = Promise.all(n.map(e => l[e] || c(e))).then(e => (r(...e), o));
  };
}
define(['./workbox-3625d7b0'], function (e) {
  'use strict';
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'assets/index-30632ca0.css', revision: null },
        { url: 'assets/index-544f403e.js', revision: null },
        { url: 'index.html', revision: '261f68fcccf709a021502b0dba334279' },
        { url: 'registerSW.js', revision: '402b66900e731ca748771b6fc5e7a068' },
        { url: 'manifest.webmanifest', revision: '9492452851ac439944d2438114fce0cf' },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')));
});
