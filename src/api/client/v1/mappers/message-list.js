const mapGenericList = require('../../../../lib/mappers/generic-list');
const mapMessage = require('./message');

/**
 * Map a list of messages
 * @param {PaginatedList<MessageModel>} list The message list
 * @return {PaginatedList<MessageViewModel>} The mapped message list
 */
module.exports = list => mapGenericList({list, mapItem: mapMessage});
