const realmModel = require('../models/realm');
const MongoDbRepository = require('./mongodb-repository');

class RealmRepository extends MongoDbRepository {
  get collection() {
    return this.db.collection('realms');
  }

  toModel(data) {
    return realmModel({
      id: data._id ? data._id.toString() : data.id,
      name: data.name,
      tenantId: data.tenantId,
    });
  }
}

module.exports = RealmRepository;
