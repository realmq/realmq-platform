const accountModel = require('../models/account');
const RealmAwareRepository = require('./lib/realm-aware');

class AccountRepository extends RealmAwareRepository {
  get collection() {
    return this.db.collection('accounts');
  }

  async findOneByEmail(realmId, email) {
    if (!realmId) {
      throw new Error('Missing realmId');
    }

    const account = await this.collection.findOne({realmId, email});

    return account ? this.toModel(account) : null;
  }

  toModel(data) {
    return accountModel({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

module.exports = AccountRepository;
