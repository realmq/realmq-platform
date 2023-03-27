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
     * Plain repository
     * @return {MongoRepository} The base repository
     */
    get mongoRepo() {
      return mongoRepo;
    },

    /**
     * @inheritDoc
     */
    async create(data) {
      assertRealmId(data.realmId);

      return mongoRepo.create(data);
    },

    /**
     * @inheritDoc
     */
    async count(query) {
      assertRealmId(query.realmId);

      return mongoRepo.count(query);
    },

    /**
     * @inheritDoc
     */
    async deleteMany(query) {
      assertRealmId(query.realmId);

      return mongoRepo.deleteMany(query);
    },

    /**
     * @inheritDoc
     */
    async deleteOne(query) {
      assertRealmId(query.realmId);

      return mongoRepo.deleteOne(query);
    },

    /**
     * @inheritDoc
     */
    async findOne(query) {
      assertRealmId(query.realmId);

      return mongoRepo.findOne(query);
    },

    /**
     * @inheritDoc
     */
    async findOneAndDelete(query) {
      assertRealmId(query.realmId);

      return mongoRepo.findOneAndDelete(query);
    },

    /**
     * @inheritDoc
     */
    async findOneAndUpdate(query, data) {
      assertRealmId(query.realmId);

      // Strip off realmId
      const {realmId, ...updateData} = data;

      return mongoRepo.findOneAndUpdate(query, updateData);
    },

    /**
     * @inheritDoc
     */
    async update(model) {
      assertId(model.id);

      return multiRealmRepo.findOneAndUpdate({
        id: model.id, realmId: model.realmId,
      }, model);
    },

    /**
     * @inheritDoc
     */
    async find(query, {limit, offset, sort} = {}) {
      assertRealmId(query.realmId);

      return mongoRepo.find({...query}, {limit, offset, sort});
    },
  };

  return multiRealmRepo;
};
