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

const fs = require('fs')
const path = require('path')
const findUp = require('find-up')

// The root folder of this package
const PACKAGE_ROOT = path.dirname(findUp.sync('package.json'))

// The package.json file of the consumer of this package
const pkgPath = findUp.sync('package.json', { cwd: PACKAGE_ROOT })
const pkg = require(pkgPath)

// The root folder of the consumer of this package
const ROOT = path.dirname(pkgPath)

var output = path.join(ROOT, argv.output || './bin/repl.js')

const deps = []

for (const dep in pkg.dependencies) {
  deps.push(dep)
}

const replText =`
const deps = ['${deps.join("','")}']

const repl = require('repl').start()

function load (dep) {
  repl.context[dep] = require(dep)
}

function unload (dep) {
  delete repl.context[dep]
}

repl.context.deps = deps
repl.context.load = load
repl.context.unload = unload
repl.context.exit = process.exit
repl.context.quit = process.exit
`

fs.writeFile(output, replText, (error) => {
  if (error) { throw error }
})
