const createRepoApi = require('./mongo');
const createMultiRealmApi = require('./mongodb/multi-realm');

/**
 * Create a multi realm aware repository.
 *
 * @param {Object} collection MongoDb Collection
 * @param {Function} createModel Model factory
 * @param {Function} generateId Id generator
 * @return {{assertRealmId: assertRealmId}} the multi realm repository
 */
module.exports = ({collection, createModel, generateId}) => {
  const repoMethods = createRepoApi({collection, createModel, generateId});

  return createMultiRealmApi(repoMethods);
};
