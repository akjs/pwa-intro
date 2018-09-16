
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  console.log('data ', event);

  const title = 'AkJS';
  const options = {
    body: event.data.text(),
    badge: '../images/icons/icon-152x152.png',
    icon: '../images/icons/icon-152x152.png',
    image: '../img/fire-ball.jpg'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

