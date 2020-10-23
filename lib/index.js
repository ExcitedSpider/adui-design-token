'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tinycolor = require('tinycolor2');

var palettes = {
  primaryColor: tinycolor('#07C160').toHex(),
  adGreen: tinycolor('#07C160').toHex(),
  adOrange: tinycolor('#EDA20C').toHex(),
  adRed: tinycolor('#D9514C').toHex(),
  transparentGray50: tinycolor('rgba(0,0,0,0.02)').toHex(),
  transparentGray100: tinycolor('rgba(0,0,0,0.06)').toHex(),
  transparentGray200: tinycolor('rgba(0,0,0,0.08)').toHex(),
  transparentGray300: tinycolor('rgba(0,0,0,0.1)').toHex(),
  transparentGray400: tinycolor('rgba(0,0,0,0.12)').toHex(),
  transparentGray500: tinycolor('rgba(0,0,0,0.16)').toHex(),
  transparentGray600: tinycolor('rgba(0,0,0,0.22)').toHex(),
  transparentGray700: tinycolor('rgba(0,0,0,0.36)').toHex(),
  transparentGray800: tinycolor('rgba(0,0,0,0.58)').toHex(),
  transparentGray900: tinycolor('rgba(0,0,0,0.88)').toHex(),
  gray50: tinycolor('#FAFAFA').toHex(),
  gray100: tinycolor('#F2F2F2').toHex(),
  gray200: tinycolor('#EBEBEB').toHex(),
  gray300: tinycolor('#E6E6E6').toHex(),
  gray400: tinycolor('#E0E0E0').toHex(),
  gray500: tinycolor('#D6D6D6').toHex(),
  gray600: tinycolor('#C7C7C7').toHex(),
  gray700: tinycolor('#A3A3A3').toHex(),
  gray800: tinycolor('#6B6B6B').toHex(),
  gray900: tinycolor('#1F1F1F').toHex(),
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

module.exports = index;
//# sourceMappingURL=index.js.map
