module.exports = ({collection, createModel}) => async (query, options) => {
  const result = await collection.findOne(query, options);

  return result ? createModel(result) : null;
};
