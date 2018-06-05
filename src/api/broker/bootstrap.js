const {Router: createRouter} = require('express');
const constructV1Routes = require('./v1/routes');

/**
 *
 * @param {function} authenticateClient Task
 * @param {function} authorizeRegister Task
 * @param {function} authorizePublish Task
 * @param {function} authorizeSubscribe Task
 * @param {BrokerTasks#markClientOffline} markClientOffline Task
 * @param {BrokerTasks#markClientOnline} markClientOnline Task
 * @returns {void} Nothing
 */
module.exports = ({
  authenticateClient,
  authorizeRegister,
  authorizePublish,
  authorizeSubscribe,
  markClientOffline,
  markClientOnline
}) => {
  const v1Routes = constructV1Routes({
    authenticateClient,
    authorizeRegister,
    authorizePublish,
    authorizeSubscribe,
    markClientOffline,
    markClientOnline
  });

  const router = createRouter({});
  router.post('/vmq/auth-on-publish', v1Routes.vmq.authOnPublish);
  router.post('/vmq/auth-on-register', v1Routes.vmq.authOnRegister);
  router.post('/vmq/auth-on-subscribe', v1Routes.vmq.authOnSubscribe);
  router.post('/vmq/on-client-online', v1Routes.vmq.onClientOnline);
  router.post('/vmq/on-client-offline', v1Routes.vmq.onClientOffline);

  return router;
};
