const mapGeneric = require('./generic-entity');

module.exports = entity => mapGeneric({
  entity,
  propertyMap: {
    id: 'id',
    features: 'features',
    properties: 'properties',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
