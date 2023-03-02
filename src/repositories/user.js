const createUserModel = require('../models/user');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

/**
 * Create user repository.
 *
 * @param {Collection} collection Mongodb repository
 * @param {function} createModel Model factory
 * @return {UserRepository} The created user repository
 */
module.exports = ({collection, createModel = createUserModel}) => {
  const multiRealmRepo = createMongoMultiRealmRepository({collection, createModel});

  /**
   * @class UserRepository
   * @extends MongoMultiRealmRepository
   */
  return {
    ...multiRealmRepo,

    /**
     * Find or create a user by realm id and id.
     *
     * @param {string} realmId The realm id
     * @param {string} [id] The user id
     * @return {Promise<UserModel>} The promised user
     */
    async findOrCreate({realmId, id}) {
      let user;

      if (id) {
        user = await multiRealmRepo.findOne({id, realmId});
      }

      if (!user) {
        user = await multiRealmRepo.create({id, realmId});
      }

      return user;
    },

    /**
     * Set isOnline status of the given user record.
     * @param {string} realmId
     * @param {string} id
     * @param {boolean} isOnline
     * @returns {Promise<void>}
     */
    async setIsOnline({realmId, id, isOnline}) {
      if (!id) {
        throw new Error('Missing id');
      }

      await multiRealmRepo.update({realmId, id, isOnline})
    }
  };
};
