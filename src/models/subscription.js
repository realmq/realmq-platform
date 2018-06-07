const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} SubscriptionModel
 * @param {string} id
 * @param {string} realmId
 * @param {string} channelId
 * @param {string} userId
 * @param {boolean} allowRead
 * @param {boolean} allowWrite
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */

/**
 * @return {SubscriptionModel} The generalized subscription model
 */
module.exports = ({
  id,
  realmId,
  channelId,
  userId,
  allowRead,
  allowWrite,
  createdAt,
  updatedAt
}) => stripUndefined({
  id,
  realmId,
  channelId,
  userId,
  allowRead,
  allowWrite,
  createdAt,
  updatedAt
});
