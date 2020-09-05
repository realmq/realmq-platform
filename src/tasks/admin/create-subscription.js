const {success, failure} = require('../../lib/result');
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
 * @returns {Promise<ChannelModel>} User
 */
const ensureChannelExists = ({channelRepository, realmId, channelId}) =>
  channelRepository.findOrCreate({realmId, id: channelId});

/**
 * Init create subscription task
 * @param {RealmRepository} realmRepository The realm repository
 * @param {UserRepository} userRepository User repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {AdminTasks#createSubscription} Task
 */
module.exports = ({
  realmRepository,
  userRepository,
  channelRepository,
  subscriptionRepository,
  sendSubscriptionSyncMessage,
}) =>
  /**
   * @function AdminTasks#createSubscription
   * @param {{id: string}} account
   * @param {string} realmId
   * @param {string} [id]
   * @param {string} [userId]
   * @param {string} [channelId]
   * @param {boolean} [allowRead]
   * @param {boolean} [allowWrite]
   * @return {Promise<Result<SubscriptionModel>>} The subscription model
   */
  async ({account, realmId, id, userId, channelId, allowRead, allowWrite}) => {
    const realm = await realmRepository.findOne({ownerAccountId: account.id, id: realmId});
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
        id,
        allowRead,
        allowWrite,
        realmId,
        userId: user.id,
        channelId: channel.id,
      });

      sendSubscriptionSyncMessage({subscription, action: 'created'});

      return success(subscription);
    } catch (error) {
      if (
        error.isRepositoryError &&
        error.isDuplicateKeyError
      ) {
        return failure(
          createTaskError({
            code: 'SubscriptionAlreadyExists',
            message: 'A subscription with the same id already exists.',
          }),
          error
        );
      }

      throw error;
    }
  };
