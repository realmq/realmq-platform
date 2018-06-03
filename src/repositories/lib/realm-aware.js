const MongoDbRepository = require('./mongodb');

class RealmAwareRepository extends MongoDbRepository {
  async create(realmId, data) {
    if (!realmId) {
      throw new Error('Missing realmId');
    }

    return super.create({realmId, ...data});
  }

  async update(realmId, data) {
    if (!realmId) {
      throw new Error('Missing realmId');
    }

    if (!data.id) {
      throw new Error('Missing ID in given entity');
    }

    return this.findOneAndUpdate({id: data.id, realmId}, data);
  }

  async delete(realmId, id) {
    await this.collection.findOneAndDelete({realmId, id});
  }

  async findOneById(realmId, id) {
    return this.findOne({realmId, id});
  }
}

module.exports = RealmAwareRepository;
