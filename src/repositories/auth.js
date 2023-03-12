const createAuthModel = require('../models/auth');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

/**
 * Create auth repository.
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @return {AuthRepository} The created auth repository
 */
module.exports = ({collection, createModel = createAuthModel}) => {
  const multiRealmRepository = createMongoMultiRealmRepository({
    collection,
    createModel,
  });

  /**
   * @class AuthRepository
   * @extends MongoMultiRealmRepository
   */
  return {
    ...multiRealmRepository,

    /**
     * Lookup auth model by access token.
     *
     * @param {string} token Unique access token
     * @return {AuthModel} The auth model
     */
    findOneByToken: token => multiRealmRepository.mongoRepo.findOne({token}),

    /**
     * Remove all auth tokens for the given user id.
     *
     * @param {string} realmId The realm context
     * @param {string} userId The user id
     */
    async deleteAllByUserId({realmId, userId}) {
      if (!userId) {
        throw new Error('Missing user id.');
      }

      await multiRealmRepository.deleteMany({realmId, userId});
    },

    /**
     * Set isOnline status of the given auth record.
     * @param {string} realmId
     * @param {string} id
     * @param {boolean} isOnline
     * @returns {Promise<void>}
     */
    async setIsOnline({realmId, id, isOnline}) {
      if (!id) {
        throw new Error('Missing id');
      }

      await multiRealmRepository.update({realmId, id, isOnline});
    },
  };
};

