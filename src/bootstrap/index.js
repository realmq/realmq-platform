const bootstrapDatabase = require('./database');
const bootstrapHttp = require('./http');
const bootstrapRepositories = require('./repositories');
const bootstrapTasks = require('./tasks');

/**
 * Bootstrap all services.
 *
 * @param {Object} config Configuration
 * @param {Object} logger Logger
 * @return {Promise<{db: Object, http: Object, repositories: Object}>} Resolves with bootstrapped services.
 */
module.exports = async ({config, logger}) => {
  const db = await bootstrapDatabase({config, logger});
  const repositories = await bootstrapRepositories({db});
  const tasks = await bootstrapTasks({repositories});
  const http = await bootstrapHttp({config, logger, tasks});

  return {db, http, repositories, tasks};
};
