const initAdmin = require('./admin');
const initBroker = require('./broker');
const initClient = require('./client');
const initCatchAll = require('./catch-all');
const initError = require('./error');

/**
 * @param {object} tasks Tasks
 * @param {Logger} logger The logger
 * @returns {{admin: function, broker: function, catchAll: function, error: function}} Middlewares
 */
module.exports = async ({tasks, logger}) => ({
  admin: await initAdmin({tasks, logger}),
  broker: await initBroker({tasks}),
  client: await initClient({tasks, logger}),
  catchAll: await initCatchAll({logger}),
  error: await initError({logger}),
});
