const accountModel = require('../models/account');
const MongoDbRepository = require('./mongodb');

class AccountRepository extends MongoDbRepository {
  get collection() {
    return this.db.collection('accounts');
  }

  async findOneByEmail(email) {
    const account = await this.collection.findOne({email});

    return account ? this.toModel(account) : null;
  }

  toModel(data) {
    return accountModel({
      id: data._id ? data._id.toString() : data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      tenantId: data.tenantId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

module.exports = AccountRepository;
