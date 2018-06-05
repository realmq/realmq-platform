const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} AuthModel
 * @param {string} id
 * @param {string} realmId
 * @param {string} userId
 * @param {boolean} isOnline
 * @param {string} token
 * @param {string} scope
 * @param {string} description
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */

/**
 * @return {AuthModel} The generalizes auth model
 */
module.exports = ({
  id,
  realmId,
  userId,
  isOnline,
  token,
  scope,
  description,
  createdAt,
  updatedAt
}) => stripUndefined({
  id,
  realmId,
  userId,
  isOnline,
  token,
  scope,
  description,
  createdAt,
  updatedAt
});
