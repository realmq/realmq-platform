const error = require('../../../lib/error/task');

/**
 * Common errors of auth related client tasks
 * @typedef {object} ClientTaskAuthErrors
 */
module.exports = {
  /**
   * Auth token already exists
   * @returns {TaskError} Task error
   */
  alreadyExists: () => error({
    code: 'AuthTokenAlreadyExists',
    message: 'A auth token with the same id already exists.',
  }),
  /**
   * Insufficient privileges to execute a action
   * @param {string} action Action not allowed
   * @returns {TaskError} Task error
   */
  insufficientPrivileges: ({action = 'perform unknown action'} = {}) => error({
    code: 'InsufficientPrivileges',
    message: `Insufficient privileges to ${action}.`,
  }),
  /**
   * Invalid auth token after applying patch
   * @returns {TaskError} Task error
   */
  invalidAfterPatch: () => error({
    code: 'InvalidAuthToken',
    message: 'Invalid auth token after applying patch.',
  }),
  /**
   * Unknown auth
   * @returns {TaskError} Task error
   */
  unknown: () => error({
    code: 'UnknownAuthToken',
    message: 'Auth token does not exists.',
  }),
};
