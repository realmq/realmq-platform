const create = require('./create');
const deleteMany = require('./delete-many');
const findOne = require('./find-one');
const findOneAndDelete = require('./find-one-and-delete');
const findOneAndUpdate = require('./find-one-and-update');

module.exports = ({collection, createModel, generateId}) => ({
  create: create({collection, createModel, generateId}),
  deleteMany: deleteMany({collection}),
  findOne: findOne({collection, createModel}),
  findOneAndDelete: findOneAndDelete({collection, createModel}),
  findOneAndUpdate: findOneAndUpdate({collection, createModel})
});
