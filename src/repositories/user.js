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
    ...multiRealmRepo
  };
};
