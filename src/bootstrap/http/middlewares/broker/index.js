const initV1 = require('./v1');

module.exports = ({tasks}) => ({
  v1: initV1({tasks}),
});
