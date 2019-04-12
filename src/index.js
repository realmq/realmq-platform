#!/usr/bin/env node
const dotenv = require('dotenv');
const initConfig = require('./config');
const createApp = require('./app');
const createLogger = require('./lib/logger');

(async () => {
  try {
    // Populate variables from .env to process.env
    dotenv.config();
    const config = initConfig(process.env);
    const logger = createLogger({name: config.appId, level: config.logging.level});
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
  } catch (error) {
    console.error(`FATAL: ${error}`, error);
    process.exit(1);
  }
})();
