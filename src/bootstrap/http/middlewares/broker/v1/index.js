const {Router: createRouter} = require('express');
const initRoutes = require('./routes');

/**
 * @param {BrokerTasks} brokerTasks Broker tasks
 * @returns {function} Middleware
 */
module.exports = ({tasks: {broker: brokerTasks}}) => {
  const routes = initRoutes({brokerTasks});

  const router = createRouter({});
  router.post('/vmq/auth-on-publish', routes.authOnPublish);
  router.post('/vmq/auth-on-register', routes.authOnRegister);
  router.post('/vmq/auth-on-subscribe', routes.authOnSubscribe);
  router.post('/vmq/on-client-online', routes.onClientOnline);
  router.post('/vmq/on-client-offline', routes.onClientOffline);

  return router;
};
