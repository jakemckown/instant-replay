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
const devDeps = []

for (const dep in pkg.dependencies) {
  deps.push(dep)
}

for (const devDep in pkg.devDependencies) {
  devDeps.push(devDep)
}

const replText =`'use strict'

const deps = ['${deps.join("','")}']
const devDeps = ['${devDeps.join("','")}']

const repl = require('repl').start()

function load (dep, alias) {
  alias = alias || dep
  repl.context[alias] = require(dep)
}

function unload () {
  arguments.forEach((dep) => {
    if (repl.context[dep]) {
      delete repl.context[dep]
    }
  })
}

Object.defineProperty(repl.context, 'deps', {
  enumerable: true,
  get: () => deps.slice()
})
Object.defineProperty(repl.context, 'devDeps', {
  enumerable: true,
  get: () => devDeps.slice()
})
Object.defineProperty(repl.context, 'load', {
  enumerable: true,
  value: load
})
Object.defineProperty(repl.context, 'unload', {
  enumerable: true,
  value: unload
})
Object.defineProperty(repl.context, 'exit', {
  enumerable: true,
  get: () => process.exit(0)
})
Object.defineProperty(repl.context, 'quit', {
  enumerable: true,
  get: () => repl.context.exit
})
`

fs.writeFile(output, replText, (error) => {
  if (error) { throw error }
})
