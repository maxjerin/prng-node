#!/usr/bin/env node

var prng = require('./prng');
var constants = require('./constants');

require('yargs') // eslint-disable-line
.command('random', 'pseudorandom number generator', (yargs) => {
  yargs
    /* .positional('type', {
      describe: 'type of random number --h or --b',
      default: 'hexa'
    }) */
    .option(constants.hex, {
      alias: 'h',
      default: false
    })
    .option(constants.bin, {
      alias: 'b',
      default: false
    });
}, (argv) => {
  // if (argv.verbose) console.info(`start server on :${argv.type}`)
  if (!argv.h && !argv.b) console.info(`specify an option --h or --b`)
  var type = argv.h ? constants.hex : constants.bin;
  // console.info(prng(type))
  prng(type);
})
.option('verbose', {
  alias: 'v',
  default: false
})
.argv;