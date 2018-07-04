const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} SubscriptionModel
 * @property {string} id
 * @property {string} realmId
 * @property {string} channelId
 * @property {string} userId
 * @property {boolean} allowRead
 * @property {boolean} allowWrite
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @return {SubscriptionModel} The generalized subscription model
 */
module.exports = ({
  id,
  realmId,
  channelId,
  userId,
  allowRead = true,
  allowWrite = true,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  channelId,
  userId,
  allowRead,
  allowWrite,
  createdAt,
  updatedAt,
});
