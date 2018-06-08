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
     * @return {Promise} Promised execution
     */
    deleteAllByUserId: (realmId, userId) => multiRealmRepository.deleteMany({realmId, userId}),
  };
};

