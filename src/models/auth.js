const setPropertyIfDefined = require('./lib/set-property-if-defined');

/**
 * @typedef {Object} AuthModel
 * @param {string} id
 * @param {string} userId
 * @param {boolean} isOnline
 * @param {string} token
 * @param {string} scope
 * @param {string} description
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */

/**
 * @return {AuthModel}
 */
module.exports = ({
  id,
  userId,
  isOnline,
  token,
  scope,
  description,
  createdAt,
  updatedAt,
}) => {
  const auth = {};

  setPropertyIfDefined(auth, 'id', id);
  setPropertyIfDefined(auth, 'userId', userId);
  setPropertyIfDefined(auth, 'isOnline', isOnline);
  setPropertyIfDefined(auth, 'token', token);
  setPropertyIfDefined(auth, 'scope', scope);
  setPropertyIfDefined(auth, 'description', description);
  setPropertyIfDefined(auth, 'createdAt', createdAt);
  setPropertyIfDefined(auth, 'updatedAt', updatedAt);

  return auth;
};
