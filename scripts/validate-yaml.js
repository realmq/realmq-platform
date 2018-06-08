#!/usr/bin/env node

const readYaml = require('../src/lib/read-yaml');

const main = async () => {
  const files = process.argv.slice(2);
  const results = await Promise.all(files.map(async file => {
    try {
      await readYaml(file);
      return null;
    } catch (error) {
      return {file, error};
    }
  }));

  const filteredResults = results.filter(result => (result !== null));
  if (filteredResults.length === 0) {
    return 0;
  }

  filteredResults.forEach(({file, error}) => {
    console.error(`Error in ${file}:\n${error}`);
  });
  return 2;
};

(async () => {
  try {
    const code = await main();
    process.exit(code);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
