const {readFile, readFileSync} = require('fs');
const {dirname} = require('path');
const {safeLoad: parseYaml, Type: YamlType, Schema: {create: createSchema}} = require('js-yaml');

const buildSchema = (path, readYaml) => {
  const dir = dirname(path);
  const absoultizePath = path => (path[0] === '/' ? path : `${dir}/${path}`);

  const includeType = new YamlType('!include', {
    kind: 'scalar',
    resolve: data => data !== null,
    construct: path => {
      try {
        return readYaml(absoultizePath(path));
      } catch (err) {
        return `[Error: ${err.message}]`;
      }
    },
  });
  const includeMergedType = new YamlType('!includeMerged', {
    kind: 'sequence',
    resolve: data => data !== null && data.length > 0,
    construct: paths => {
      try {
        const contents = paths.map(path => readYaml(absoultizePath(path)));
        return contents.reduce((merged, content) => {
          return Array.isArray(merged) ?
            merged.concat(content) :
            Object.assign({}, content, merged);
        });
      } catch (err) {
        return `[Error: ${err.message}]`;
      }
    },
  });
  return createSchema([includeType, includeMergedType]);
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
