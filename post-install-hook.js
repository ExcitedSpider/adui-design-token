const fs = require('fs');

fs.createReadStream('./lib/wxmpAdaptation.js')
  .pipe(fs.createWriteStream('./index.js'))
  .on('close', () => {
    fs.unlink('./lib/wxmpAdaptation.js', () => {});
  });
