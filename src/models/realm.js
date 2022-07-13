const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} RealmModel
 * @param {string} [id]
 * @param {string} name
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {RealmModel} The generalized realm model
 */
module.exports = ({
  id,
  name,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  name,
  createdAt,
  updatedAt,
});
