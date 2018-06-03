const realmModel = require('../models/realm');
const MongoDbRepository = require('./lib/mongodb');

class RealmRepository extends MongoDbRepository {
  get collection() {
    return this.db.collection('realms');
  }

  toModel(data) {
    return realmModel({
      id: data.id,
      name: data.name,
      ownerAccountId: data.ownerAccountId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

module.exports = RealmRepository;
