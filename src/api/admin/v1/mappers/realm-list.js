const mapGenericList = require('../../../../lib/mappers/generic-list');
const mapRealm = require('./realm');

/**
 * Map a list of realms
 * @param {PaginatedList<RealmModel>} list The realm list
 * @return {PaginatedList<RealmViewModel>} The mapped realm list
 */
module.exports = list => mapGenericList({list, mapItem: mapRealm});
