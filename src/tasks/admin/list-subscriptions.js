const {success, failure} = require('../../lib/result');
const createTaskError = require('../../lib/error/task');

/**
 * Init list subscriptions task
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {RealmRepository} realmRepository Realm repository
 * @returns {AdminTasks#listSubscriptions} Task
 */
module.exports = ({subscriptionRepository, realmRepository}) =>
  /**
   * @function AdminTasks#listSubscriptions
   * @param {string} realmId Realm id
   * @param {number} offset Offset
   * @param {number} limit Limit
   * @returns {Result<PaginatedList<SubscriptionModel>>}
   */
  async ({realmId, offset, limit}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    const list = await subscriptionRepository.find({realmId}, {offset, limit});

    return success(list);
  };
