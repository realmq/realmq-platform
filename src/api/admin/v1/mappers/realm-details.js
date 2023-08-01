const mapRealm = require('./realm');
const mapGenericEntity = require('../../../../lib/mappers/generic-entity');

/**
 * @class RealmViewModel
 * @property {string} id
 * @property {string} name
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
/**
 * Map a realm to detail response view model
 * @param {object} args
 * @param {RealmModel} args.realm The realm entity
 * @param {RealmLimitsModel} args.realmLimits The realm limits entity
 * @return {RealmViewModel} The realm view model
 */
module.exports = ({realm, realmLimits}) => ({
  ...mapRealm(realm),
  limits: mapGenericEntity({
    entity: realmLimits,
    propertyMap: {
      maxConnections: 'maxConnections',
      sessionMaxMessageRate: 'sessionMaxMessageRate',
      sessionMaxConnectionLifetime: 'sessionMaxConnectionLifetime',
      sessionMaxMessageSize: 'sessionMaxMessageSize',
    }
  }),
});

