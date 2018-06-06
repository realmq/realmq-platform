const createAuthModel = require('../models/auth');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

/**
 * @typedef {MongoMultiRealmRepository} AuthRepository
 * @mixes MongoMultiRealmRepository
 */
/**
 * Create auth repository.
 *
 * @param {Collection} collection Mongodb collection
 * @param {MongoMultiRealmRepository} createModel Model factory
 * @return {AuthRepository} The created auth repository
 */
module.exports = ({collection, createModel = createAuthModel}) => {
  const multiRealmRepository = createMongoMultiRealmRepository({
    collection,
    createModel
  });

  return {
    ...multiRealmRepository,

    /**
     * Lookup auth model by access token.
     *
     * @function AuthRepository~findOneByToken
     * @param {string} token Unique access token
     * @return {AuthModel} The auth model
     */
    findOneByToken: token => multiRealmRepository.mongoRepo.findOne({token}),

    /**
     * Remove all auth tokens for the given user id.
     *
     * @function AuthRepository~deleteAllByUserId
     * @param {string} realmId The realm context
     * @param {string} userId The user id
     * @return {Promise} Promised execution
     */
    deleteAllByUserId: (realmId, userId) => multiRealmRepository.deleteMany({realmId, userId})
  };
};

