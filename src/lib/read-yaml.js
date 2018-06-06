const {readFile, readFileSync} = require('fs');
const {dirname} = require('path');
const {safeLoad: parseYaml, Type: YamlType, Schema: {create: createSchema}} = require('js-yaml');

const buildSchema = (path, readYaml) => {
  const dir = dirname(path);
  const includeType = new YamlType('!include', {
    kind: 'scalar',
    construct: path => {
      if (path[0] !== '/') {
        path = `${dir}/${path}`;
      }
      try {
        return readYaml(path);
      } catch (err) {
        return `[Error: ${err.message}]`;
      }
    }
  });
  return createSchema([includeType]);
};

const readYamlSync = path => {
  const data = readFileSync(path, {encoding: 'utf-8'});
  const schema = buildSchema(path, readYamlSync);
  return parseYaml(data, {schema});
};

const readYaml = path => new Promise((resolve, reject) => {
  readFile(path, {encoding: 'utf-8'}, (loadErr, data) => {
    if (loadErr) {
      return reject(loadErr);
    }
    try {
      const schema = buildSchema(path, readYamlSync);
      resolve(parseYaml(data, {schema}));
    } catch (parseErr) {
      reject(parseErr);
    }
  });
});

module.exports = readYaml;
