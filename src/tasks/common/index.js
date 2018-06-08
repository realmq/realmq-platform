const initUpsertUser = require('./upsert-user');

/**
 * @param {UserRepository} userRepository User repository
 * @returns {CommonTasks} Initialized admin tasks
 */
module.exports = ({userRepository}) => {
  /**
   * @class CommonTasks
   */
  return {
    upsertUser: initUpsertUser({userRepository}),
  };
};
