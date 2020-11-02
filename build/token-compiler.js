const kebabCase = require('lodash.kebabcase');

module.exports = (opt = { kebabCase: true }) => (tokenObj) => {
  return {
    tokens: Object.keys(tokenObj).map((key) => ({
      key: opt.kebabCase ? kebabCase(key) : key,
      value: tokenObj[key],
    })),
  };
};
