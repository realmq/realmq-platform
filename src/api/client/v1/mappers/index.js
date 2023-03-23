const auth = require('./auth');
const authList = require('./auth-list');
const channel = require('./channel');
const channelList = require('./channel-list');
const message = require('./message');
const messageList = require('./message-list');
const subscription = require('./subscription');
const subscriptionList = require('./subscription-list');
const user = require('./user');
const userList = require('./user-list');

/**
 * @class ClientApiV1Mappers
 */
module.exports = {
  auth,
  authWithToken: auth.authWithToken,
  authList,
  channel,
  channelList,
  message,
  messageList,
  subscription,
  subscriptionList,
  user,
  userList,
};
