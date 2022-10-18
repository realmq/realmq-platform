const auth = require('./auth');
const authList = require('./auth-list');
const realm = require('./realm');
const realmList = require('./realm-list');
const user = require('./user');
const userList = require('./user-list');

/**
 * @class AdminApiV1Mappers
 */
module.exports = {
  auth,
  authList,
  realm,
  realmList,
  user,
  userList
};
