const createUserModel = require('../models/user');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

/**
 * @typedef {MongoMultiRealmRepository} UserRepository
 */
/**
 * Create user repository.
 *
 * @param {Collection} collection Mongodb repository
 * @param {function} createModel Model factory
 * @return {UserRepository} The created user repository
 */
module.exports = ({collection, createModel = createUserModel}) =>
  createMongoMultiRealmRepository({
    collection,
    createModel
  });

