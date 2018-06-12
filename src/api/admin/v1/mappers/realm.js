const mapGenericEntity = require('../../../../lib/mappers/generic-entity');

/**
 * @class RealmViewModel
 * @property {string} id
 * @property {string} name
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * Map an realm to response view model
 * @param {RealmModel} realm The realm entity
 * @return {RealmViewModel} The realm view model
 */
module.exports = realm => mapGenericEntity({
  entity: realm,
  propertyMap: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

