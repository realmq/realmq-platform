const accountRules = require('../rules/account');
const initAdminTasks = require('../tasks/admin');
const initBrokerTasks = require('../tasks/broker');
const initClientTasks = require('../tasks/client');

/**
 *
 * @param {AccountRepository} accountRepository Account repository
 * @param {AuthRepository} authRepository Authentication repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {RealmRepository} realmRepository Realm repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {UserRepository} userRepository User repository
 * @returns {{broker: BrokerTasks}} Tasks
 */
module.exports = ({
  repositories: {
    account: accountRepository,
    auth: authRepository,
    channel: channelRepository,
    realm: realmRepository,
    subscription: subscriptionRepository,
    user: userRepository,
  },
}) => ({
  admin: initAdminTasks({
    accountRules,
    accountRepository,
    realmRepository,
  }),
  broker: initBrokerTasks({
    authRepository,
    channelRepository,
    subscriptionRepository,
  }),
  client: initClientTasks({
    authRepository,
    userRepository,
  }),
});
