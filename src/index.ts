import palettes from './palettes';
import font from './font';



const commonBase = {
  // 色板相关
  ...palettes,
  // 字体相关
  ...font,
  // border: `1px solid var(--gray-100, ${palettes.gray100})`,
  // unit: '1px',
};

const common = commonBase ;

export default common;

export const mobile = common;

export const web = common;
