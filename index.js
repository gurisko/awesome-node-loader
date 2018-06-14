var loaderUtils = require("loader-utils");
var path = require("path");

module.exports = function(content) {
  const defaultConfig = {
    name: "[name].[ext]",
    rewritePath: undefined,
    useDirname: true
  };

  const config = Object.assign(defaultConfig, loaderUtils.getOptions(this));

  const context = config.context || this.rootContext || (this.config && this.config.context);
  let fileName = loaderUtils.interpolateName(this, config.name, {
    content: content,
    context: context,
  });

  if (this.emitFile) {
    this.emitFile(fileName, content, false);
    this.addDependency(this.resourcePath);
  } else {
    throw new Error('emitFile function is not available');
  }

  if (config.rewritePath) {
    const filePath = path.format({dir: config.rewritePath, name: fileName});

    if (path.isAbsolute(filePath)) {
      return "try { global.process.dlopen(module, " + JSON.stringify(filePath) + "); } " +
        "catch(exception) { throw new Error('Cannot open ' + " + JSON.stringify(filePath) + " + ': ' + exception); };";
    }
    fileName = filePath;
  }

  return "const path = require('path');" +
    "const filePath = path.join(" + (config.useDirname ? "__dirname" : "path.dirname(process.execPath)") + ", " + JSON.stringify(fileName) + ");" +
    "try { global.process.dlopen(module, filePath); } " +
    "catch(exception) { throw new Error('Cannot open ' + filePath + ': ' + exception); }";
};

module.exports.raw = true;
