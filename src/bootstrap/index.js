const bootstrapDatabase = require('./database');
const bootstrapHttp = require('./http');
const bootstrapMessagePersistence = require('./message-persistence');
const bootstrapMqtt = require('./mqtt');
const bootstrapRepositories = require('./repositories');
const bootstrapTasks = require('./tasks');

/**
 * Bootstrap all services.
 *
 * @param {Object} config Configuration
 * @param {Logger} logger Logger
 * @return {Promise<{db: Object, http: Object, repositories: Repositories}>} Resolves with bootstrapped services.
 */
module.exports = async ({config, logger}) => {
  const [db, mqtt] = await Promise.all([
    bootstrapDatabase({config, logger}),
    bootstrapMqtt({config, logger}),
  ]);
  const repositories = await bootstrapRepositories({db});
  const tasks = await bootstrapTasks({repositories, logger});
  const http = await bootstrapHttp({config, logger, tasks});
  const messagePersistence = await bootstrapMessagePersistence({logger, tasks, mqttClient: mqtt});

  return {db, http, mqtt, repositories, tasks, messagePersistence};
};
