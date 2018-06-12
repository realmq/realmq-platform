const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} UserModel
 * @param {string} id
 * @param {string} realmId
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
  realmId,
  isOnline = false,
  properties = {},
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  isOnline,
  properties,
  createdAt,
  updatedAt,
});
