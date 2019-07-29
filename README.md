<h1 align="center">Instant REPLay</h1>
<p align="center">Instantly build a REPL playground from your dependencies</p>
<br>

## Installation

#### NPM
```
$ npm i -D instant-replay
```

#### Yarn
```
$ yarn add --dev instant-replay
```

## Usage

### Command

```
$ node_modules/.bin/replay [options]
```

### Script

#### `package.json`
```json
{
  "scripts": {
    "replay": "replay [options]"
  },
  "dependencies": {
    "faker": "^4.1.0",
    "lodash": "^4.17.12"
  }
}
```

#### NPM
```
$ npm run replay
```

#### Yarn
```
$ yarn replay
```

### Options

| Option      | Alias | Description                                                                                   |
|:----------- |:----- |:--------------------------------------------------------------------------------------------- |
| `--version` | `-v`  | Show version number.                                                                          |
| `--help`    | `-h`  | Show help.                                                                                    |
| `--output`  | `-o`  | Specify output file, such as `replay -o "./path/to/file.js"`. The default is `./bin/repl.js`. |

### REPL

#### Run REPL
```
$ node ./bin/repl.js
>
```

#### See available dependencies
```
> deps
[ 'faker', 'lodash' ]
>
```

#### See available devDependencies
```
> devDeps
[ '' ]
>
```

#### Load dependency
```
> load('faker')
'+faker'
> faker.name.firstName()
'Jake'
>
```

#### Load dependency with alias
```
> load('lodash', '_')
'+_'
> _.add(1, 2)
3
> lodash.add(1, 2)
Thrown:
ReferenceError: lodash is not defined
>
```

#### Load Node modules
```
> load('fs')
'+fs'
> load('path')
'+path'
>
```

#### Unload dependencies/modules
```
> unload('faker', '_', 'fs', 'path')
'-faker, -_, -fs, -path'
>
```

#### Exit REPL
```
> exit
$
```
or

```
> quit
$
```
