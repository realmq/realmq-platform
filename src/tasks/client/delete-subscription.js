const {success, failure} = require('../../lib/result');
const error = require('../../lib/error/task');

/**
 * Init delete subscription task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSync} sendSubscriptionSync Task for sending subscription sync
 * @returns {ClientTasks#deleteSubscription} Task
 */
module.exports = ({
  subscriptionRepository,
  sendSubscriptionSync,
}) =>
  /**
   * @function ClientTasks#deleteSubscription
   * @param {AuthModel} authToken Authentication
   * @param {string} id Subscription id
   * @returns {Result<SubscriptionModel>}
   */
  async ({authToken, id}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(error({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to delete a subscription.',
      }));
    }

    const subscription = await subscriptionRepository.findOne({realmId, id});
    if (!subscription) {
      return failure(error({
        code: 'UnknownSubscription',
        message: 'Subscription does not exists.',
      }));
    }

    await subscriptionRepository.findOneAndDelete({realmId, id});
    sendSubscriptionSync({subscription, action: 'deleted'});
    return success(subscription);
  };
