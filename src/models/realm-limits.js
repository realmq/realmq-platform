const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} RealmLimitsModel Specialized set of realm settings focused on connections/sessions
 * @param {string} [id]
 * @param {string} realmId
 * @param {number} maxConnections Max number of simultaneously online connections
 * @param {number} sessionMaxMessageRate Max incoming publish rate per session per second
 * @param {number} sessionMaxConnectionLifetime Max lifetime of a connection in seconds
 * @param {number} sessionMaxMessageSize Max message payload size in bytes
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {RealmLimitsModel} The generalized realm model
 */
module.exports = ({
  id,
  realmId,
  maxConnections,
  sessionMaxMessageRate,
  sessionMaxConnectionLifetime,
  sessionMaxMessageSize,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  maxConnections,
  sessionMaxMessageRate,
  sessionMaxConnectionLifetime,
  sessionMaxMessageSize,
  createdAt,
  updatedAt,
});
