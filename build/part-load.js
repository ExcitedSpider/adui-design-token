const nodeEval = require('node-eval');
const toSource = require('tosource');

function partLoad(opt = {}) {
  if (!opt.namedExport) {
    throw new Error(
      `Plugin partLoad: namedExport field must provided as a string, recieve: ${opt.namedExport}`
    );
  }
  const { namedExport } = opt;
  return {
    transform(code) {
      const module = nodeEval(code);

      if (!module[namedExport]) {
        throw new Error(
          `Plugin partLoad: module dosen't have named export: ${namedExport}`
        );
      }

      return {
        code: `module.exports = ${toSource(module[namedExport])}`,
        map: null,
      };
    },
  };
}

module.exports.partLoad = partLoad;
