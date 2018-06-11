const mapGenericList = require('./generic-list');
const mapChannel = require('./channel');

module.exports = list => mapGenericList({list, mapItem: mapChannel});
