const bootstrapBrokerTasks = require('../tasks/broker');

/**
 *
 * @param {AuthRepository} authRepository Authentication repository
 * @returns {{broker: BrokerTasks}} Tasks
 */
module.exports = ({repositories: {auth: authRepository}}) => ({
  broker: bootstrapBrokerTasks({
    loadAuth: token => authRepository.findOneByToken(token),
    updateAuth: entity => authRepository.update(entity),
    loadTopicPermissions: () => ({
      read: false,
      write: false
    })
  })
});
