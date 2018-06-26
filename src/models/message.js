const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} MessageModel
 * @param {string} id
 * @param {string} realmId
 * @param {string} channelId
 * @param {Buffer} content
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */

/**
 * @return {MessageModel} The generalized persisted message model
 */
module.exports = ({
  id,
  realmId,
  channelId,
  content,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  channelId,
  content,
  createdAt,
  updatedAt,
});
