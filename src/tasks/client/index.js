const initAuthenticateUser = require('./authenticate-user');

/** @typedef {object} ClientTasks */
/**
 * Initialize client tasks
 * @param {AuthRepository} authRepository Auth repository
 * @return {ClientTasks} Initialized tasks
 */
module.exports = ({authRepository, userRepository}) => ({
  authenticateUser: initAuthenticateUser({authRepository, userRepository}),
});
