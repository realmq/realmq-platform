const {MongoClient} = require('mongodb');

/**
 * Connect to mongodb, create collections and necessary indexes.
 *
 * @param {Object} config Configuration
 * @param {Logger} logger Logger
 * @return {Promise<Db>} The database connection
 */
module.exports = async ({config, logger}) => {
  const client = await MongoClient.connect(config.database.url, {useNewUrlParser: true});
  logger.debug('Database connected successfully');

  const db = client.db('realmq');
  const realmAwareIdxSpec = {
    key: {realmId: 1, id: 1},
    name: 'id_realmId',
    unique: true,
  };

  await Promise.all([
    db.collection('auths').createIndexes([
      realmAwareIdxSpec,
      {key: {token: 1}, name: 'token', unique: true},
    ]),
    db.collection('channels').createIndexes([realmAwareIdxSpec]),
    db.collection('messages').createIndexes([
      realmAwareIdxSpec,
      {key: {realmId: 1, channelId: 1, createdAt: 1}, name: 'realmId_channelId_createdAt'},
    ]),
    db.collection('realtime-connections').createIndexes([
      realmAwareIdxSpec,
      {key: {realmId: 1, tokenId: 1}, name: 'realmId_tokenId'},
      {key: {realmId: 1, userId: 1}, name: 'realmId_userId'},
      {key: {clientId: 1}, name: 'clientId', unique: true},
    ]),
    db.collection('subscriptions').createIndexes([
      realmAwareIdxSpec,
      {key: {realmId: 1, userId: 1, channelId: 1}, name: 'realmId_userId_channelId', unique: true},
    ]),
    db.collection('users').createIndexes([realmAwareIdxSpec]),
  ]);

  logger.debug('Database collections and indexes created');

  return db;
};
