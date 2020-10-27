const { spawnSync } = require('child_process');

const { stdout } = spawnSync('git describe --tags --abbrev=0', { shell: true });
const tag = stdout.toString('utf8').trim();

const packageDescription = require('./package.json');
if (packageDescription.version !== tag) {
  throw new Error(
    `The git tag '${tag}' is not equal to package version '${packageDescription.version}'`
  );
}

console.log(`Push version ${tag}...`)