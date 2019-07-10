const mapGeneric = require('../../../../lib/mappers/generic-entity');

/**
 * @class UserViewModel
 * @property {string} id
 * @property {object} properties
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {UserModel} entity The user to map
 * @return {UserViewModel} The mapped user model
 */
module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    properties: 'properties',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
