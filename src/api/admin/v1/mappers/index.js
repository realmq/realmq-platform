const auth = require('./auth');
const authList = require('./auth-list');
const channel = require('./channel');
const channelList = require('./channel-list');
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
  channel,
  channelList,
  realm,
  realmList,
  user,
  userList
};
