const {success} = require('../../lib/result');

/**
 * Init list subscriptions task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @returns {Function} Task
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

    // Admins see all channels
    const list = await (
      scope === 'admin' ?
        subscriptionRepository.find({realmId}, {offset, limit}) :
        subscriptionRepository.find({realmId, userId}, {offset, limit})
    );

    return success(list);
  };
