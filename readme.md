# ADUI Design Token

适用于 ADUI 规范的 design token; 提供 cjs, esm, css var, scss var, wxss 的引用方式

## 使用方式

### 安装库

```bash
npm i --save @tencent/adui-design-token
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

* 怎么添加新变量 ？

    添加变量到 `src/var/index.ts` 的 default exports 中


### 编译

```bash
npm run build
```

### 发布

本项目已集成 CI [蓝盾流水线](http://devops.oa.com/console/pipeline/wxad-design/p-e6203402f2f240019fa3a31b4cbbf631/history)，推送 git tag 即可发布新包版本到 tnpm 上.

例如，要发布 1.0.0 版本：

1. push 所有代码 commit 
2. 将 `package.json` 中的 `version` 字段修改为 `"1.0.0"`
3. 推送新版本
   ```bash
   git tag 1.0.0
   git push --tag
   ```
4. 企业微信收到信息：已发布
