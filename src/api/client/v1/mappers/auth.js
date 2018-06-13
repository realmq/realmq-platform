const mapGeneric = require('../../../../lib/mappers/generic-entity');

/**
 * @class AuthViewModel
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
 * @param {AuthModel} entity The auth token to map
 * @return {AuthViewModel} The mapped auth token model
 */
module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    userId: 'userId',
    scope: 'scope',
    token: 'token',
    isOnline: 'isOnline',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
