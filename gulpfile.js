import del from 'del';
import gulp from 'gulp';
import sassCompiler from 'sass';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import * as imageminPlugin from 'gulp-imagemin';
import webp from 'imagemin-webp';
import svgStore from 'gulp-svgstore';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import pug from 'gulp-pug';
import { htmlValidator } from 'gulp-w3c-html-validator';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const isDev = NODE_ENV === 'dev';

const { src, dest, series, parallel, watch } = gulp;
const sass = gulpSass(sassCompiler);
const server = browserSync.create();

const srcDir = 'src/';
const buildDir = 'build/';

const allowEmpty = { allowEmpty: true };

const localPath = {
  'src': {
    pug: `${srcDir}pug/`,
    js: `${srcDir}js/`,
    img: `${srcDir}img/`,
    svg: `${srcDir}svg/`,
    scss: `${srcDir}scss/`,
    fonts: `${srcDir}fonts/`,
    video: `${srcDir}video/`,
    sprite: `${srcDir}sprite/`,
    favicon: `${srcDir}favicon/`,
  },

  'build': {
    html: buildDir,
    js: `${buildDir}js/`,
    img: `${buildDir}img/`,
    css: `${buildDir}css/`,
    fonts: `${buildDir}fonts/`,
    video: `${buildDir}video/`,
  },
};

const clear = () => del(buildDir);

const reload = (done) => {
  server.reload();
  done();
};

const html = () => {
  const srcPath = [
    `${localPath.src.pug}**/*.pug`,
    `!${localPath.src.pug}**/_*.pug`,
  ];

  return src(srcPath)
    .pipe(plumber())
    .pipe(pug({}))
    .pipe(dest(localPath.build.html))
    .pipe(src(`${localPath.build.html}**/*.html`))
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter());
};


const img = () => {
  const srcPath = `${localPath.src.img}**/*.{png,jpg,jpeg}`;

  const convertWebp = imagemin({
    verbose: true,
    plugins: webp({ quality: 80 }),
  });

  const minifyOptions = [
    imageminPlugin.gifsicle({ interlaced: true }),
    imageminPlugin.mozjpeg({ quality: 85, progressive: true }),
    imageminPlugin.optipng({ optimizationLevel: 3 }),
  ];

  return src(srcPath)
    .pipe(plumber())
    .pipe(convertWebp)
    .pipe(rename({ extname: '.webp' }))
    .pipe(dest(localPath.build.img))
    .pipe(src(srcPath))
    .pipe(imagemin(minifyOptions))
    .pipe(dest(localPath.build.img));
};

const svg = () => src(`${localPath.src.svg}**/*.svg`)
  .pipe(plumber())
  .pipe(svgStore({ inlineSvg: true }))
  .pipe(rename('sprite.svg'))
  .pipe(dest(localPath.src.sprite));


const fonts = () => src(`${localPath.src.fonts}**/*.*`)
  .pipe(plumber())
  .pipe(dest(localPath.build.fonts));

const video = () => src(`${localPath.src.video}**/*.*`)
  .pipe(plumber())
  .pipe(dest(localPath.build.video));

const style = () => {
  const srcPath = `${localPath.src.scss}main.scss`;

  const scssOptions = {
    outputStyle: isDev ? 'expanded' : 'compressed',
  };

  const autoprefixerOptions = {
    overrideBrowserslist: ['last 2 versions'],
    cascade: true,
    grid: true,
  };

  return src(srcPath, allowEmpty)
    .pipe(plumber())
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(dest(localPath.build.css))
    .pipe(server.stream());
};

const favicon = () => src(`${localPath.src.favicon}**/*.*`)
  .pipe(dest(localPath.build.html));

const js = () => src(`${localPath.src.js}index.js`)
  .pipe(webpackStream({
    mode: 'development',
    output: {
      filename: 'index.js',
    },
  }, webpack))
  .pipe(dest(localPath.build.js));

const serve = () => {
  server.init({
    server: localPath.build.html,
    port: 3000,
    notify: false,
  });

  watch(`${localPath.src.pug}**/*.{pug,json}`,
    series(html, reload));

  watch(`${localPath.src.img}**/*.*`,
    series(img, reload));

  watch(`${localPath.src.scss}**/*.*`,
    series(style, reload));

  watch(`${localPath.src.svg}**/*.svg`,
    series(svg, reload));

  watch(`${localPath.src.fonts}**/*.*`,
    series(clear, reload));

  watch(`${localPath.src.js}**/*.*`,
    series(js, reload));

  watch(`${localPath.src.video}**/*.*`,
    series(video, reload));
};

const build = series(clear, svg, html, parallel(img, style, fonts, js, video, favicon));

export { clear, build };

export default series(build, serve);
