const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} RealmLimitsModel Specialized set of realm settings focused on connections/sessions
 * @property {string} [id]
 * @property {string} realmId
 * @property {number} maxConnections Max number of simultaneously online connections
 * @property {number} sessionMaxMessageRate Max incoming publish rate per session per second
 * @property {number} sessionMaxConnectionLifetime Max lifetime of a connection in seconds
 * @property {number} sessionMaxMessageSize Max message payload size in bytes
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
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
