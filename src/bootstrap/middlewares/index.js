const bootstrapBrokerMiddleware = require('./broker');

module.exports = ({tasks: {broker: brokerTasks}}) => ({
  broker: bootstrapBrokerMiddleware({brokerTasks})
});
