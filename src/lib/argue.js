/**
 * This function throws an missing argument error for the given label.
 *
 * @param {string} name The argument label
 * @throws TypeError
 */
module.exports = function argue(name) {
  const requiredArgumentError = new TypeError(`Required argument ${name} is missing.`);

  // Retains the correct stack trace for the location where the error was triggered
  Error.captureStackTrace(requiredArgumentError, argue);

  throw requiredArgumentError;
};
