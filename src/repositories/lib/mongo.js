const uuid = require('uuid');
const {id: assertId} = require('./assert');

/**
 * @typedef {object} MongoRepository
 */
/**
 * Create mongo repository
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @param {function} generateId Id generator
 * @return {MongoRepository} Created repository
 */
module.exports = ({collection, createModel, generateId = uuid}) => {
  const mongoRepo = {
    /**
     * @property {Collection} MongoRepository~collection
     */
    get collection() {
      return collection;
    },

    /**
     * Create a new record.
     * @function MongoRepository~create
     * @param {object} data Model data
     * @return {Promise<object>} The created model
     */
    create: async data => {
      const model = createModel({
        ...data,
        id: data.id || generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const {ops} = await collection.insertOne(model);

      return createModel(ops[0]);
    },

    /**
     * Delete all documents within a collection that match the query.
     * @function MongoRepository~deleteMany
     * @param {object} query Record filter
     * @return {Promise} Promised result
     */
    deleteMany: query => collection.deleteMany(query),

    /**
     * Find one record that matches the query.
     * @function MongoRepository~findOne
     * @param {object} query Record filter
     * @return {Promise<object>} Promised model
     */
    findOne: async query => {
      const result = await collection.findOne(query);

      return result ? createModel(result) : null;
    },

    /**
     * Find one record that matches the query and remove it from the collection.
     * @function MongoRepository~findOneAndDelete
     * @param {object} query Record filter
     * @return {Promise<object>} Promised model
     */
    findOneAndDelete: async query => {
      const {value} = await collection.findOneAndDelete(query);
      return value ? createModel(value) : null;
    },

    /**
     * Find one record that matches the query and update it with given data.
     * @function MongoRepository~findOneAndUpdate
     * @param {object} query Record filter
     * @param {object} data Update data
     * @return {Promise<object>} Promised updated model
     */
    findOneAndUpdate: async (query, data) => {
      // Strip createdAt
      const {createdAt, ...updateData} = createModel(data);

      updateData.updatedAt = new Date();
      const result = await collection.findOneAndUpdate(
        query,
        {$set: updateData},
        {returnOriginal: false}
      );

      return result.value ? createModel(result.value) : null;
    },

    /**
     * Find record by model id and update it with given data.
     * @function MongoRepository~update
     * @param {object} model The model to update
     * @return {Promise<object>} Promised updated model
     */
    update: async model => {
      assertId(model.id);

      return mongoRepo.findOneAndUpdate({id: model.id}, model);
    }
  };

  return mongoRepo;
};
