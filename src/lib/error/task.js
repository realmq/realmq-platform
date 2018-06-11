/**
 * @class TaskError
 * @extends Error
 * @property {string} name
 * @property {string} code
 * @property {boolean} isTaskError
 */
/**
 * Task error
 * @param {string} code Error code
 * @param {string} message Message
 * @returns {TaskError} Error
 */
module.exports = ({code, message}) =>
  Object.assign(
    new Error(message),
    {
      isTaskError: true,
      name: 'TaskError',
      code,
    }
  );
