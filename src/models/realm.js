const setPropertyIfDefined = require('./lib/set-property-if-defined');

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
}) => {
  const realm = {};

  setPropertyIfDefined(realm, 'id', id);
  setPropertyIfDefined(realm, 'ownerAccountId', ownerAccountId);
  setPropertyIfDefined(realm, 'name', name);
  setPropertyIfDefined(realm, 'tenantId', tenantId);
  setPropertyIfDefined(realm, 'createdAt', createdAt);
  setPropertyIfDefined(realm, 'updatedAt', updatedAt);

  return realm;
};
