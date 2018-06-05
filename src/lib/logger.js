const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');

module.exports = ({name, level}) => {
  return bunyan.createLogger({
    name,
    level: level || 'info',
    stream: bunyanFormat({outputMode: 'long'})
  });
};
