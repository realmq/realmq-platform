const createUserModel = require('../models/user');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');

module.exports = ({collection, createModel = createUserModel}) =>
  createMongoMultiRealmRepository({
    collection,
    createModel
  });

