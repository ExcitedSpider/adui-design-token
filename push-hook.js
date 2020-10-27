const { spawnSync } = require('child_process');

const { stdout } = spawnSync('git describe --tags --abbrev=0', { shell: true });
const tag = stdout.toString('utf8').trim();

const packageDescription = require('./package.json');
if (packageDescription.version !== tag) {
  throw new Error(
    `The git tag '${tag}' is not equal to package.json version '${packageDescription.version}'.
    Use 'git describe --tags --abbrev=0' to check current git tag.
    Use 'git tag <tag-name>' to create new tag.
    And check the 'version' field in file ./package.json.
    `
  );
}

console.log(`Push version ${tag}...`)