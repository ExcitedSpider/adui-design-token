export const mergeTokenFromJson = (target: object, ...jsonPaths: string[]) => {
  const mergedToken = { ...target };

  jsonPaths.forEach((path) => {
    const json = require(path);
    Object.assign(mergedToken, json);
  });

  return mergedToken;
};
