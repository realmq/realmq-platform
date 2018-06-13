const mapGenericList = require('../../../../lib/mappers/generic-list');
const mapAuth = require('./auth');

/**
 * Map a list of auths
 * @param {PaginatedList<AuthModel>} list The auth list
 * @return {PaginatedList<AuthViewModel>} The mapped auth list
 */
module.exports = list => mapGenericList({list, mapItem: mapAuth});
