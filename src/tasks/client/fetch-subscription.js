const {success} = require('../../lib/result');

/**
 * Init fetch subscription task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {ClientTasks#fetchSubscription} Task
 */
module.exports = ({subscriptionRepository}) =>
  /**
   * @function ClientTasks#fetchSubscription
   * @param {AuthModel} authToken Authentication
   * @param {string} id Subscription id
   * @returns {Result<?SubscriptionModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId, userId} = authToken;

    const subscription = await (
      scope === 'admin' ?
        subscriptionRepository.findOne({realmId, channelId: id}) :
        subscriptionRepository.findOne({realmId, channelId: id, userId})
    );

    return success(subscription);
  };
