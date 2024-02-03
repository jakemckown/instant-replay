import {readFile, writeFile} from 'fs/promises';
import path from 'path';
import {findUpSync} from 'find-up';

const pkgRoot = path.dirname(findUpSync('package.json'));
const pkgPath = findUpSync('package.json', {cwd: pkgRoot});
const pkg = JSON.parse(await readFile(pkgPath));
const deps = [];
const devDeps = [];

for (const dep in pkg.dependencies) {
  deps.push(dep);
}

for (const devDep in pkg.devDependencies) {
  devDeps.push(devDep);
}

const replText =`const deps = ['${deps.join("','")}'];
const devDeps = ['${devDeps.join("','")}'];
const repl = (await import('repl')).start();

function load(dep, alias) {
  alias = alias || dep;

  import(dep).then(dep => {
    repl.context[alias] = dep;
  });

  return '+' + alias;
}

function unload(...args) {
  if (args.length) {
    args.forEach(dep => {
      if (repl.context[dep]) {
        delete repl.context[dep];
      }
    });

    return '-' + args.join(', -');
  } else {
    return '';
  }
}

Object.defineProperty(repl.context, 'deps', {
  enumerable: true,
  get: () => deps.slice()
});

Object.defineProperty(repl.context, 'devDeps', {
  enumerable: true,
  get: () => devDeps.slice()
});

Object.defineProperty(repl.context, 'load', {
  enumerable: true,
  value: load
});

Object.defineProperty(repl.context, 'unload', {
  enumerable: true,
  value: unload
});

Object.defineProperty(repl.context, 'exit', {
  enumerable: true,
  get: () => process.exit(0)
});

Object.defineProperty(repl.context, 'quit', {
  enumerable: true,
  get: () => repl.context.exit
});
`;

writeFile(
  path.join(
    path.dirname(pkgPath),
    './bin/repl.js'
  ),
  replText
);
