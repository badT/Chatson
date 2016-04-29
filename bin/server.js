const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');
const config = JSON.parse(babelrc);

try {
  config;
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-core/register')(config);
require('../server');
