const { series, dest, src, parallel } = require("gulp");
const logger = require("gulp-logger");
const del = require("del");
const plumber = require("gulp-plumber");
const gulpMustache = require("./gulp-mustache");
const { join } = require("path");
const rename = require("gulp-rename");
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript')


function clean(cb) {
  del("/dist");
  cb();
}

async function buildTS() {
  const bundle = await rollup.rollup({
    input: './src/var/index.ts',
    plugins: [
      rollupTypescript()
    ]
  });

  await bundle.write({
    file: './dist/index.js',
    format: 'cjs',
    sourcemap: true
  });

  await bundle.write({
    file: './dist/index.esm.js',
    format: 'esm',
    sourcemap: true
  });
}

function buildCSS() {
  return (
    src(["dist/index.js"])
      .pipe(plumber())
      .pipe(gulpMustache(join(__dirname, "../src/template/css.mustache")))
      .pipe(rename({ extname: ".css" }))
      .pipe(logger({ showChange: true }))
      .pipe(dest("dist"))
  );
}

function buildSCSS() {
  return (
    src(["dist/index.js"])
      .pipe(plumber())
      .pipe(gulpMustache(join(__dirname, "../src/template/scss.mustache")))
      .pipe(rename({ extname: ".scss" }))
      .pipe(logger({ showChange: true }))
      .pipe(dest("dist"))
  );
}

exports.default = series(clean, buildTS, parallel(buildCSS, buildSCSS));
