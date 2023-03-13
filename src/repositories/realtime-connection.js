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

    async findOneAndDeleteByClientId(clientId) {
      return multiRealmRepo.mongoRepo.findOneAndDelete({clientId});
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
      if (!userId) {
        throw new Error('Missing user id');
      }

      return multiRealmRepo.deleteMany({realmId, userId});
    },

    /**
     * Count the number of connections per user id in a realm.
     * @param {string} realmId
     * @param {string} userId
     * @returns {Promise<number>}
     */
    async countByUserId({realmId, userId}) {
      return multiRealmRepo.count({realmId, userId});
    },

    /**
     * Count the number of connections per auth id in a realm.
     * @param {string} realmId
     * @param {string} authId
     * @returns {Promise<number>}
     */
    async countByAuthId({realmId, authId}) {
      return multiRealmRepo.count({realmId, authId});
    },
  };
};
