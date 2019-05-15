/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.2.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.2.0"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "data/spacex.json",
    "revision": "2150fc7de9da187b7b557ec2e32a8ed6"
  },
  {
    "url": "index.html",
    "revision": "66775fd7b215ef492eb3a56f6e543280"
  },
  {
    "url": "js/app.js",
    "revision": "568b69a7e4e0c4fb0bf944bf91ebbcc0"
  },
  {
    "url": "js/component/card/card.css",
    "revision": "b03c1da829f0d2a547c180867fb67c47"
  },
  {
    "url": "js/component/card/card.js",
    "revision": "a9ad26cc0dd1c360161aee6f2e1163e2"
  },
  {
    "url": "package-lock.json",
    "revision": "434530360aeab1483b153b4cc55a6838"
  },
  {
    "url": "package.json",
    "revision": "951d50fab50255c779b55d226e4d1419"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/.(?:jpg|jpeg)$/", new workbox.strategies.CacheFirst(), 'GET');
