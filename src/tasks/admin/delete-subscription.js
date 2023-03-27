const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');
const createTaskError = require('../../lib/error/task');

/**
 * Init delete subscription task
 * @param {RealmRepository} realmRepository Realm repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {AdminTasks#deleteSubscription} Task
 */
module.exports = ({
  realmRepository,
  subscriptionRepository,
  sendSubscriptionSyncMessage,
}) =>
  /**
   * @function AdminTasks#deleteSubscription
   * @param {string} realmId Realm id
   * @param {string} id Subscription id
   * @returns {Result<SubscriptionModel>}
   */
  async ({realmId, id}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    const subscription = await subscriptionRepository.findOne({realmId, id});
    if (!subscription) {
      return failure(taskError({
        code: 'UnknownSubscription',
        message: 'Subscription does not exists.',
      }));
    }

    await subscriptionRepository.deleteOne({realmId, id});
    sendSubscriptionSyncMessage({subscription, action: 'deleted'});

    return success(subscription);
  };
