const realmModel = require('../models/realm');
const MongoDbRepository = require('./mongodb');

class RealmRepository extends MongoDbRepository {
  get collection() {
    return this.db.collection('realms');
  }

  toModel(data) {
    return realmModel({
      id: data._id ? data._id.toString() : data.id,
      name: data.name,
      tenantId: data.tenantId,
      ownerAccountId: data.ownerAccountId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

module.exports = RealmRepository;
