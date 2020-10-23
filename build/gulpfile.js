const { series, dest, src, parallel } = require('gulp');
const logger = require('gulp-logger');
const del = require('del');
const plumber = require('gulp-plumber');
const gulpMustache = require('./gulp-mustache');
const { join } = require('path');
const rename = require('gulp-rename');
const rollup = require('rollup');
const tokenCompiler = require('./token-compiler');
const sucrase = require('@rollup/plugin-sucrase');
const resolve = require('@rollup/plugin-node-resolve');

function clean(cb) {
  del('/dist');
  cb();
}

async function buildTS() {
  const bundle = await rollup.rollup({
    input: './src/var/index.ts',
    plugins: [
      resolve.nodeResolve({
        extensions: ['.js', '.ts'],
      }),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript'],
      }),
    ],
  });

  await bundle.write({
    file: './dist/index.js',
    format: 'cjs',
    sourcemap: true,
  });

  await bundle.write({
    file: './dist/index.esm.js',
    format: 'esm',
    sourcemap: true,
  });
}

function buildCSS() {
  return src(['dist/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/css.mustache'), {
        compiler: tokenCompiler,
        showLogger: true,
      })
    )
    .pipe(rename({ extname: '.css' }))
    .pipe(logger({ showChange: true }))
    .pipe(dest('dist'));
}

function buildSCSS() {
  return src(['dist/index.js'])
    .pipe(plumber())
    .pipe(
      gulpMustache(join(__dirname, '../src/template/scss.mustache'), {
        compiler: tokenCompiler,
      })
    )
    .pipe(rename({ extname: '.scss' }))
    .pipe(logger({ showChange: true }))
    .pipe(dest('dist'));
}

exports.default = series(clean, buildTS, parallel(buildCSS, buildSCSS));
