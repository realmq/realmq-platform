const setPropertyIfDefined = require('./lib/set-property-if-defined');

/**
 * @typedef {Object} UserModel
 * @param {string} id
 * @param {boolean} isOnline
 * @param {Object} [properties]
 * @param {Date} [createdAt]
 * @param {Date} [updatedAt]
 */

/**
 * @return {UserModel}
 */
module.exports = ({
  id,
  isOnline,
  properties,
  createdAt,
  updatedAt,
}) => {
  const user = {};

  setPropertyIfDefined(user, 'id', id);
  setPropertyIfDefined(user, 'isOnline', isOnline);
  setPropertyIfDefined(user, 'properties', properties);
  setPropertyIfDefined(user, 'createdAt', createdAt);
  setPropertyIfDefined(user, 'updatedAt', updatedAt);

  return user;
};
