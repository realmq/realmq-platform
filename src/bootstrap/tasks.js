const accountRules = require('../rules/account');
const authTokenRules = require('../rules/auth-token');
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
 * @returns {{broker: BrokerTasks, admin: AdminTasks}} Tasks
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
}) => {
  return {
    admin: initAdminTasks({
      accountRules,
      authTokenRules,
      accountRepository,
      authRepository,
      realmRepository,
      userRepository,
    }),
    broker: initBrokerTasks({
      authRepository,
      channelRepository,
      subscriptionRepository,
    }),
    client: initClientTasks({
      authRepository,
      channelRepository,
      userRepository,
      subscriptionRepository,
    }),
  };
};
