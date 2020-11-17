importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/English-Premiere-League/', revision: '1' },
    { url: '/English-Premiere-League/nav.html', revision: '1' },
    { url: '/English-Premiere-League/manifest.json', revision: '1' },
    { url: '/English-Premiere-League/index.html', revision: '1' },
    { url: '/English-Premiere-League/css/materialize.min.css', revision: '1' },
    { url: '/English-Premiere-League/fonts/font-awesome/css/font-awesome.min.css', revision: '1' },
    { url: '/English-Premiere-League/fonts/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0', revision: '1' },
    { url: '/English-Premiere-League/fonts/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0', revision: '1' },
    { url: '/English-Premiere-League/fonts/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0', revision: '1' },
    { url: '/English-Premiere-League/css/main.css', revision: '1' },
    { url: '/English-Premiere-League/js/jquery-3.2.1.min.js', revision: '1' },
    { url: '/English-Premiere-League/js/materialize.min.js', revision: '1' },
    { url: '/English-Premiere-League/js/api.js', revision: '1' },
    { url: '/English-Premiere-League/js/idb.js', revision: '1' },
    { url: '/English-Premiere-League/js/db.js', revision: '1' },
    { url: '/English-Premiere-League/js/nav.js', revision: '1' },
    { url: '/English-Premiere-League/icon/icon-32.png', revision: '1' },
    { url: '/English-Premiere-League/icon/icon-48.png', revision: '1' },
    { url: '/English-Premiere-League/icon/icon-96.png', revision: '1' },
    { url: '/English-Premiere-League/icon/icon-192.png', revision: '1' },
    { url: '/English-Premiere-League/icon/icon-512.png', revision: '1' },
    { url: '/English-Premiere-League/img/logo2.png', revision: '1' },
    { url: '/English-Premiere-League/img/loader.gif', revision: '1' },
    { url: '/English-Premiere-League/img/pl-footer-m-bottom.svg', revision: '1' },
    { url: '/English-Premiere-League/img/pl-footer-m-top.svg', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
    { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' }
]);

workbox.routing.registerRoute(
  new RegExp('/English-Premiere-League/pages/'),
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