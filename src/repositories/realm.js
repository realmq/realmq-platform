const createRealmModel = require('../models/realm');
const createMongoRepository = require('./lib/mongo');

module.exports = ({collection, createModel = createRealmModel}) =>
  createMongoRepository({
    collection,
    createModel
  });

