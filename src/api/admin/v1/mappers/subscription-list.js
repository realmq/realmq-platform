const mapGenericList = require('../../../../lib/mappers/generic-list');
const mapSubscription = require('./subscription');

/**
 * Map a list of subscriptions
 * @param {PaginatedList<SubscriptionModel>} list The subscription list
 * @return {PaginatedList<SubscriptionViewModel>} The mapped subscription list
 */
module.exports = list => mapGenericList({list, mapItem: mapSubscription});
