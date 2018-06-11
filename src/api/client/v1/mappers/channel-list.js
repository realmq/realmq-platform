const mapGenericList = require('../../../../lib/mappers/generic-list');
const mapChannel = require('./channel');

/**
 * Map a list of channels
 * @param {PaginatedList<ChannelModel>} list The channel list
 * @return {PaginatedList<ChannelViewModel>} The mapped channel list
 */
module.exports = list => mapGenericList({list, mapItem: mapChannel});
