const {success} = require('../../lib/result');

const buildQuery = ({scope, id, realmId, userId}) => (
  scope === 'admin' ?
    {realmId, id} : // Admins see all subscriptions
    {realmId, id, userId} // Non admins see only their subscriptions
);

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

    const query = buildQuery({scope, realmId, id, userId});
    const subscription = await subscriptionRepository.findOne(query);

    return success(subscription);
  };
