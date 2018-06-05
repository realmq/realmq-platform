const uuid = require('uuid');
const repoApi = require('./mongodb');

/**
 * @typedef {MongoRepositoryApi} MongoRepository
 */
/**
 * Create mongo repository
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @param {function} generateId Id generator
 * @return {MongoRepository} Created repository
 */
module.exports = ({collection, createModel, generateId = uuid}) =>
  repoApi({collection, createModel, generateId});
