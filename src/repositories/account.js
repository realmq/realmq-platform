const createAccountModel = require('../models/account');
const createMongoRepository = require('./lib/mongo');

module.exports = ({collection, createModel} = {createModel: createAccountModel}) => {
  const repository = createMongoRepository({
    collection,
    createModel
  });

  return {
    ...repository,
    findOneByEmail: email => repository.findOne({email})
  };
};

