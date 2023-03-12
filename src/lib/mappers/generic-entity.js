/**
 * @typedef {Function} GenericModelMapper
 * @template DataModel, ViewModel
 * @param {DataModel} entity The data model
 * @param {object} propertyMap The property mappings information
 * @return {ViewModel} The mapped view model
 */
module.exports = ({entity, propertyMap = {}}) =>
  Object.keys(propertyMap).reduce(
    (mapped, prop) => {
      mapped[propertyMap[prop]] = entity[prop];
      return mapped;
    },
    {},
  );
