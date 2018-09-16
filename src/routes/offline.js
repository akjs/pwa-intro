const path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/offline',
    config: {
      handler: {
        file: 'offline.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/about',
    config: {
      handler: {
        file: 'about.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/2',
    config: {
      handler: {
        file: 'offline2.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/1',
    config: {
      handler: {
        file: 'offline.html'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/cache-worker.js',
    config: {
      handler: {
        file: 'js/cache-worker2.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/client.js',
    config: {
      handler: {
        file: 'js/client.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/offline-client.js',
    config: {
      handler: {
        file: 'js/offline-client.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/offline-sw.js',
    config: {
      handler: {
        file: 'js/offline-sw.js'
      }
    }
  },
  {
    method: 'GET',
    path: '/offline/static/{param*}',
    handler: {
      directory: {
        path: '../public/',
        redirectToSlash: true,
        index: true,
      }
    }
  }
]