const createRealmModel = require('../models/realm');
const createMongoRepository = require('./lib/mongo');

/**
 * @typedef {MongoRepository} RealmRepository
 */
/**
 * Create realm repository.
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @return {RealmRepository} The created realm repository
 */
module.exports = ({collection, createModel = createRealmModel}) =>
  createMongoRepository({
    collection,
    createModel
  });

