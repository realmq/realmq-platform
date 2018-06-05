const bootstrapDatabase = require('./database');
const bootstrapHttp = require('./http');

/**
 * Bootstrap all services.
 *
 * @param {Object} config Configuration
 * @param {Object} logger Logger
 * @return {Promise<{db: Object, http: Object}>} Resolves with bootstrapped services.
 */
module.exports = async ({config, logger}) => {
  const [db, http] = await Promise.all([
    bootstrapDatabase({config, logger}),
    bootstrapHttp({config, logger})
  ]);

  return {db, http};
};
