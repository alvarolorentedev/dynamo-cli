#! /usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')

program
  .command('upload <pathcsv>')
  .description('upload csv to dynamodb')
  .action((csv) => {
    console.log('upload: ' + csv)
  })
  
  program.parse(process.argv)