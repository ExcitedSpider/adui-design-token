const nodeEval = require('node-eval');
const toSource = require('tosource');

function mergeTokenFromJson(target, ...jsonPaths) {
  const mergedToken = { ...target };

  jsonPaths.forEach((path) => {
    const json = require(path);
    Object.assign(mergedToken, json);
  });

  return mergedToken;
}

function externalInject(
  options = {
    externalFilePath: '../config/project-config',
    externalExportMap: {
      default: ['externalCommonToken'],
      web: ['externalCommonToken', 'externalWebToken'],
      mobile: ['externalCommonToken', 'externalMobileToken'],
    },
  }
) {
  const externalConfig = require(options.externalFilePath);

  return {
    name: 'external-inject-plugin',
    renderChunk(code) {
      const module = nodeEval(code, 'index.js');
      const staticSource = Object.keys(module).reduce((accSource, exportName) => {
        let exportsWithExternal = module[exportName];
        if (options.externalExportMap[exportName]) {
          const targetExternals = options.externalExportMap[exportName].reduce((acc, cur) => {
            return acc.concat(Array.isArray(externalConfig[cur])? externalConfig[cur] : [externalConfig[cur]]);
          }, []);

          exportsWithExternal = mergeTokenFromJson(module[exportName], ...targetExternals);
        }
        if (exportName === 'default') {
          return accSource + `module.exports = ${toSource(exportsWithExternal)};\n`;
        } else {
          return accSource + `module.exports.${exportName} = ${toSource(exportsWithExternal)};\n`;
        }
      }, '');

      return {
        code: staticSource,
        map: null,
      };
    },
  };
}

module.exports.externalInject = externalInject;
