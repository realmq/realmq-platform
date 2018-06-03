const {ObjectID: objectId} = require('mongodb');

/**
 * Converts given ID into ObjectID if it's a valid ObjectID and returns it,
 * otherwise returns original
 *
 * @param {string} id
 * @return {ObjectID|string}
 */
const plainOrObjectId = id => (objectId.isValid(id) ? objectId(id) : id);

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
    const {id, ...createData} = data;

    if (id) {
      createData._id = plainOrObjectId(id);
    }

    createData.createdAt = new Date();
    createData.updatedAt = new Date();
    const result = await this.collection.insertOne(createData);
    const createdEntity = (result.ops || [])[0];

    return this.toModel(createdEntity);
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

    const {id, createdAt, ...updateData} = data;
    updateData.updatedAt = new Date();
    const result = await this.collection.findOneAndUpdate(
      {_id: plainOrObjectId(id)},
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
    await this.collection.findOneAndDelete({_id: plainOrObjectId(id)});
  }

  /**
   * Finds and entity by its id
   *
   * @param {string} id
   * @return {Promise<Object|null>}
   */
  async findOneById(id) {
    const result = await this.collection.findOne({_id: plainOrObjectId(id)});

    return result ? this.toModel(result) : null;
  }
}

module.exports = MongoDbRepository;
