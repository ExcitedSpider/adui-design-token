#!/usr/bin/env node
const yargs = require('yargs');

function getParams() {
  return yargs
    .options({
      input: {
        alias: ['i', 'input'],
        type: 'string',
        desc: 'input json',
        demandOption: true,
      },
      tag: {
        alias: ['t', 'tag'],
        type: 'string',
        desc: 'release tag',
      },
    })
    .help()
    .version().argv;
}

function main() {
  const { input, tag } = getParams();
  try {
    JSON.parse(input);
  } catch (error) {
    throw(new Error('The input is not valid json'))
  }

  
}

main();
