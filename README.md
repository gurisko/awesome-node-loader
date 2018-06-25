# Node Native Loader

Module for loading native node files for webpack (including webpack@4 support).

## Install

Add the package to the `package.json` file:

```bash
$ yarn add --dev awesome-node-loader
```

## Usage

Update `webpack.config.js` file's rules:

```javascript
module: {
  rules: [
    {
      test: /\.node$/,
      loader: "awesome-node-loader"
    }
  ];
}
```

## Options

It is possible to adjust options:

```javascript
module: {
  rules: [
    {
      test: /\.node$/,
      loader: "awesome-node-loader",
      options: {
        name: "[hex].[ext]",
        rewritePath: path.resolve(__dirname, "dist"),
        useDirname: false
      }
    }
  ];
}
```

### `name`

This option allows to change the file name in the output directory. You can use all placeholders defined in the [loader-utils](https://github.com/webpack/loader-utils/tree/v1.1.0#interpolatename) package.

### `rewritePath`

This option allows to set an absolute path. Note that it needs to remain `undefined` if you are building a package with embedded files. (Default is `undefined`)

### `useDirname`

This option chooses between `__dirname` and `path.dirname(process.execPath)` when a relative `rewritePath` is passed. (Default is `true`)

### `envDir`

When specified this changes the directory where the native module is located to the value of an environment variable on the running system. Useful, for example, when building AWS Lambda functions with serverless, where the environment variable `LAMBDA_TASK_ROOT` gives the top-level directory of the task. Note that this option overrides either setting of the `useDirname` option.

Example:

```javascript
module: {
  rules: [
    {
      test: /\.node$/,
      loader: "awesome-node-loader",
      options: {
        envPath: "LAMBDA_TASK_ROOT"
      }
    }
  ];
}
```
