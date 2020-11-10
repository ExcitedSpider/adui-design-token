const fs = require('fs');

fs.copyFileSync('./lib/wxmpAdaptation.js', './index.js');
fs.unlink('./lib/wxmpAdaptation.js', () => {});
