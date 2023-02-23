const mapGenericEntity = require('../../../../lib/mappers/generic-entity');

/**
 * @class ChannelViewModel
 * @property {string} id
 * @property {object} properties
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * Map a user to response view model
 * @param {ChannelModel} channel The channel entity
 * @return {ChannelViewModel} The channel view model
 */
module.exports = channel => mapGenericEntity({
  entity: channel,
  propertyMap: {
    id: 'id',
    properties: 'properties',
    features: 'features',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

