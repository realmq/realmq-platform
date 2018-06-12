const {success} = require('../../lib/result');

const buildQuery = ({scope, realmId, userId}) => (
  scope === 'admin' ?
    {realmId} : // Admins see all subscriptions
    {realmId, userId} // Non admins see only their subscriptions
);

/**
 * Init list subscriptions task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {ClientTasks#listSubscriptions} Task
 */
module.exports = ({subscriptionRepository}) =>
  /**
   * @function ClientTasks#listSubscriptions
   * @param {AuthModel} authToken Authentication
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<SubscriptionModel>>}
   */
  async ({authToken, offset, limit}) => {
    const {scope, realmId, userId} = authToken;

    const query = buildQuery({scope, realmId, userId});
    const list = await subscriptionRepository.find(query, {offset, limit});

    return success(list);
  };
