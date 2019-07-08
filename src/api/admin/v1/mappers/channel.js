const mapGeneric = require('../../../../lib/mappers/generic-entity');
/**
 * @class ChannelViewModel
 * @property {string} id
 * @property {object} features
 * @property {object} properties
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {ChannelModel} entity The channel to map
 * @return {ChannelViewModel} The mapped channel model
 */
module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    features: 'features',
    properties: 'properties',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
