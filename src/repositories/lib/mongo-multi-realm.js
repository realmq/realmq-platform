const createMongoRepo = require('./mongo');
const {id: assertId, realmId: assertRealmId} = require('./assert');

/**
 * @typedef {MongoRepository} MongoMultiRealmRepository
 * @augments MongoRepository
 */
/**
 * Create a multi realm aware repository.
 *
 * @param {Object} collection MongoDb Collection
 * @param {Function} createModel Model factory
 * @param {Function} generateId Id generator
 * @return {MongoMultiRealmRepository} The multi realm repository
 */
module.exports = ({collection, createModel, generateId}) => {
  const mongoRepo = createMongoRepo({collection, createModel, generateId});

  const multiRealmRepo = {
    /**
     * @property {Collection} MongoMultiRealmRepository~collection
     */
    get collection() {
      return collection;
    },

    /**
     * @property {MongoRepository} MongoMultiRealmRepository~mongoRepo
     */
    get mongoRepo() {
      return mongoRepo;
    },

    create: async data => {
      assertRealmId(data.realmId);

      return mongoRepo.create(data);
    },

    deleteMany: async query => {
      assertRealmId(query.realmId);

      return mongoRepo.deleteMany(query);
    },

    findOne: async data => {
      assertRealmId(data.realmId);

      return mongoRepo.findOne(data);
    },

    findOneAndDelete: async query => {
      assertRealmId(query.realmId);

      return mongoRepo.findOneAndDelete(query);
    },

    findOneAndUpdate: async (query, data) => {
      assertRealmId(query.realmId);

      // Strip off realmId
      const {realmId, ...updateData} = data;

      return mongoRepo.findOneAndUpdate(query, updateData);
    },

    update: async model => {
      assertId(model.id);

      return multiRealmRepo.findOneAndUpdate({
        id: model.id, realmId: model.realmId
      }, model);
    }
  };

  return multiRealmRepo;
};
