const initAdmin = require('./admin');
const initBroker = require('./broker');
const initClient = require('./client');
const catchAll = require('./catch-all');
const error = require('./error');

/**
 *
 * @param {object} tasks Tasks
 * @returns {{admin: function, broker: function, catchAll: function, error: function}} Middlewares
 */
module.exports = async ({tasks, logger}) => ({
  admin: await initAdmin({tasks, logger}),
  broker: await initBroker({tasks}),
  client: await initClient({tasks}),
  catchAll,
  error
});
