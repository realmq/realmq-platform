const error = require('../../../lib/error/task');

/**
 * Common errors of auth related client tasks
 * @typedef {object} ClientTaskChannelErrors
 */
module.exports = {
  /**
   * Unknown channel
   * @returns {TaskError} Task error
   */
  unknown: () => error({
    code: 'UnknownChannel',
    message: 'Channel is not accessible.',
  }),
};
