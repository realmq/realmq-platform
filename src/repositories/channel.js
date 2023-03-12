const createChannelModel = require('../models/channel');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');
const {realmId: assertRealmId} = require('./lib/assert');

/**
 * Create channel repository.
 *
 * @param {Collection} collection Mongodb repository
 * @param {function} createModel Model factory
 * @return {ChannelRepository} The created user repository
 */
module.exports = ({collection, createModel = createChannelModel}) => {
  const multiRealmRepo = createMongoMultiRealmRepository({collection, createModel});

  /**
   * @class ChannelRepository
   * @extends MongoMultiRealmRepository
   */
  return {
    ...multiRealmRepo,

    /**
     * Lookup a paginated list of channels.
     *
     * @param {string} realmId Realm context
     * @param {string[]} ids List of channel ids to lookup
     * @param {number} offset Pagination start
     * @param {number} limit Max results
     * @return {Promise<PaginatedList<ChannelModel>>} Paginated list of channels
     */
    async findByIds({realmId, ids}, {offset, limit} = {}) {
      assertRealmId(realmId);

      return multiRealmRepo.find({
        realmId,
        id: {$in: ids},
      }, {offset, limit});
    },

    /**
     * Find or create a channel by realm id and id.
     *
     * @param {string} realmId The realm id
     * @param {string} [id] The channel id
     * @return {Promise<ChannelModel>} The promised channel
     */
    async findOrCreate({realmId, id}) {
      let channel;

      if (id) {
        channel = await multiRealmRepo.findOne({id, realmId});
      }

      if (!channel) {
        channel = await multiRealmRepo.create({id, realmId});
      }

      return channel;
    },
  };
};
