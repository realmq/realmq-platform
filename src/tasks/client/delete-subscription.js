const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

/**
 * Init delete subscription task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {ClientTasks#deleteSubscription} Task
 */
module.exports = ({
  subscriptionRepository,
  sendSubscriptionSyncMessage,
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
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to delete a subscription.',
      }));
    }

    const subscription = await subscriptionRepository.findOne({realmId, id});
    if (!subscription) {
      return failure(taskError({
        code: 'UnknownSubscription',
        message: 'Subscription does not exists.',
      }));
    }

    await subscriptionRepository.findOneAndDelete({realmId, id});
    sendSubscriptionSyncMessage({subscription, action: 'deleted'});
    return success(subscription);
  };
