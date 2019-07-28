#!/usr/bin/env node

const argv = require('yargs')
  .alias({
    'v': 'version',
    'h': 'help',
    'o': 'output'
  })
  .boolean(['version', 'help'])
  .string('output')
  .describe('output', 'Specify output file (default is "./bin/repl.js")')
  .argv

const path = require('path')

var output = path.join(__dirname, argv.output || './bin/repl.js')

console.log(`Output file: ${output}`)

process.exit(0)
