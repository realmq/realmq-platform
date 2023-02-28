const createRealtimeConnectionModel = require('../models/realtime-connection');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

/**
 * Create realtime connection repository.
 *
 * @param {Collection} collection Mongodb repository
 * @param {function} createModel Model factory
 * @return {RealtimeConnectionRepository} The created realtime connection repository
 */
module.exports = ({collection, createModel = createRealtimeConnectionModel}) => {
  const multiRealmRepo = createMongoMultiRealmRepository({collection, createModel});

  /**
   * @class RealtimeConnectionRepository
   * @extends MongoMultiRealmRepository
   */
  return {
    ...multiRealmRepo,

    async deleteOneByClientId(clientId) {
      return multiRealmRepo.mongoRepo.deleteOne({clientId});
    },
  };
};
