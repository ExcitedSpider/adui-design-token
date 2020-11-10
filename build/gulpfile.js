const { series, dest, src, parallel } = require('gulp');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');
const logger = require('gulp-logger');
const del = require('del');
const plumber = require('gulp-plumber');
const gulpMustache = require('./gulp-mustache');
const { join } = require('path');
const rename = require('gulp-rename');
const rollup = require('rollup');
const tokenCompiler = require('./token-compiler');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const { externalInject } = require('./external-inject');
const { partLoad } = require('./part-load');
const commonjs = require('@rollup/plugin-commonjs');

function clean(cb) {
  del('./lib');
  cb();
}

function cleanInternal(cb) {
  del('./lib/internal-index.js');
  cb();
}

function createWxmpAdaptation(cb) {
  const sourceStream = Readable.from([
    `const token = require('./lib/index'); module.exports = token;`,
  ]);
  const targetSteam = createWriteStream('./lib/wxmpAdaptation.js');

  return sourceStream.pipe(targetSteam);
}

async function buildTS() {
  const internBundle = await rollup.rollup({
    input: './src/index.ts',
    plugins: [typescript(), terser({ format: { comments: false } })],
    output: {
      dir: './lib',
      format: 'cjs',
    },
  });

  await internBundle.write({
    format: 'cjs',
    file: './lib/internal-index.js',
    plugins: [externalInject()],
  });

  const commonBundle = await rollup.rollup({
    input: './lib/internal-index.js',
    plugins: [partLoad({ namedExport: 'default' }), commonjs()],
  });

  await commonBundle.write({
    format: 'cjs',
    file: './lib/index.js',
  });

  await commonBundle.write({
    file: './lib/index.esm.js',
    format: 'esm',
  });

  const webBundle = await rollup.rollup({
    input: './lib/internal-index.js',
    plugins: [partLoad({ namedExport: 'web' }), commonjs()],
  });

  await webBundle.write({
    format: 'cjs',
    file: './lib/web/index.js',
  });

  await webBundle.write({
    file: './lib/web/index.esm.js',
    format: 'esm',
  });

  const mobileBundle = await rollup.rollup({
    input: './lib/internal-index.js',
    plugins: [partLoad({ namedExport: 'mobile' }), commonjs()],
  });

  await mobileBundle.write({
    format: 'cjs',
    file: './lib/mobile/index.js',
  });

  await mobileBundle.write({
    file: './lib/mobile/index.esm.js',
    format: 'esm',
  });
}

function buildMustacheTask(
  opt = {
    /** 输入的文件 */
    src: './lib/index.js',
    /** 模版路径 */
    template: '../src/template/scss.mustache',
    rename: 'var.scss',
    dest: './lib',
    namedExport: '',
  }
) {
  return function buildMustache() {
    return src([opt.src])
      .pipe(plumber())
      .pipe(
        gulpMustache(join(__dirname, opt.template), {
          compiler: tokenCompiler(),
          namedExport: opt.namedExport,
        })
      )
      .pipe(rename(opt.rename))
      .pipe(logger({ showChange: true }))
      .pipe(dest(opt.dest));
  };
}

function buildDeclearationTask(
  opt = { src: './lib/index.js', dest: './lib', rename: 'index.d.ts' }
) {
  return function buildDeclearation() {
    return src([opt.src])
      .pipe(plumber())
      .pipe(
        gulpMustache(join(__dirname, '../src/template/decleartion.mustache'), {
          compiler: tokenCompiler({ kebabCase: false, namedExport: true }),
        })
      )
      .pipe(rename(opt.rename))
      .pipe(logger({ showChange: true }))
      .pipe(dest(opt.dest));
  };
}

exports.default = series(
  clean,
  buildTS,
  parallel(
    buildDeclearationTask(),
    buildDeclearationTask({
      src: './lib/web/index.js',
      dest: './lib/web',
      rename: 'index.d.ts',
    }),
    buildDeclearationTask({
      src: './lib/mobile/index.js',
      dest: './lib/mobile',
      rename: 'index.d.ts',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.css',
      dest: './lib',
      template: '../src/template/css.mustache',
      namedExport: 'default',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.scss',
      dest: './lib',
      template: '../src/template/scss.mustache',
      namedExport: 'default',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.wxss',
      dest: './lib',
      template: '../src/template/wxss.mustache',
      namedExport: 'default',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.css',
      dest: './lib/web',
      template: '../src/template/css.mustache',
      namedExport: 'web',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.scss',
      dest: './lib/web',
      template: '../src/template/scss.mustache',
      namedExport: 'web',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.wxss',
      dest: './lib/web',
      template: '../src/template/wxss.mustache',
      namedExport: 'web',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.css',
      dest: './lib/mobile',
      template: '../src/template/css.mustache',
      namedExport: 'mobile',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.scss',
      dest: './lib/mobile',
      template: '../src/template/scss.mustache',
      namedExport: 'mobile',
    }),
    buildMustacheTask({
      src: './lib/internal-index.js',
      rename: 'var.wxss',
      dest: './lib/mobile',
      template: '../src/template/wxss.mustache',
      namedExport: 'mobile',
    })
  ),
  createWxmpAdaptation,
  cleanInternal
);
