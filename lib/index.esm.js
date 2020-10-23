// eslint-disable-next-line @typescript-eslint/no-require-imports
const tinycolor = require('tinycolor2');

var palettes = {
  primaryColor: tinycolor('#07C160'),
  adGreen: tinycolor('#07C160'),
  adOrange: tinycolor('#EDA20C'),
  adRed: tinycolor('#D9514C'),
  transparentGray50: tinycolor('rgba(0,0,0,0.02)'),
  transparentGray100: tinycolor('rgba(0,0,0,0.06)'),
  transparentGray200: tinycolor('rgba(0,0,0,0.08)'),
  transparentGray300: tinycolor('rgba(0,0,0,0.1)'),
  transparentGray400: tinycolor('rgba(0,0,0,0.12)'),
  transparentGray500: tinycolor('rgba(0,0,0,0.16)'),
  transparentGray600: tinycolor('rgba(0,0,0,0.22)'),
  transparentGray700: tinycolor('rgba(0,0,0,0.36)'),
  transparentGray800: tinycolor('rgba(0,0,0,0.58)'),
  transparentGray900: tinycolor('rgba(0,0,0,0.88)'),
  gray50: tinycolor('#FAFAFA'),
  gray100: tinycolor('#F2F2F2'),
  gray200: tinycolor('#EBEBEB'),
  gray300: tinycolor('#E6E6E6'),
  gray400: tinycolor('#E0E0E0'),
  gray500: tinycolor('#D6D6D6'),
  gray600: tinycolor('#C7C7C7'),
  gray700: tinycolor('#A3A3A3'),
  gray800: tinycolor('#6B6B6B'),
  gray900: tinycolor('#1F1F1F'),
};

var font = {
  fontSizeLarge: '16px',
  fontSizeMedium: '14px',
  fontSizeSmall: '13px',
  fontSizeMini: '12px',

  fontWeightBold: 700,
  fontWeightMedium: 500,
};

var index = {
  ...palettes,
  ...font,
  border: `1px solid var(--gray-100, ${palettes.gray100})`,
  unit: '1px',
};

export default index;
//# sourceMappingURL=index.esm.js.map
