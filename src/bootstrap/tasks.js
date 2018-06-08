const accountRules = require('../rules/account');
const initAdminTasks = require('../tasks/admin');
const initBrokerTasks = require('../tasks/broker');

/**
 *
 * @param {AccountRepository} accountRepository Account repository
 * @param {AuthRepository} authRepository Authentication repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {RealmRepository} realmRepository Realm repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {{broker: BrokerTasks}} Tasks
 */
module.exports = ({
  repositories: {
    account: accountRepository,
    auth: authRepository,
    channel: channelRepository,
    realm: realmRepository,
    subscription: subscriptionRepository,
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
});
