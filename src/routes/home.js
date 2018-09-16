const path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: {
        file: 'offline.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/notify',
    config: {
      handler: {
        file: 'notify.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/about',
    config: {
      handler: {
        file: 'about.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/manifest.json',
    config: {
      handler: {
        file: 'manifest.json'
      }
    }
  },
  {
    method: 'GET',
    path: '/cache-worker.js',
    config: {
      handler: {
        file: 'js/cache-worker2.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/client.js',
    config: {
      handler: {
        file: 'js/client.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/cache-client.js',
    config: {
      handler: {
        file: 'js/cache-client.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/cached-sw.js',
    config: {
      handler: {
        file: 'js/cached-sw.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/notification-worker.js',
    config: {
      handler: {
        file: 'js/notification-worker.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: '../public/',
        redirectToSlash: true,
        index: true,
      }
    }
  }
];