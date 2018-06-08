/**
 * @typedef {object} Result
 * @param {boolean} ok Result is success (true) of failure (false)
 * @param {*} [result] Operation result
 * @param {*} [error] Last occurred error, if any
 * @param {*[]} [errors] Error chain, from latest to first, if any
 */
/**
 * Generic operation results
 */
module.exports = {
  /**
   * Successful operation
   * @param {*} result Result value
   * @param {*[]} [results] More result values
   * @returns {Result} Positive operation result
   */
  success: (result, ...results) => ({
    ok: true,
    result: results.length === 0 ? result : [result, ...results],
  }),
  /**
   * Failed operation
   * @param {*} error Error
   * @param {*[]} errors More errors
   * @returns {Result} Negative operation result
   */
  failure: (error, ...errors) => {
    return {
      ok: false,
      error,
      errors: [error, ...errors],
    };
  },
};
