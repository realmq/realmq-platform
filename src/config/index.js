module.exports = (env = {}) => ({
  appId: 'realmq-platform',
  http: {
    port: env.PORT || 8080,
  },
  logging: {
    level: env.LOG_LEVEL || 'info',
  },
  database: {
    url: env.DB_URL || 'mongodb://realmq:realmq@database:27017/realmq',
  },
  api: {
    broker: {
      key: env.API_BROKER_KEY || null,
    },
  },
  broker: {
    protocol: env.BROKER_PROTOCOL || 'mqtt',
    host: env.BROKER_HOST || 'broker',
    port: env.BROKER_PORT || '1883',
    username: env.BROKER_USERNAME || 'adapter',
    password: env.BROKER_PASSWORD || 'adapter',
  },
});
