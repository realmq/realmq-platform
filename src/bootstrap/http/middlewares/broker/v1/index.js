const {Router: createRouter} = require('express');
const {notFound: notFoundError} = require('../../../../../lib/error/http');
const initRoutes = require('./routes');

const initAuth = ({apiKey}) => {
  if (!apiKey) {
    return (req, res, next) => next();
  }

  return (req, res, next) => {
    const requestingApiKey = req.headers['api-key'] || req.query['api-key'];
    if (requestingApiKey !== apiKey) {
      const path = `${req.baseUrl}${req.path}`;
      return next(notFoundError({path}));
    }
    next();
  };
};

/**
 * @param {BrokerTasks} brokerTasks Broker tasks
 * @returns {function} Middleware
 */
module.exports = ({config, tasks: {broker: brokerTasks}}) => {
  const routes = initRoutes({brokerTasks});

  const router = createRouter({});

  const apiKey = config.api.broker.key;
  const auth = initAuth({apiKey});

  router.post('/vmq/auth-on-publish', auth, routes.authOnPublish);
  router.post('/vmq/auth-on-register', auth, routes.authOnRegister);
  router.post('/vmq/auth-on-subscribe', auth, routes.authOnSubscribe);
  router.post('/vmq/on-client-online', auth, routes.onClientOnline);
  router.post('/vmq/on-client-offline', auth, routes.onClientOffline);

  return router;
};
