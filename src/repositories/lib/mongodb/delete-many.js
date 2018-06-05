/**
 * @param {Collection} collection MongoDb collection
 * @return {MongoRepositoryApi#deleteMany} The promised model creation
 */
module.exports = ({collection}) =>
  /**
   * Delete all a new document within a collection.
   *
   * @typedef {Function} MongoRepositoryApi#deleteMany
   * @param {object} query
   * @return {Promise}
   */
  query => collection.deleteMany(query);
