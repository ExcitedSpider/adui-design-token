import { mergeTokenFromJson } from './util';

import palettes from './palettes';
import font from './font';
import config from '../config/project-config';

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
