# ADUI Design Token

适用于 ADUI 规范的 design token; 提供 cjs, esm, css var, scss var 的引用方式

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

   1. 使用 css import

    ```css
    @import '~adui-design-token/var.css';
    ```

    2. 使用一些打包工具，如 [css-loader](https://webpack.js.org/loaders/css-loader/):

    ```js
    import css from 'file.css';
    ```

4. scss

    同 css。

## 开发

### 编译

```bash
npm run build
```
