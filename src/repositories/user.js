const userModel = require('../models/user');
const RealmAwareRepository = require('./lib/realm-aware');

class UserRepository extends RealmAwareRepository {
  get collection() {
    return this.db.collection('users');
  }

  toModel(data) {
    return userModel({
      id: data.id,
      isOnline: data.isOnline,
      properties: data.properties,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
  }
}

module.exports = UserRepository;
