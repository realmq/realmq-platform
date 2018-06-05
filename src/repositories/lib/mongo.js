const uuid = require('uuid');
const repoApi = require('./mongodb');

module.exports = ({collection, createModel, generateId} = {generateId: uuid}) =>
  repoApi({collection, createModel, generateId});
