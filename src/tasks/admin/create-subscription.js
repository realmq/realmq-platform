const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');
const createTaskError = require('../../lib/error/task');

/**
 * Ensure user exists
 * @param {UserRepository} userRepository User repository
 * @param {string} realmId Realm id
 * @param {string} userId User id
 * @returns {Promise<UserModel>} User
 */
const ensureUserExists = ({userRepository, realmId, userId}) =>
  userRepository.findOrCreate({realmId, id: userId});

/**
 * Ensure channel exists
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {string} realmId Realm id
 * @param {string} channelId Channel id
 * @returns {Promise<ChannelModel>} Channel
 */
const ensureChannelExists = ({channelRepository, realmId, channelId}) =>
  channelRepository.findOrCreate({realmId, id: channelId});

/**
 * Init create subscription task
 * @param {UserRepository} userRepository User repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {RealmRepository} realmRepository Realm repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {ClientTasks#createSubscription} Task
 */
module.exports = ({
  userRepository,
  channelRepository,
  realmRepository,
  subscriptionRepository,
  sendSubscriptionSyncMessage,
}) =>
  /**
   * @function AdminTasks#createSubscription
   * @param {string} realmId Realm id
   * @param {string} [id] Custom subscription id
   * @param {string} [userId] User id
   * @param {string} [channelId] Channel id
   * @param {boolean} allowWrite Whether user can publish on the channel
   * @param {boolean} allowRead Whether user can subscribe to the channel
   * @returns {Result<SubscriptionModel>}
   */
  async ({realmId, id, userId, channelId, allowWrite, allowRead}) => {
    const realm = await realmRepository.findOne({id: realmId});
    if (!realm) {
      return failure(createTaskError({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      }));
    }

    const [user, channel] = await Promise.all([
      ensureUserExists({userRepository, realmId, userId}),
      ensureChannelExists({channelRepository, realmId, channelId}),
    ]);

    try {
      const subscription = await subscriptionRepository.create({
        realmId,
        id,
        userId: user.id,
        channelId: channel.id,
        allowWrite,
        allowRead,
      });

      sendSubscriptionSyncMessage({subscription, action: 'created'});

      return success(subscription);
    } catch (error) {
      if (
        error.isRepositoryError
        && error.isDuplicateKeyError
      ) {
        return failure(
          taskError({
            code: 'SubscriptionAlreadyExists',
            message: 'A subscription with the same id already exists.',
          }),
          error,
        );
      }

      throw error;
    }
  };
