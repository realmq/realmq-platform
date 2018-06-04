const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} UserModel
 * @param {string} id
 * @param {boolean} isOnline
 * @param {Object} [properties]
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {UserModel} The generalized user model
 */
module.exports = ({
  id,
  isOnline,
  properties,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  isOnline,
  properties,
  createdAt,
  updatedAt,
});
