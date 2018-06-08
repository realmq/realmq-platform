const createRealmModel = require('../models/realm');
const createMongoRepository = require('./lib/mongo');

/**
 * Create realm repository.
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @return {RealmRepository} The created realm repository
 */
module.exports = ({collection, createModel = createRealmModel}) => {
  const mongoRepo = createMongoRepository({collection, createModel});

  /**
   * @class RealmRepository
   * @extends MongoRepository
   */
  return {
    ...mongoRepo,
  };
};

