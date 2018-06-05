module.exports = ({collection, createModel, generateId}) => async data => {
  const {ops} = await collection.insertOne({
    ...data,
    id: data.id || generateId(),
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return createModel(ops[0]);
};
