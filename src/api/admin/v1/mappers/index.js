const auth = require('./auth');
const authList = require('./auth-list');
const channel = require('./channel');
const channelList = require('./channel-list');
const realm = require('./realm');
const realmDetails = require('./realm-details');
const realmList = require('./realm-list');
const subscription = require('./subscription');
const subscriptionList = require('./subscription-list');
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
  realmDetails,
  realmList,
  subscription,
  subscriptionList,
  user,
  userList,
};
