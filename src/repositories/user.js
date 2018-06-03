const userModel = require('../models/user');
const MongoDbRepository = require('./mongodb');

class UserRepository extends MongoDbRepository {
  get collection() {
    return this.db.collection('users');
  }

  toModel(data) {
    return userModel({
      id: data._id ? data._id.toString() : data.id,
      isOnline: data.isOnline,
      properties: data.properties,
      tenantId: data.tenantId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

module.exports = UserRepository;
