import { join } from 'path';

export default {
  /** web 和 mobile 公用的 token 变量 */
  externalCommonToken: [join(__dirname, '../external/common.json')],
  /** web 专用的 token 变量 */
  externalWebToken: [],
  /** mobile 专用的 token 变量 */
  externalMobileToken: [],
};
