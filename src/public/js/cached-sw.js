var cacheName = 'cachedSW';

self.addEventListener('fetch', (event) => {
  console.log('The FETCH event listener', event)
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        console.log('caches match then', response);
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((fetchResponse) => {
          console.log('fetched response')
          if (!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }

          var responseToCache = fetchResponse.clone();

          caches.open(cacheName)
            .then((cache) => {
              console.log('cache put');
              cache.put(event.request, responseToCache);
            });

          return fetchResponse;
        }
        );
      })
  );
});