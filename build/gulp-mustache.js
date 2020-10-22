const Mustache = require("mustache");
const fs = require("fs");
const through2 = require("through2");

const PLUGIN_NAME = "gulp-mustache";

/**
 * gulp mustache 插件
 * @param {string} templatePath mustache 的模版路径
 */
function gulpMustache(templatePath) {
  if (!templatePath) {
    throw new Error(`${PLUGIN_NAME}: Missing template path`);
  }

  const template = fs.readFileSync(templatePath, { encoding: "utf8" });

  if (!template) {
    throw new Error(`${PLUGIN_NAME}: template not found`);
  }

  return through2.obj(function (file, _, cb) {
    const js = eval(file.contents.toString("utf8"));
    // 用 Mustache 模版渲染
    const mustached = Mustache.render(template, js);

    // 将 Vinyl 的内容更新为渲染后的内容
    file.contents = Buffer.from(mustached, "utf8");
    cb(null, file);
  });
}

module.exports = gulpMustache;
