const { series, dest, src, parallel } = require('gulp');
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
const commonjs = require('@rollup/plugin-commonjs');

function clean(cb) {
  del('./lib');
  cb();
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
    file: './lib/intern-index.js',
    plugins: [externalInject()],
  });

  const bundle = await rollup.rollup({
    input: './lib/intern-index.js',
    plugins: [commonjs()],
  });

  await bundle.write({
    format: 'cjs',
    file: './lib/index.js',
  });

  await bundle.write({
    file: './lib/index.esm.js',
    format: 'esm',
  });
}

function buildCSS() {
  return src(['lib/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/css.mustache'), {
        compiler: tokenCompiler(),
      })
    )
    .pipe(rename('var.css'))
    .pipe(logger({ showChange: true }))
    .pipe(dest('lib'));
}

function buildSCSS() {
  return src(['lib/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/scss.mustache'), {
        compiler: tokenCompiler(),
      })
    )
    .pipe(rename('var.scss'))
    .pipe(logger({ showChange: true }))
    .pipe(dest('lib'));
}

function buildWXSS() {
  return src(['lib/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/wxss.mustache'), {
        compiler: tokenCompiler({ kebabCase: false }),
      })
    )
    .pipe(rename('var.wxss'))
    .pipe(logger({ showChange: true }))
    .pipe(dest('lib'));
}

function buildDeclearation() {
  return src(['lib/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/decleartion.mustache'), {
        compiler: tokenCompiler({ kebabCase: false, namedExport: true }),
      })
    )
    .pipe(rename('index.d.ts'))
    .pipe(logger({ showChange: true }))
    .pipe(dest('lib'));
}

exports.default = series(
  clean,
  buildTS,
  parallel(buildCSS, buildSCSS, buildWXSS, buildDeclearation)
);
