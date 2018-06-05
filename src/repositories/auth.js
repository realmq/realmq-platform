const authModel = require('../models/auth');
const RealmAwareRepository = require('./lib/realm-aware');

class AuthRepository extends RealmAwareRepository {
  get collection() {
    return this.db.collection('auths');
  }

  /**
   * @param {string} token
   * @return {Promise<AuthModel|null>}
   */
  async findOneByToken(token) {
    const auth = await this.collection.findOne({token});

    return auth ? this.toModel(auth) : null;
  }

  async findByUserIdAndRemove(realmId, userId) {
    return this.collection.deleteMany({realmId, userId});
  }

  toModel(data) {
    return authModel({
      id: data.id,
      userId: data.userId,
      isOnline: data.isOnline,
      token: data.token,
      scope: data.scope,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
  }
}

module.exports = AuthRepository;
