const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} RealmModel
 * @param {string} [id]
 * @param {string} name
 * @param {string} ownerAccountId
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {RealmModel} The generalized realm model
 */
module.exports = ({
  id,
  ownerAccountId,
  name,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  ownerAccountId,
  name,
  createdAt,
  updatedAt,
});
