# generator-es6-lib

Yeoman es6 micro-library generator

## Features

✓ es6 ready with babel  
✓ mocha unit tests for browser and node  
✓ github integration for version increment  


## Usage 

Pre-requirements:
```bash
npm i -g yo
npm i -g generator-es6-lib
```

Generate your library:
```bash
yo es6-lib
```

### Directory structure
```bash
.
|-- LICENSE.md
|-- README.md
|-- bower.json
|-- dist
|   `-- _test_bundle.js
|-- gulpfile.js
|-- lib
|   `-- index.js
|-- node_modules
|   |-- chai
|   `-- es6-lib
|-- package.json
|-- src
|   `-- index.js
|-- test
    |-- runner.html
    `-- test.js
```

### Gulp tasks

Development:  
```bash
default      run watcher for code and tests  
build        build lib. Will process es6 to es5 and put files to /lib  
test         run test once for node or browser depending on environment  
test-node    for node  
test-browser for browser  
```

Github:  
```bash
patch     makes 0.1.0 → 0.1.1  
feature   makes 0.1.1 → 0.2.0  
release   makes 0.2.1 → 1.0.0  
```

For full list of tasks use  
```bash
gulp --tasks
```

## License

MIT
