#! /usr/bin/env node

const program = require('commander')

program
  .version('0.1.0')

program
  .command('upload <pathcsv>')
  .description('upload csv to dynamodb')
  .action((csv, some) => {
    console.log('upload: ' + csv)
  })
  
  program.parse(process.argv)