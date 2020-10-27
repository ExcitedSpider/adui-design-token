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

function clean(cb) {
  del('./lib');
  cb();
}

async function buildTS() {

  const bundle = await rollup.rollup({
    input: './src/var/index.ts',
    plugins: [typescript()],
    output: {
      dir: 'lib',
      format: 'cjs',
      file: './lib/index.js'
    },
  });

  await bundle.write({
    format: 'cjs',
    sourcemap: true,
    dir: 'lib',
  });

  await bundle.write({
    file: './lib/index.esm.js',
    format: 'esm',
    sourcemap: true,
  });
}

function buildCSS() {
  return src(['lib/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/css.mustache'), {
        compiler: tokenCompiler,
        showLogger: true,
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
        compiler: tokenCompiler,
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
        compiler: tokenCompiler,
      })
    )
    .pipe(rename('var.wxss'))
    .pipe(logger({ showChange: true }))
    .pipe(dest('lib'));
}

exports.default = series(clean, buildTS, parallel(buildCSS, buildSCSS, buildWXSS));
// exports.default = series(clean, buildTS);
