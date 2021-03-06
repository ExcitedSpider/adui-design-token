# ADUI Design Token

适用于 ADUI 规范的 design token; 提供 cjs, esm, css var, scss var, wxss 的引用方式

## 使用方式

### 安装库

```bash
npm i --save adui-design-token
```

### 引入 Token

1. js (cjs)

   ```js
   const token = require('adui-design-token');
   ```

2. js (esm)

   ```js
   import token from 'adui-design-token';
   ```

3. css

   使用 css import，或者使用一些打包工具

   ```css
   @import '~adui-design-token/lib/var.css';
   ```

   ```js
   // webpack css-loader
   import 'adui-design-token/lib/var.css';
   ```

4. scss

   同 css。

5. wxss

   由于小程序平台特殊性，wxss 的引入与 css 有些不同:

   - 只能使用相对路径引入

   ```css
   @import '../miniprogram_npm/adui-design-token/var.wxss';
   ```

## 开发

### 开发指引

- 怎么添加新变量 ？

  - 添加变量到 `src/var/index.ts` 的 default exports 中
  - 使用 design-token-dock 工具下载变量 json 文件，复制到项目中（推荐 external 文件夹下），然后添加到`config/project-config.js`文件中的路径

### 编译

```bash
npm run build
```
