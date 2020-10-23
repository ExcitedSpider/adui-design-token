const kebabCase = require('lodash.kebabcase');

module.exports = (tokenObj) => {
  return {
    tokens: Object.keys(tokenObj).map((key) => ({
      key: kebabCase(key),
      value: tokenObj[key],
    })),
  };
};
