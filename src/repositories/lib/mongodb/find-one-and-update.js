module.exports = ({collection, createModel}) => async (filter, data) => {
  // Strip createdAt
  const {createdAt, ...updateData} = data;

  updateData.updatedAt = new Date();
  const result = await collection.findOneAndUpdate(
    filter,
    {$set: updateData},
    {returnOriginal: false}
  );

  return result.value ? createModel(result.value) : null;
};
