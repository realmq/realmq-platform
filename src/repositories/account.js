const createAccountModel = require('../models/account');
const createMongoRepository = require('./lib/mongo');

/**
 * @typedef {MongoRepository} AccountRepository
 * @mixes MongoRepository
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

    /**
     * Lookup a single record by matching email.
     * @function AccountRepository~findOneByEmail
     * @param {string} email The email to search
     * @return {Promise<AccountModel>} Promised account model
     */
    findOneByEmail: email => repository.findOne({email})
  };
};

