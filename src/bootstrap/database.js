const {MongoClient} = require('mongodb');

module.exports = async ({config, logger}) => {
  const client = await MongoClient.connect(config.database.url);
  logger.debug('Database connected successfully');

  const db = client.db('realmq');
  const realmAwareIdxSpec = {
    key: {realmId: 1, id: 1},
    name: 'id_realmId',
    unique: true,
  };
  const customIdIdxSpec = {key: {id: 1}, name: 'id', unique: true};

  await db.createCollection('accounts');
  await db.createCollection('users');
  await db.createCollection('realms');
  await db.createCollection('auths');

  await db.collection('accounts').createIndexes([realmAwareIdxSpec]);
  await db.collection('users').createIndexes([realmAwareIdxSpec]);
  await db.collection('realms').createIndexes([customIdIdxSpec]);
  await db.collection('auths').createIndexes([
    realmAwareIdxSpec,
    {key: {token: 1}, name: 'token', unique: true},
  ]);

  logger.debug('Database collections and indexes created');

  return {db};
};
