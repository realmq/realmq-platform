const {env} = process;

module.exports = {
  appId: 'realmq-platform',
  http: {
    port: env.PORT || 8080
  },
  logging: {
    level: env.LOG_LEVEL || 'info'
  }
};
