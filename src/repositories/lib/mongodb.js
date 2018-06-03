const uuid = require('uuid').v4;

/**
 * Abstract class for MongoDB repositories
 */
class MongoDbRepository {
  /**
   * @param {Db} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * @return {Collection}
   */
  get collection() {
    throw new Error('No collection specified');
  }

  /**
   * @return {Object}
   */
  toModel() {
    throw new Error('toModel method not implemented');
  }

  /**
   * Creates a new entity in the database
   *
   * @param {Object} data
   * @return {Promise<Object>}
   */
  async create(data) {
    data.id = data.id || uuid();
    data.createdAt = new Date();
    data.updatedAt = new Date();

    const result = await this.collection.insertOne(data);

    const entity = (result.ops || [])[0];

    return this.toModel(entity);
  }

  /**
   * Updates an existing entity. If the entity does not exist it will resolve with null.
   *
   * @param {Object} data
   * @return {Promise<Object|null>}
   */
  async update(data) {
    if (!data.id) {
      throw new Error('Missing ID in given entity');
    }

    // Strip createdAt
    const {createdAt, ...updateData} = data;

    updateData.updatedAt = new Date();
    const result = await this.collection.findOneAndUpdate(
      {id: data.id},
      {$set: updateData},
      {returnOriginal: false}
    );

    return result.value ? this.toModel(result.value) : null;
  }

  /**
   * Deletes an existing entity.
   *
   * @param {string} id
   * @return {Promise<void>}
   */
  async delete(id) {
    await this.collection.findOneAndDelete({id});
  }

  /**
   * Finds and entity by its id
   *
   * @param {string} id
   * @return {Promise<Object|null>}
   */
  async findOneById(id) {
    const result = await this.collection.findOne({id});

    return result ? this.toModel(result) : null;
  }
}

module.exports = MongoDbRepository;
