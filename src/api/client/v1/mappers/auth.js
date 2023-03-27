const mapGeneric = require('../../../../lib/mappers/generic-entity');

/**
 * @class AuthViewModel
 * @property {string} id
 * @property {string} userId
 * @property {string} scope
 * @property {boolean} isOnline
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {AuthModel} entity The auth model to map
 * @return {AuthViewModel} The mapped auth model
 */
module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    userId: 'userId',
    scope: 'scope',
    isOnline: 'isOnline',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

/**
 * @class AuthViewModelWithToken
 * @property {string} id
 * @property {string} userId
 * @property {string} scope
 * @property {string} token
 * @property {boolean} isOnline
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {AuthModel} entity The auth model to map
 * @return {AuthViewModelWithToken} The mapped auth model
 */
module.exports.authWithToken = entity => {
  const mapped = module.exports(entity);
  mapped.token = entity.token;

  return mapped;
};
