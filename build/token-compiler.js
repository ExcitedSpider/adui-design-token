const kebabCase = require('lodash.kebabcase');

function getPlainedToken(opt = { kebabCase: true }, tokenObj) {
  const exportToken = [];
  Object.keys(tokenObj).forEach((key) => {
    if (typeof tokenObj[key] !== 'object') {
      exportToken.push({
        key: opt.kebabCase ? kebabCase(key) : key,
        value: tokenObj[key],
        type: typeof tokenObj[key]
      });
    }
  });
  return exportToken;
}

module.exports = (opt = { kebabCase: true, namedExport: false }) => (tokenObj) => {
  const exportTokens = getPlainedToken(opt, tokenObj);
  if (!opt.namedExport) {
    return { tokens: exportTokens };
  } else {
    const namedExportTokens = { default: exportTokens };
    Object.keys(tokenObj).forEach((exportName) => {
      if (typeof tokenObj[exportName] !== 'object') {
        return;
      }
      namedExportTokens[exportName] = getPlainedToken(opt, tokenObj[exportName]);
    });

    return namedExportTokens;
  }
};
