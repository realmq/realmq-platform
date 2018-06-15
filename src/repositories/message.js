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
  };
};
