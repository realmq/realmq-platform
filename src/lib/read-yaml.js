const {readFileSync, promises: {readFile}} = require('fs');
const {dirname} = require('node:path');
const {load: parseYaml, Type: YamlType, DEFAULT_SCHEMA} = require('js-yaml');

const buildSchema = (path, readYaml) => {
  const dir = dirname(path);
  const absoultizePath = path => (path[0] === '/' ? path : `${dir}/${path}`);

  const includeType = new YamlType('!include', {
    kind: 'scalar',
    resolve: data => data !== null,
    construct(path) {
      try {
        return readYaml(absoultizePath(path));
      } catch (error) {
        return `[Error: ${error.message}]`;
      }
    },
  });
  const includeMergedType = new YamlType('!includeMerged', {
    kind: 'sequence',
    resolve: data => data !== null && data.length > 0,
    construct(paths) {
      try {
        const contents = paths.map(path => readYaml(absoultizePath(path)));
        return contents.reduce((merged, content) => Array.isArray(merged)
          ? [...merged, ...content]
          : ({...content, ...merged}));
      } catch (error) {
        return `[Error: ${error.message}]`;
      }
    },
  });
  return DEFAULT_SCHEMA.extend([includeType, includeMergedType]);
};

const readYamlSync = path => {
  const data = readFileSync(path, {encoding: 'utf8'});
  const schema = buildSchema(path, readYamlSync);
  return parseYaml(data, {schema});
};

const readYaml = async path => {
  const data = await readFile(path, {encoding: 'utf8'});
  const schema = buildSchema(path, readYamlSync);
  return parseYaml(data, {schema});
};

module.exports = readYaml;
