const {MongoClient} = require('mongodb');

/**
 * Connect to mongodb, create collections and necessary indexes.
 *
 * @param {Object} config Configuration
 * @param {Logger} logger Logger
 * @return {Promise<Db>} The database connection
 */
module.exports = async ({config, logger}) => {
  const client = await MongoClient.connect(config.database.url);
  logger.debug('Database connected successfully');

  const db = client.db('realmq');
  const realmAwareIdxSpec = {
    key: {realmId: 1, id: 1},
    name: 'id_realmId',
    unique: true
  };
  const customIdIdxSpec = {key: {id: 1}, name: 'id', unique: true};

  await Promise.all([
    db.createCollection('accounts'),
    db.createCollection('channels'),
    db.createCollection('users'),
    db.createCollection('realms'),
    db.createCollection('auths')
  ]);

  await Promise.all([
    db.collection('accounts').createIndexes([realmAwareIdxSpec]),
    db.collection('channels').createIndexes([realmAwareIdxSpec]),
    db.collection('users').createIndexes([realmAwareIdxSpec]),
    db.collection('realms').createIndexes([customIdIdxSpec]),
    db.collection('auths').createIndexes([
      realmAwareIdxSpec,
      {key: {token: 1}, name: 'token', unique: true}
    ])
  ]);

  logger.debug('Database collections and indexes created');

  return db;
};
