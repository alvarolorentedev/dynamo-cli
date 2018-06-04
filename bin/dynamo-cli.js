#! /usr/bin/env node

const program = require('commander'),
  index = require('../lib/index')

program
  .version('0.0.1')

program
  .command('upload <pathcsv>')
  .description('upload csv to dynamodb')
  .action((csv) => index.upload(csv,","))
  
  program.parse(process.argv)