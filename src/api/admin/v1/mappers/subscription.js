const mapGeneric = require('../../../../lib/mappers/generic-entity');

/**
 * @class SubscriptionViewModel
 * @property {string} id
 * @property {string} channelId
 * @property {string} userId
 * @property {boolean} allowRead
 * @property {boolean} allowWrite
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {SubscriptionModel} entity The subscription to map
 * @return {SubscriptionViewModel} The mapped subscription model
 */
module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    channelId: 'channelId',
    userId: 'userId',
    allowRead: 'allowRead',
    allowWrite: 'allowWrite',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
