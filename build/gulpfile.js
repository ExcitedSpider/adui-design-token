const { series, dest, src, parallel, task } = require('gulp');
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

function buildMustacheTask(
  opt = {
    src: 'lib/index.js',
    template: '../src/template/scss.mustache',
    rename: 'var.scss',
    dest: 'lib',
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

function buildDeclearationTask() {
  return function buildDeclearation () {
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
  };
}

exports.default = series(
  clean,
  buildTS,
  parallel(
    buildDeclearationTask(),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.css',
      dest: 'lib',
      template: '../src/template/css.mustache',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.scss',
      dest: 'lib',
      template: '../src/template/scss.mustache',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.wxss',
      dest: 'lib',
      template: '../src/template/wxss.mustache',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.css',
      dest: 'lib/web',
      template: '../src/template/css.mustache',
      namedExport: 'web',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.scss',
      dest: 'lib/web',
      template: '../src/template/scss.mustache',
      namedExport: 'web',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.wxss',
      dest: 'lib/web',
      template: '../src/template/wxss.mustache',
      namedExport: 'web',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.css',
      dest: 'lib/mobile',
      template: '../src/template/css.mustache',
      namedExport: 'mobile',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.scss',
      dest: 'lib/mobile',
      template: '../src/template/scss.mustache',
      namedExport: 'mobile',
    }),
    buildMustacheTask({
      src: 'lib/index.js',
      rename: 'var.wxss',
      dest: 'lib/mobile',
      template: '../src/template/wxss.mustache',
      namedExport: 'mobile',
    })
  )
);
