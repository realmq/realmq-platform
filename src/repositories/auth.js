const createAuthModel = require('../models/auth');
const createMongoMultiRealmRepository = require('./lib/mongo-multi-realm');
const createGlobalFindOne = require('./lib/mongodb/find-one');

module.exports = ({collection, createModel} = {createModel: createAuthModel}) => {
  const multiRealmRepository = createMongoMultiRealmRepository({
    collection,
    createModel
  });

  const findOneGlobally = createGlobalFindOne({collection, createModel});

  return {
    ...multiRealmRepository,
    findOneByToken: token => findOneGlobally({token}),
    deleteAllByUserId: async (realmId, userId) => multiRealmRepository.deleteMany({realmId, userId})
  };
};

