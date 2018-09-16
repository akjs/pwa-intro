const Hapi = require('hapi');
const Path = require('path');
const Manifest = require('./manifest');

const server = Hapi.server({
  port: 4567,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});

const start = async () => {
  try {

    await server.register(Manifest);

    //start server
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('🚀 Server running at:', server.info.uri);
};

process.on('SIGINT', async () => {
  console.log('stopping server');
  try {
    await server.stop({ timeout: 10000 });
    console.log('hapi server stopped 🛑');
    process.exit(0);
  } catch (err) {
    console.error('shutdown error', err);
    process.exit(1);
  }
});

start();