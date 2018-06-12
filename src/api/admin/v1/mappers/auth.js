const mapGenericEntity = require('../../../../lib/mappers/generic-entity');

/**
 * @class AuthViewModel
 * @property {string} id
 * @property {string} userId
 * @property {boolean} isOnline
 * @property {string} token
 * @property {string} scope
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * Map an auth to response view model
 * @param {AuthModel} auth The auth entity
 * @return {AuthViewModel} The auth view model
 */
module.exports = auth => mapGenericEntity({
  entity: auth,
  propertyMap: {
    id: 'id',
    userId: 'userId',
    isOnline: 'isOnline',
    token: 'token',
    scope: 'scope',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

