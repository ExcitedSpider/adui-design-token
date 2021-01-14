#!/usr/bin/env node
const yargs = require('yargs');
const { writeFileSync } = require('fs');

function getParams() {
  return yargs
    .options({
      input: {
        alias: ['prefix', 'p'],
        type: 'string',
        desc: 'package prefix',
        demandOption: true,
      },
    })
    .help()
    .version().argv;
}

function main() {
  const { prefix } = getParams();
  const pkg = require('./package.json');

  pkg.name = `${prefix}/${pkg.name}`;

  console.log('New Package:', '\n', pkg);

  writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
}

main();
