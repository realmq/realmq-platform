const createSubscriptionModel = require('../models/subscription');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');
const {realmId: assertRealmId} = require('./lib/assert');

/**
 * Create subscription repository.
 *
 * @param {Collection} collection Mongodb repository
 * @param {function} createModel Model factory
 * @return {SubscriptionRepository} The created user repository
 */
module.exports = ({collection, createModel = createSubscriptionModel}) => {
  const multiRealmRepo = createMongoMultiRealmRepository({collection, createModel});

  /**
   * @class SubscriptionRepository
   * @extends MongoMultiRealmRepository
   */
  return {
    ...multiRealmRepo,

    /**
     * Lookup a paginated list of subscriptions.
     *
     * @param {string} realmId Realm context
     * @param {string[]} ids List of subscription ids to lookup
     * @param {number} offset Pagination start
     * @param {number} limit Max results
     * @return {Promise<PaginatedList<SubscriptionModel>>} Paginated list of subscriptions
     */
    async findByIds({realmId, ids}, {offset, limit} = {}) {
      assertRealmId(realmId);

      return multiRealmRepo.find({
        realmId,
        id: {$in: ids},
      }, {offset, limit});
    },

    /**
     * Find a subscription of a given channel and user.
     *
     * @param {string} realmId Realm context
     * @param {string} channelId Id of channel to find subscription for
     * @param {string} userId Id of user to find subscription for
     * @returns {Promise<?SubscriptionModel>} Subscription
     */
    async findOneByChannelAndUserId({realmId, channelId, userId}) {
      if (!channelId) {
        throw new Error('Missing channel id.');
      }

      if (!userId) {
        throw new Error('Missing user id.');
      }

      return multiRealmRepo.findOne({
        realmId, channelId, userId,
      });
    },

    /**
     * Find all subscriptions on a given channel.
     *
     * @param {string} realmId Realm context
     * @param {string} channelId Id of channel to find subscriptions for
     * @returns {Promise<PaginatedList<SubscriptionModel>>} Paginated list of subscriptions
     */
    async findAllByChannelId({realmId, channelId}) {
      if (!channelId) {
        throw new Error('Missing channel id.');
      }

      return multiRealmRepo.find({
        realmId,
        channelId,
      });
    },

    /**
     * Find all subscriptions of a given user.
     *
     * @param {string} realmId Realm context
     * @param {string} userId Id of user to find subscription for
     * @param {number} limit Limit
     * @param {number} offset Offset
     * @returns {Promise<PaginatedList<SubscriptionModel>>} Paginated list of subscriptions
     */
    async findAllByUserId({realmId, userId}, {limit, offset} = {}) {
      if (!userId) {
        throw new Error('Missing user id.');
      }

      return multiRealmRepo.find({realmId, userId}, {limit, offset});
    },

    /**
     * Remove all subscriptions from the given channel.
     *
     * @param {string} realmId Realm context
     * @param {string} channelId Id of channel to remove subscriptions for
     * @returns {Promise<void>} Nothing
     */
    async findByChannelIdAndRemove({realmId, channelId}) {
      if (!channelId) {
        throw new Error('Missing channel id.');
      }

      await multiRealmRepo.deleteMany({realmId, channelId});
    },

    /**
     * Remove all subscriptions of the given user.
     *
     * @param {string} realmId Realm context
     * @param {string} userId Id of user to remove subscriptions for
     * @returns {Promise<void>} Nothing
     */
    async findByUserIdAndRemove({realmId, userId}) {
      if (!userId) {
        throw new Error('Missing user id.');
      }

      await multiRealmRepo.deleteMany({realmId, userId});
    },
  };
};
