const CACHE_NAME = 'mahjong-app-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/reset.css',
  '/css/styles.css',
  '/js/app.js',
  '/js/tiles.js',
  '/js/tile-recognition-game.js',
  '/assets/images/correct.svg',
  '/assets/images/incorrect.svg',
  // Add all your tile image paths here
  '/assets/images/tiles/red-dragon.svg',
  '/assets/images/tiles/white-dragon.svg',
  '/assets/images/tiles/green-dragon.svg',
  '/assets/images/tiles/east-wind.svg',
  '/assets/images/tiles/west-wind.svg',
  '/assets/images/tiles/north-wind.svg',
  '/assets/images/tiles/south-wind.svg',
  '/assets/images/tiles/man-1.svg',
  '/assets/images/tiles/man-2.svg',
  '/assets/images/tiles/man-3.svg',
  '/assets/images/tiles/man-4.svg',
  '/assets/images/tiles/man-5.svg',
  '/assets/images/tiles/man-6.svg',
  '/assets/images/tiles/man-7.svg',
  '/assets/images/tiles/man-8.svg',
  '/assets/images/tiles/man-9.svg',
  // Icons
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/assets/icons/maskable-icon.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached asset if found
        if (response) {
          return response;
        }
        
        // Clone the request - a request is a stream and can only be consumed once
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response - a response is a stream and can only be consumed once
            const responseToCache = response.clone();
            
            // Open the cache and add the fetched resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // If both cache and network fail, you could return a fallback
            // return caches.match('/offline.html');
          });
      })
  );
});