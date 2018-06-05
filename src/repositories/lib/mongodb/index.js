const create = require('./create');
const deleteMany = require('./delete-many');
const findOne = require('./find-one');
const findOneAndDelete = require('./find-one-and-delete');
const findOneAndUpdate = require('./find-one-and-update');

/**
 * @typedef {object} MongoRepositoryApi
 * @property {MongoRepositoryApi#create} create
 * @property {MongoRepositoryApi#deleteMany} deleteMany
 * @property {MongoRepositoryApi#findOne} findOne
 * @property {MongoRepositoryApi#findOneAndDelete} findOneAndDelete
 * @property {MongoRepositoryApi#findOneAndUpdate} findOneAndUpdate
 */
/**
 * Create mongo repository methods.
 *
 * @param {Collection} collection MongoDb collection
 * @param {function} createModel Model factory
 * @param {function} generateId Id generator
 * @return {MongoRepositoryApi} Mongo repository api
 */
module.exports = ({collection, createModel, generateId}) => ({
  create: create({collection, createModel, generateId}),
  deleteMany: deleteMany({collection}),
  findOne: findOne({collection, createModel}),
  findOneAndDelete: findOneAndDelete({collection, createModel}),
  findOneAndUpdate: findOneAndUpdate({collection, createModel})
});
