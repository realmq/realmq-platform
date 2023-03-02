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

    /**
     * Delete all realtime connections for a given auth id in a realm.
     *
     * @param {string} realmId
     * @param {string} authId
     * @returns {Promise<void>}
     */
    async deleteAllByAuthId({realmId, authId}) {
      return multiRealmRepo.deleteMany({realmId, authId});
    },

    /**
     * Delete all realtime connections for the given user id in a realm.
     *
     * @param {string} realmId
     * @param {string} userId
     * @returns {Promise<void>}
     */
    async deleteAllByUserId({realmId, userId}) {
      return multiRealmRepo.deleteMany({realmId, userId});
    }
  };
};
