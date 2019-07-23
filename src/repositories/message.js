const {Binary} = require('mongodb');
const createMessageModel = require('../models/message');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

/**
 * Create message persistence repository.
 *
 * @param {Collection} collection Mongodb repository
 * @param {function} createModel Model factory
 * @return {MessageRepository} The created message repository
 */
module.exports = ({collection, createModel = createMessageModel}) => {
  const multiRealmRepo = createMongoMultiRealmRepository({collection, createModel});

  /**
   * @class MessageRepository
   * @extends MongoMultiRealmRepository
   */
  return {
    ...multiRealmRepo,

    async create({id, realmId, channelId, content}) {
      return multiRealmRepo.create({
        id,
        realmId,
        channelId,
        content: new Binary(content),
      });
    },

    /**
     * Lookup a paginated list of messages.
     *
     * @param {Date} [from] The earliest message
     * @param {Date} [to] The latest massage
     * @param {object} rest Query
     * @param {number} [limit] Limit
     * @param {number} [offset] Offset
     * @param {object} [sort] Sorting
     * @return {Promise<PaginatedList<MessageModel>>} The paginated message list
     */
    find({from, to, ...rest}, {limit, offset, sort} = {}) {
      if (from && !(from instanceof Date)) {
        throw new Error(`Invalid value for parameter "from": ${from}`);
      }

      if (to && !(to instanceof Date)) {
        throw new Error(`Invalid value for parameter "to": ${to}`);
      }

      const query = {...rest};

      if (from || to) {
        query.createdAt = {};
      }

      if (from) {
        query.createdAt.$gte = from;
      }

      if (to) {
        query.createdAt.$lt = to;
      }

      return multiRealmRepo.find(query, {limit, offset, sort});
    },
  };
};
