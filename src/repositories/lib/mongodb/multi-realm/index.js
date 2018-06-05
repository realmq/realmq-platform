const assertRealmId = require('./assert-realm-id');
const multiRealmCreate = require('./create');
const multiRealmDeleteMany = require('./delete-many');
const multiRealmFindOne = require('./find-one');
const multiRealmFindOneAndDelete = require('./find-one-and-delete');
const multiRealmFindOneAndUpdate = require('./find-one-and-update');

module.exports = ({create, deleteMany, findOne, findOneAndDelete, findOneAndUpdate}) => ({
  assertRealmId,
  create: multiRealmCreate({create}),
  deleteMany: multiRealmDeleteMany({deleteMany}),
  findOne: multiRealmFindOne({findOne}),
  findOneAndDelete: multiRealmFindOneAndDelete({findOneAndDelete}),
  findOneAndUpdate: multiRealmFindOneAndUpdate({findOneAndUpdate})
});
