Node Native Loader [![npm version](https://badge.fury.io/js/awesome-node-loader.svg)](https://badge.fury.io/js/awesome-node-loader)
============

Module for loading native node files for webpack (including webpack@4 support).

## Installation

Add the package to the `package.json` file:

```bash
$ npm install awesome-node-loader --save-dev
$ yarn add --dev awesome-node-loader
```

## Usage

Update `webpack.config.js` file's rules:

```javascript
module: {
  rules: [{
    test: /\.node$/,
    loader: 'awesome-node-loader'
  }]
}
```

## Options

It is possible to adjust options:

```javascript
module: {
  rules: [{
    test: /\.node$/,
    loader: 'awesome-node-loader',
    options: {
      name: '[hex].[ext]',
      rewritePath: path.resolve(__dirname, 'dist'),
      useDirname: false
    }
  }]
}
```

### `name`

This option allows to change the file name in the output directory. You can use all placeholders defined in the [loader-utils](https://github.com/webpack/loader-utils/tree/v1.1.0#interpolatename) package.

### `rewritePath`

This option allows to set an absolute path. Note that it needs to remain `undefined` if you are building a package with embedded files. (Default is `undefined`)

### `useDirname`

This option chooses in between `__dirname` and `path.dirname(process.execPath)` when a relative `rewritePath` is passed. (Default is `true`)
