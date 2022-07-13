const authToken = require('./auth-token');
const parseInternalTopic = require('./parse-internal-topic');
const parsePersistenceDuration = require('./parse-persistence-duration');
const rewriteTopicToInternal = require('./rewrite-topic-to-internal');
const generateSubscriptionSyncMessage = require('./generate-subscription-sync-message');

/** @typedef {object} Rules */
module.exports = {
  authToken,
  parseInternalTopic,
  parsePersistenceDuration,
  rewriteTopicToInternal,
  generateSubscriptionSyncMessage,
};
