import palettes from './palettes';
import font from './font';
import config from '../config/project-config';

function mergeTokenFromJson<Target>(target: Target, ...jsonPaths: string[]): Target {
  const mergedToken = { ...target };

  jsonPaths.forEach((path) => {
    const json = require(path);
    Object.assign(mergedToken, json);
  });

  return mergedToken;
}


const commonBase = {
  // 色板相关
  ...palettes,
  // 字体相关
  ...font,
  // border: `1px solid var(--gray-100, ${palettes.gray100})`,
  // unit: '1px',
};

const common = mergeTokenFromJson(commonBase, ...config.externalCommonToken);

export default common;

export const mobile = mergeTokenFromJson(common, ...config.externalMobileToken);

export const web = mergeTokenFromJson(common, ...config.externalWebToken);
