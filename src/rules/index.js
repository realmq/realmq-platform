const account = require('./account');
const authToken = require('./auth-token');
const parseInternalTopic = require('./parse-internal-topic');
const parsePersistenceDuration = require('./parse-persistence-duration');
const rewriteTopicToInternal = require('./rewrite-topic-to-internal');
const subscriptionSyncMessage = require('./subscription-sync-message');

/** @typedef {object} Rules */
module.exports = {
  account,
  authToken,
  parseInternalTopic,
  parsePersistenceDuration,
  rewriteTopicToInternal,
  subscriptionSyncMessage,
};
