const messageModel = require('../../../../models/message');

const knownRealmId = 'known-realm-id';
const unknownRealmId = 'unknown-realm-id';
const knownChannelId = 'known-channel-id';
const unknownChannelId = 'unknown-channel-id';
const knownMessageId = 'known-message-id';
const unknownMessageId = 'unknown-message-id';

const validMessage = messageModel({
  id: knownMessageId,
  realmId: knownRealmId,
  channelId: knownChannelId,
  content: Buffer.from('message content'),
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  knownRealmId,
  knownChannelId,
  unknownRealmId,
  unknownChannelId,
  knownMessageId,
  unknownMessageId,
  validMessage,

  async create({realmId, channelId, content}) {
    return messageModel({
      realmId,
      channelId,
      content: Buffer.from(content),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
};
