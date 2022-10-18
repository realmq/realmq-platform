const mapGenericEntity = require('../../../../lib/mappers/generic-entity');

/**
 * @class UserViewModel
 * @property {string} id
 * @property {object} properties
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * Map a user to response view model
 * @param {UserModel} user The user entity
 * @return {UserViewModel} The user view model
 */
module.exports = user => mapGenericEntity({
  entity: user,
  propertyMap: {
    id: 'id',
    properties: 'properties',
    isOnline: 'isOnline',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

