const fs = require('fs');

const newVersion = process.env.BK_CI_REPO_GIT_WEBHOOK_TAG_NAME;

if(!newVersion){
  console.warn('No version tag set! Use ${oldversion}.1 for new version tag.')
}

const packageDescription = require('./package.json');

packageDescription.version = newVersion || packageDescription.version + '.1';

fs.writeFileSync('package.json', JSON.stringify(packageDescription, null, 2), { encoding: 'utf8' });
