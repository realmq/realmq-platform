#!/usr/bin/env node

const {validate} = require('openapi-schema-validation');
const readYaml = require('../src/lib/read-yaml');

const main = async () => {
  const files = process.argv.slice(2);
  const results = await Promise.all(files.map(async file => {
    try {
      const spec = await readYaml(file);
      const version = spec.openapi ? 3 : 2;
      const result = validate(spec, version);
      return result.errors.length === 0 ? null : {file, error: result};
    } catch (error) {
      return {file, error};
    }
  }));

  const filteredResults = results.filter(result => (result !== null));
  if (filteredResults.length === 0) {
    return 0;
  }

  filteredResults.forEach(({file, error}) => {
    console.error(`Error(s) in ${file}:\n${error}`);
  });
  return 2;
};

(async () => {
  try {
    const code = await main();
    process.exit(code);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
