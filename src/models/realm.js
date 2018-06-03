/**
 * @typedef {Object} RealmModel
 * @param {string} [id]
 * @param {string} name
 * @param {string} ownerAccountId
 * @param {string} tenantId
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {RealmModel}
 */
module.exports = ({
  id,
  ownerAccountId,
  name,
  tenantId,
  createdAt,
  updatedAt,
}) => ({
  id,
  ownerAccountId,
  name,
  tenantId,
  createdAt,
  updatedAt,
});
