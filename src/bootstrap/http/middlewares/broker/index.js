const initV1 = require('./v1');

module.exports = ({config, tasks}) => ({
  v1: initV1({config, tasks}),
});
