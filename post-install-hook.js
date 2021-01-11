const fs = require('fs');
const { existsSync } = require('fs');

if (existsSync('./lib/wxmpAdaptation.js')) {
  fs.copyFileSync('./lib/wxmpAdaptation.js', './index.js');
  fs.unlink('./lib/wxmpAdaptation.js', () => {});
}
