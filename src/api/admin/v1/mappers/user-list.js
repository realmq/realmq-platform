const mapGenericList = require('../../../../lib/mappers/generic-list');
const mapUser = require('./user');

/**
 * Map a list of realms
 * @param {PaginatedList<UserModel>} list The user list
 * @return {PaginatedList<UserViewModel>} The mapped user list
 */
module.exports = list => mapGenericList({list, mapItem: mapUser});
