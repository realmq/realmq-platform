module.exports = ({entity, propertyMap = {}}) =>
  Object.keys(propertyMap).reduce(
    (mapped, prop) => {
      mapped[propertyMap[prop]] = entity[prop];
      return mapped;
    },
    {}
  );
