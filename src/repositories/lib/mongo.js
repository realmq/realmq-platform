const uuid = require('uuid');
const paginatedListFactory = require('../../models/paginated-list');
const {id: assertId} = require('./assert');

/**
 * Create mongo repository
 *
 * @param {Collection} collection Mongodb collection
 * @param {function} createModel Model factory
 * @param {function} generateId Id generator
 * @param {function} createPaginatedList Paginated list factory
 * @return {MongoRepository} Created repository
 */
module.exports = ({collection, createModel, createPaginatedList = paginatedListFactory, generateId = uuid}) => {
  /**
   * @class MongoRepository
   */
  const mongoRepo = {
    /**
     * Create a new record.
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
     * @param {object} query Record filter
     * @return {Promise} Promised result
     */
    deleteMany: query => collection.deleteMany(query),

    /**
     * Find one record that matches the query.
     * @param {object} query Record filter
     * @return {Promise<object>} Promised model
     */
    findOne: async query => {
      const result = await collection.findOne(query);

      return result ? createModel(result) : null;
    },

    /**
     * Find one record that matches the query and remove it from the collection.
     * @param {object} query Record filter
     * @return {Promise<object>} Promised model
     */
    findOneAndDelete: async query => {
      const {value} = await collection.findOneAndDelete(query);
      return value ? createModel(value) : null;
    },

    /**
     * Find one record that matches the query and update it with given data.
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
     * @param {object} model The model to update
     * @return {Promise<object>} Promised updated model
     */
    update: async model => {
      assertId(model.id);

      return mongoRepo.findOneAndUpdate({id: model.id}, model);
    },

    /**
     * Find a paginated list of records.
     * @param {Object} query Record filter
     * @param {number} [limit] Max number of results
     * @param {number} [offset] Pagination start offset
     * @param {Object} [sort] Sorting of the result
     * @return {Promise<PaginatedList>} The paginated list of records
     */
    find: async (query, {limit, offset = 0, sort = {createdAt: -1}}) => {
      const cursor = await collection.find(query, {skip: offset, limit, sort});

      let docs = [];
      let total = 0;

      if (limit === 0) {
        // No need to fetch records
        total = await cursor.count(false);
      } else if (limit === undefined) {
        // Fetch all documents without limits
        docs = await cursor.toArray();
        total = docs.length;
      } else {
        // Fetch range of documents and total number of matching records
        [docs, total] = await Promise.all([
          cursor.toArray(),
          cursor.count(false)
        ]);
      }

      return createPaginatedList({
        items: docs.map(doc => createModel(doc)),
        total,
        limit,
        offset
      });
    }
  };

  return mongoRepo;
};
