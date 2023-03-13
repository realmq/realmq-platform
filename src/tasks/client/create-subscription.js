const {success, failure} = require('../../lib/result');
const taskError = require('../../lib/error/task');

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
 * @param {UserRepository} userRepository User repository
 * @param {ChannelRepository} channelRepository Channel repository
 * @param {SubscriptionRepository} subscriptionRepository Subscription repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {ClientTasks#createSubscription} Task
 */
module.exports = ({
  userRepository,
  channelRepository,
  subscriptionRepository,
  sendSubscriptionSyncMessage,
}) =>
  /**
   * @function ClientTasks#createSubscription
   * @param {AuthModel} authToken Authentication
   * @param {object} data Entity data
   * @returns {Result<SubscriptionModel>}
   */
  async ({authToken, data}) => {
    const {scope, realmId} = authToken;

    if (scope !== 'admin') {
      return failure(taskError({
        code: 'InsufficientPrivileges',
        message: 'Insufficient privileges to create a subscription.',
      }));
    }

    const {userId: requestedUserId, channelId: requestedChannelId} = data;
    const [user, channel] = await Promise.all([
      ensureUserExists({userRepository, realmId, userId: requestedUserId}),
      ensureChannelExists({channelRepository, realmId, channelId: requestedChannelId}),
    ]);

    try {
      const subscription = await subscriptionRepository.create({
        ...data,
        realmId,
        userId: user.id,
        channelId: channel.id,
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
