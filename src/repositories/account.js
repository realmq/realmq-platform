const createAccountModel = require('../models/account');
const createMongoRepository = require('./lib/mongo');

/**
 * @typedef {MongoRepository} AccountRepository
 * @property {AccountRepository#findOneByEmail} findOneByEmail
 */
/**
 * Create account repository.
 *
 * @param {Collection} collection Dependency
 * @param {function} createModel Dependency
 * @return {AccountRepository} The account repository
 */
module.exports = ({collection, createModel = createAccountModel}) => {
  const repository = createMongoRepository({
    collection,
    createModel
  });

  return {
    ...repository,
    findOneByEmail: email => repository.findOne({email})
  };
};

