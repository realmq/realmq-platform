#!/usr/bin/env node

const config = require('./config');
const createApp = require('./app');
const logging = require('./lib/logger');

(async () => {
  try {
    const logger = logging({name: config.appId, level: config.logging.level});
    const app = createApp({config, logger});
    await app.start();

    let shuttingDown = false;
    const shutdown = async () => {
      if (shuttingDown) {
        return;
      }
      logger.debug('shutting down...');
      shuttingDown = true;

      const status = await app.stop();
      process.exit(status);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error(`FATAL: ${err}`, err);
    process.exit(1);
  }
})();
