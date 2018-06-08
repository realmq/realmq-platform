const stripUndefined = require('../lib/strip-undefined');

/**
 * @typedef {Object} ChannelModel
 * @param {string} id
 * @param {string} realmId
 * @param {Object} features
 * @param {Object} [properties]
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {ChannelModel} The generalized channel model
 */
module.exports = ({
  id,
  realmId,
  features,
  properties,
  createdAt,
  updatedAt,
}) => stripUndefined({
  id,
  realmId,
  features,
  properties,
  createdAt,
  updatedAt,
});
