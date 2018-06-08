/**
 *
 * @param {function} callback Callback
 * @returns {{positive: function(): *, negative: function(*=): *}} Results
 */
module.exports = callback => ({
  positive: () => callback(null, true),
  negative: status => callback(status, false),
});
