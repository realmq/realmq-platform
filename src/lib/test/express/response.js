/** @typedef {object} ExpressTestResponse */
/**
 * Initialize response
 * @param {object} state State storage
 * @param {number} [state.status] Initial value for status
 * @param {boolean} [state.isSend] Initial value for isSend
 * @param {*} [state.data] Initial value for data
 * @param {object} [state.headers] Initial value for headers
 * @returns {ExpressTestResponse} Response
 */
module.exports = (state = {}) => {
  state.status = state.status || 200;
  state.isSend = state.isSend || false;
  state.headers = state.headers || {};
  const response = {
    /**
     * @memberOf ExpressTestResponse
     * @returns {ExpressTestResponse} Response
     */
    send: () => {
      state.isSend = true;
      return response;
    },
    /**
     * @memberof ExpressTestResponse
     * @param {(string|Object<string, string>)} name Header name or hash map
     * @param {string} [value] Header value
     * @returns {ExpressTestResponse} Response
     */
    set: (name, value) => {
      if (value === undefined) {
        Object.assign(state.headers, name);
      } else {
        state.headers[name] = value;
      }

      return response;
    },
    /**
     * @memberOf ExpressTestResponse
     * @param {number} value Status code
     * @returns {ExpressTestResponse} Response
     */
    status: value => {
      state.status = value;
      return response;
    },
    /**
     * @memberOf ExpressTestResponse
     * @param {*} value JSON response value
     * @returns {ExpressTestResponse} Response
     */
    json: value => {
      state.data = value;
      state.isSend = true;
      return response;
    },
  };
  return response;
};
