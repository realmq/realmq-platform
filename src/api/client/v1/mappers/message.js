const mapGeneric = require('../../../../lib/mappers/generic-entity');
/**
 * @class MessageViewModel
 * @property {string} id
 * @property {string} content Base64 encoded message content.
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * @param {MessageModel} entity The message to map
 * @return {MessageViewModel} The mapped message model
 */
module.exports = entity => {
  const message = {...entity};

  if (!entity.content) {
    message.content = '';
  } else if (entity.content.buffer) {
    message.content = entity.content.buffer.toString('base64');
  } else {
    message.content = Buffer.from(entity.content).toString('base64');
  }

  return mapGeneric({
    entity: message,
    propertyMap: {
      id: 'id',
      content: 'content',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });
};
