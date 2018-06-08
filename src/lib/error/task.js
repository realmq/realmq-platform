/**
 * @class TaskError
 * @extends Error
 * @prop {string} name
 * @prop {string} reason
 */
/**
 * Task error
 * @param {string} reason Reason code
 * @param {string} message Message
 * @returns {TaskError} Error
 */
module.exports = (reason, message) =>
  Object.assign(
    new Error(message),
    {
      name: 'TaskError',
      reason,
    }
  );
