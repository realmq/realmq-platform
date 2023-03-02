const stripUndefined = require('../lib/strip-undefined');

/**
 * @class RealtimeConnection
 * @param {string} id
 * @param {string} realmId
 * @param {string} userId
 * @param {string} authId
 * @param {string} clientId
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {RealtimeConnection} The generalized realtime connection model
 */
module.exports = ({
  id,
  realmId,
  userId,
  authId,
  clientId,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  userId,
  authId,
  clientId,
  createdAt,
  updatedAt,
});
