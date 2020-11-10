const Mustache = require('mustache');
const fs = require('fs');
const through2 = require('through2');
const nodeEval = require('node-eval');

const PLUGIN_NAME = 'gulp-mustache';

/**
 * gulp mustache 插件
 * @param {string} templatePath mustache 的模版路径
 * @param {a=>a} compiler 编译 js 对象的方法
 */
function gulpMustache(templatePath, opt = {}) {
  if (!templatePath) {
    throw new Error(`${PLUGIN_NAME}: Missing template path`);
  }

  const template = fs.readFileSync(templatePath, { encoding: 'utf8' });

  if (!template) {
    throw new Error(`${PLUGIN_NAME}: template not found`);
  }

  return through2.obj(function (file, _, cb) {
    let data = nodeEval(file.contents.toString('utf8'));

    const { namedExport, compiler, showLogger } = opt;

    if (namedExport) {
      data = data[namedExport];
    }

    if (!data) {
      throw new Error(
        `Plugin gulpMustache: file ${file.dirname}/${file.basename} has no named export '${namedExport}'`
      );
    }

    if (typeof compiler === 'function') {
      data = compiler(data);
    }

    if (showLogger) {
      console.log('Compiled Token Data' + JSON.stringify(data));
    }

    // 用 Mustache 模版渲染
    const mustached = Mustache.render(template, data);

    // 将 Vinyl 的内容更新为渲染后的内容
    file.contents = Buffer.from(mustached, 'utf8');
    cb(null, file);
  });
}

module.exports = gulpMustache;
