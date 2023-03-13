/**
 * @typedef {Function} GenericModelMapper
 * @template DataModel, ViewModel
 * @param {DataModel} entity The data model
 * @param {object} propertyMap The property mappings information
 * @return {ViewModel} The mapped view model
 */
module.exports = ({entity, propertyMap = {}}) => {
  const mapped = {};

  for (const prop of Object.keys(propertyMap)) {
    mapped[propertyMap[prop]] = entity[prop];
  }

  return mapped;
};
