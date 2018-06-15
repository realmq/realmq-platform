const mapGeneric = require('../../../../lib/mappers/generic-entity');
/**
 * @class MessageViewModel
 * @property {string} id
 * @property {object} features
 * @property {object} properties
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {MessageModel} entity The message to map
 * @return {MessageViewModel} The mapped message model
 */
module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
