importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/fonts/font-awesome/css/font-awesome.min.css', revision: '1' },
    { url: '/fonts/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0', revision: '1' },
    { url: '/fonts/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0', revision: '1' },
    { url: '/fonts/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/js/jquery-3.2.1.min.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/icon/icon-32.png', revision: '1' },
    { url: '/icon/icon-48.png', revision: '1' },
    { url: '/icon/icon-96.png', revision: '1' },
    { url: '/icon/icon-192.png', revision: '1' },
    { url: '/icon/icon-512.png', revision: '1' },
    { url: '/img/logo2.png', revision: '1' },
    { url: '/img/loader.gif', revision: '1' },
    { url: '/img/pl-footer-m-bottom.svg', revision: '1' },
    { url: '/img/pl-footer-m-top.svg', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
    { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' }
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api'
    })
);