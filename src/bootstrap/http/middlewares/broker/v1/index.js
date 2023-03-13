const {Router: createRouter} = require('express');
const {notAllowed: notAllowedError} = require('../../../../../lib/error/http');
const initRoutes = require('./routes');

const initAuth = ({apiKey}) => {
  if (!apiKey) {
    return (request, response, next) => next();
  }

  return (request, response, next) => {
    const requestingApiKey = request.headers['api-key'] || request.query['api-key'];
    if (requestingApiKey === apiKey) {
      return next();
    }

    // Check for ...?api-key:xxx param style
    const matchingEqualLessKey = Object.keys(request.query)
      .filter(key => key.startsWith('api-key:'))
      .map(key => key.split(':')[1] || '')
      .includes(apiKey);
    if (matchingEqualLessKey) {
      return next();
    }

    return next(notAllowedError({path: request.originalUrl}));
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
  router.post('/vmq/on-client-wakeup', auth, routes.onClientOnline);
  router.post('/vmq/on-client-offline', auth, routes.onClientOffline);
  router.post('/vmq/on-client-gone', auth, routes.onClientOffline);

  return router;
};
