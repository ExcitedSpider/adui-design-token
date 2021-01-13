#!/usr/bin/env node
const yargs = require('yargs');
const { writeFileSync } = require('fs');

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
  const { input, tag = 'common' } = getParams();
  try {
    const parsedInput = JSON.parse(input);
    if (typeof parsedInput !== 'object' || Object.keys(parsedInput).length === 0) {
      throw new Error(`"${input}" is not json object`);
    }
  } catch (error) {
    throw new Error(`Invalid input: ${error}`);
  }

  writeFileSync(`external/figma.${tag}.json`, input);
}

main();
