/**
 * @param {function(object, boolean)} callback Callback
 * @returns {SecuritySchemeResponder} Responder
 */
module.exports = callback => {
  /**
   * @class SecuritySchemeResponder
   */
  return {
    /**
     * Grant request
     * @returns {void}
     */
    grant() {
      callback(null, true);
    },
    /**
     * Decline request
     * @param {object} status Status describing decline
     * @returns {void}
     */
    decline(status) {
      callback(status, false);
    },
    /**
     * Fail check for request
     */
    fail() {
      callback({status: 500}, false);
    },
  };
};
