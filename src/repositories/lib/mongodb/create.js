/**
 * Create a new document within a collection.
 *
 * @param {Collection} collection MongoDb collection
 * @param {function} createModel Model factory
 * @param {function} generateId Id generator function
 * @return {MongoRepositoryApi#create} The promised model creation
 */
module.exports = ({collection, createModel, generateId}) =>
  /**
   * @typedef {Function} MongoRepositoryApi#create
   * @param {object} data
   * @return {Promise<object>}
   */
  async data => {
    const {ops} = await collection.insertOne({
      ...data,
      id: data.id || generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return createModel(ops[0]);
  };
