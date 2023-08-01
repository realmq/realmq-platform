const createRealmLimitsModel = require('../models/realm-limits');
const createMongoRepository = require('./lib/mongo');

/**
 * Create realm repository.
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @return {RealmLimitsRepository} The created realm repository
 */
module.exports = ({collection, createModel = createRealmLimitsModel}) => {
  const mongoRepo = createMongoRepository({collection, createModel});

  /**
   * @class RealmLimitsRepository
   * @extends MongoRepository
   */
  return {
    ...mongoRepo,
  };
};

