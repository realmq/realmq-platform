const error = require('../../../lib/error/task');

/**
 * Common errors of auth related client tasks
 * @typedef {object} ClientTaskAuthErrors
 */
module.exports = {
  /**
   * Unknown auth
   * @returns {TaskError} Task error
   */
  unknown: () => error({
    code: 'UnknownAuthToken',
    message: 'Auth token does not exists.',
  }),
};
