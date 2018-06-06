const createMongoRepo = require('./mongo');
const {id: assertId, realmId: assertRealmId} = require('./assert');

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

  /**
   * @class MongoMultiRealmRepository
   * @extends MongoRepository
   */
  const multiRealmRepo = {
    /**
     * Collection
     * @return {Collection} the collection
     */
    get collection() {
      return collection;
    },

    /**
     * Plain repository
     * @return {MongoRepository} The base repository
     */
    get mongoRepo() {
      return mongoRepo;
    },

    /**
     * @inheritDoc
     */
    create: async data => {
      assertRealmId(data.realmId);

      return mongoRepo.create(data);
    },

    /**
     * @inheritDoc
     */
    deleteMany: async query => {
      assertRealmId(query.realmId);

      return mongoRepo.deleteMany(query);
    },

    /**
     * @inheritDoc
     */
    findOne: async data => {
      assertRealmId(data.realmId);

      return mongoRepo.findOne(data);
    },

    /**
     * @inheritDoc
     */
    findOneAndDelete: async query => {
      assertRealmId(query.realmId);

      return mongoRepo.findOneAndDelete(query);
    },

    /**
     * @inheritDoc
     */
    findOneAndUpdate: async (query, data) => {
      assertRealmId(query.realmId);

      // Strip off realmId
      const {realmId, ...updateData} = data;

      return mongoRepo.findOneAndUpdate(query, updateData);
    },

    /**
     * @inheritDoc
     */
    update: async model => {
      assertId(model.id);

      return multiRealmRepo.findOneAndUpdate({
        id: model.id, realmId: model.realmId
      }, model);
    }
  };

  return multiRealmRepo;
};
