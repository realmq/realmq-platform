const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');

module.exports = ({name, level}) => bunyan.createLogger({
  name,
  level: level || 'info',
  stream: bunyanFormat({outputMode: 'long'}),
});
