import palettes from './palettes';
import font from './font';

export default {
  ...palettes,
  ...font,
  border: `1px solid var(--gray-100, ${palettes.gray100})`,
  unit: '1px',
};
