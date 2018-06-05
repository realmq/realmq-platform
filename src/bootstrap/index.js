const bootstrapDatabase = require('./database');
const bootstrapHttp = require('./http');
const bootstrapRepositories = require('./repositories');
const bootstrapTasks = require('./tasks');
const bootstrapMiddlewares = require('./middlewares');

/**
 * Bootstrap all services.
 *
 * @param {Object} config Configuration
 * @param {Object} logger Logger
 * @return {Promise<{db: Object, http: Object}>} Resolves with bootstrapped services.
 */
module.exports = async ({config, logger}) => {
  const db = await bootstrapDatabase({config, logger});
  const repositories = await bootstrapRepositories({db});
  const tasks = await bootstrapTasks({repositories});
  const middlewares = await bootstrapMiddlewares({tasks});
  const http = await bootstrapHttp({config, logger, middlewares});

  return {db, http, repositories, tasks};
};
