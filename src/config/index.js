const {env} = process;

module.exports = {
  appId: 'realmq-platform',
  http: {
    port: env.PORT || 8080
  },
  logging: {
    level: env.LOG_LEVEL || 'info'
  },
  database: {
    url: env.DB_URL || 'mongodb://realmq:realmq@database:27017/realmq'
  }
};
