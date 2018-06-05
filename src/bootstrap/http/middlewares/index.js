const bootstrapBrokerMiddleware = require('./broker');
const catchAll = require('./catch-all');
const error = require('./error');

/**
 *
 * @param {BrokerTasks} brokerTasks Broker tasks
 * @returns {{broker: function, catchAll: function, error: function}} Middlewares
 */
module.exports = ({tasks: {broker: brokerTasks}}) => ({
  broker: bootstrapBrokerMiddleware({brokerTasks}),
  catchAll,
  error
});
