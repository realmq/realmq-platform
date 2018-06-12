const mapGenericEntity = require('../../../../lib/mappers/generic-entity');

/**
 * @class AccountViewModel
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * Map an account to response view model
 * @param {AccountModel} account The account entity
 * @return {AccountViewModel} The account view model
 */
module.exports = account => mapGenericEntity({
  entity: account,
  propertyMap: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

