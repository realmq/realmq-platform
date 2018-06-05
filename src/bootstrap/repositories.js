const AuthRepository = require('../repositories/auth');

module.exports = ({db}) => ({
  auth: new AuthRepository(db)
});
