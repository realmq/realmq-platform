const {Router: createRouter} = require('express');
const initRoutes = require('./routes');

/**
 * @param {BrokerTasks} brokerTasks Broker tasks
 * @returns {Promise<function>} Middleware
 */
module.exports = ({brokerTasks}) => {
  const routes = initRoutes({brokerTasks});

  const router = createRouter({});
  router.post('/v1/vmq/auth-on-publish', routes.authOnPublish);
  router.post('/v1/vmq/auth-on-register', routes.authOnRegister);
  router.post('/v1/vmq/auth-on-subscribe', routes.authOnSubscribe);
  router.post('/v1/vmq/on-client-online', routes.onClientOnline);
  router.post('/v1/vmq/on-client-offline', routes.onClientOffline);

  return router;
};
