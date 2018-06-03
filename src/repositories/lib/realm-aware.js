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

    // Strip createdAt
    const {createdAt, ...updateData} = data;

    updateData.updatedAt = new Date();
    const result = await this.collection.findOneAndUpdate(
      {id: data.id, realmId},
      {$set: updateData},
      {returnOriginal: false}
    );

    return result.value ? this.toModel(result.value) : null;
  }

  async delete(realmId, id) {
    await this.collection.findOneAndDelete({realmId, id});
  }

  async findOneById(realmId, id) {
    const result = await this.collection.findOne({realmId, id});

    return result ? this.toModel(result) : null;
  }
}

module.exports = RealmAwareRepository;
