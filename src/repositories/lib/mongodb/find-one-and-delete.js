module.exports = ({collection, createModel}) => async (query, options) => {
  const {value} = await collection.findOneAndDelete(query, options);
  return value ? createModel(value) : null;
};
