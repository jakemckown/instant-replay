#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const argv = require('yargs')
  .alias({
    'v': 'version',
    'h': 'help',
    'o': 'output'
  }).argv

var output = './bin/repl.js'

if (argv.version) {
  version()
} else if (argv.help) {
  help()
} else {
  if (argv.output) {
    output = argv.output
  }
  // do the rest
  // const pkg = require(path.join(__dirname, 'package.json'))
  process.exit(0)
}

function version () {
  const replayPkg = require(path.join(__dirname, '../package.json'))
  console.log(replayPkg && replayPkg.version)
  process.exit(0)
}

function help () {
  console.log('instant-replay')
  console.log('https://github.com/jakemckown/instant-replay')
  console.log()
  console.log('Instantly build a REPL playground from your dependencies')
  console.log()
  console.log('Usage:')
  console.log('    replay [options]')
  console.log()
  console.log('Options:')
  console.log('    -v, --version    Print version')
  console.log('    -h, --help       Print command line options')
  console.log('    -o, --output     Specify output file (default is "./bin/repl.js"')
  console.log()
  process.exit(0)
}
