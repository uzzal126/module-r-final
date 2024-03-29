var gulp = require('gulp')

var clean = require('gulp-clean')

var browserSync = require('browser-sync').create()

var concat = require('gulp-concat')

var sass = require('gulp-sass')

var autoprefixer = require('gulp-autoprefixer')

var uglifycss = require('gulp-uglifycss')

var uglify = require('gulp-uglify')

var notify = require('gulp-notify')

var plumber = require('gulp-plumber')

var sourcemaps = require('gulp-sourcemaps')

var fileInclude = require('gulp-file-include')

var beautifyCode = require('gulp-beautify-code')

// Source Folder Locations

var src = {
  root: './src/',

  rootHtml: './src/*.html',
  rootPartials: './src/partials/',

  rootFonts: './src/assets/fonts/*',
  fontsAll: './src/assets/fonts/**/*',

  rootVendorCss: './src/assets/css/vendor/*.css',
  rootPluginsCss: './src/assets/css/plugins/*.css',

  styleScss: './src/assets/scss/style.scss',
  rootScss: './src/assets/scss/*',
  scssAll: './src/assets/scss/**/*',

  rootVendorJs: './src/assets/js/vendor/*.js',
  rootPluginsJs: './src/assets/js/plugins/*.js',

  pluginsJsRelFolder: './src/assets/js/plugins/plugins-related/**/*',
  pluginsJsRelFolderRoot: './src/assets/js/root-plugins-related/**/*',

  mainJs: './src/assets/js/main.js'
}

// Destination Folder Locations

var dest = {
  root: './dest/',
  fonts: './dest/assets/fonts/',
  assets: './dest/assets/',
  scss: './dest/assets/scss/',

  rootCss: './dest/assets/css',
  rootVendorCss: './dest/assets/css/vendor/',
  rootPluginsCss: './dest/assets/css/plugins/',

  rootJs: './dest/assets/js',
  rootVendorJs: './dest/assets/js/vendor/',
  rootPluginsJs: './dest/assets/js/plugins/'
}

// Separator For Vendor CSS & JS

var separator = '\n\n/*====================================*/\n\n'

// Autoprefixer Options

var autoPreFixerOptions = [
  'last 4 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
]

/* --
    Live Synchronise & Reload
-------------------------------------------------------------------- */

// Browser Synchronise
function liveBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: dest.root
    }
  })
  done()
}
// Reload
function reload(done) {
  browserSync.reload()
  done()
}

/* --
    Gulp Custom Notifier
-------------------------------------------------------------------- */
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || 'Error running Gulp',
      message: 'Error: <%= error.message %>',
      sound: 'Glass'
    })
  })
}

/* --
    Gulp Other Tasks
-------------------------------------------------------------------- */

/* -- Remove Destination Folder Before Starting Gulp -- */
function cleanProject(done) {
  gulp
    .src(dest.root)
    .pipe(customPlumber('Error On Clean App'))
    .pipe(clean())
  done()
}

/* -- Copy Font Form Source to Destination Folder -- */
function fonts(done) {
  gulp
    .src(src.rootFonts)
    .pipe(customPlumber('Error On Copy Fonts'))
    .pipe(gulp.dest(dest.fonts))
  done()
}

function images(done) {
  gulp
    .src('./src/assets/img/**/*')
    .pipe(customPlumber('Error On Copy Images'))
    .pipe(gulp.dest('./dest/assets/img/'))
  done()
}

/* --
    All HTMl Files Compile With Partial & Copy Paste To Destination Folder
-------------------------------------------------------------------- */
function html(done) {
  gulp
    .src(src.rootHtml)
    .pipe(customPlumber('Error On Compile HTML'))
    .pipe(
      fileInclude({
        basepath: src.rootPartials
      })
    )
    .pipe(beautifyCode())
    .pipe(gulp.dest(dest.root))
  done()
}

/* --
    CSS & SCSS Task
-------------------------------------------------------------------- */

/* -- Vendor CSS -- */
function vendorCss(done) {
  gulp
    .src(src.rootVendorCss)
    .pipe(customPlumber('Error On Copying Vendor CSS'))
    .pipe(gulp.dest(dest.rootVendorCss))
    .pipe(customPlumber('Error On Combining Vendor CSS'))
    .pipe(
      concat('vendor.css', {
        newLine: separator
      })
    )
    .pipe(autoprefixer(autoPreFixerOptions))
    .pipe(gulp.dest(dest.rootVendorCss))
    .pipe(customPlumber('Error On Combine & Minifying Vendor CSS'))
    .pipe(
      concat('vendor.min.css', {
        newLine: separator
      })
    )
    .pipe(uglifycss())
    .pipe(autoprefixer(autoPreFixerOptions))
    .pipe(gulp.dest(dest.rootVendorCss))
  done()
}

/* -- All CSS Plugins -- */
function pluginsCss(done) {
  gulp
    .src(src.rootPluginsCss)
    .pipe(customPlumber('Error On Copying Plugins CSS'))
    .pipe(gulp.dest(dest.rootPluginsCss))
    .pipe(customPlumber('Error On Combining Plugins CSS'))
    .pipe(
      concat('plugins.css', {
        newLine: separator
      })
    )
    .pipe(autoprefixer(autoPreFixerOptions))
    .pipe(gulp.dest(dest.rootPluginsCss))
    .pipe(customPlumber('Error On Combine & Minifying Plugins CSS'))
    .pipe(
      concat('plugins.min.css', {
        newLine: separator
      })
    )
    .pipe(uglifycss())
    .pipe(autoprefixer(autoPreFixerOptions))
    .pipe(gulp.dest(dest.rootPluginsCss))
  done()
}

/* -- Gulp Compile Scss to Css Task & Minify -- */
function styleCss(done) {
  gulp
    .src(src.styleScss)
    .pipe(sourcemaps.init())
    .pipe(customPlumber('Error On Compiling Style Scss'))
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(concat('style.css'))
    .pipe(autoprefixer(autoPreFixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.rootCss))
    .pipe(customPlumber('Error On Compiling & Minifying Style Scss'))
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer(autoPreFixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.rootCss))
  done()
}

/* -- Gulp Compile Scss to Css Task & Minify -- */
function scss(done) {
  gulp
    .src(src.scssAll)
    .pipe(customPlumber('Error On Compiling Style Scss'))
    .pipe(gulp.dest(dest.scss))
  done()
}

/* --
    JS Task
-------------------------------------------------------------------- */

/* -- Vendor JS -- */
function vendorJs(done) {
  gulp
    .src(src.rootVendorJs)
    .pipe(customPlumber('Error On Copying Vendor JS'))
    .pipe(gulp.dest(dest.rootVendorJs))
    .pipe(customPlumber('Error On Combining Vendor JS'))
    .pipe(
      concat('vendor.js', {
        newLine: separator
      })
    )
    .pipe(gulp.dest(dest.rootVendorJs))
  done()
}

/* -- All JS Plugins -- */
function pluginsJs(done) {
  gulp
    .src(src.rootPluginsJs)
    .pipe(customPlumber('Error On Copying Plugins JS'))
    .pipe(gulp.dest(dest.rootPluginsJs))
    .pipe(customPlumber('Error On Combining Plugins JS'))
    .pipe(
      concat('plugins.js', {
        newLine: separator
      })
    )
    .pipe(gulp.dest(dest.rootPluginsJs))
  done()
}

/* -- Copy all JS Plugins Related Folder Form Sourch Plugins Folder To Destination Plugins Folder -- */
function pluginsRelatedJs(done) {
  gulp
    .src(src.pluginsJsRelFolder)
    .pipe(
      customPlumber(
        'Error On Copying all JS Plugins Related Folder Form Sourch Plugins Folder To Destination Plugins Folder'
      )
    )
    .pipe(gulp.dest(dest.rootPluginsJs))
  done()
}

/* -- Copy all JS Plugins Related Folder Form Sourch Root JS Folder To Destination Root JS Folder -- */
function pluginsRelatedJsRoot(done) {
  gulp
    .src(src.pluginsJsRelFolderRoot)
    .pipe(
      customPlumber(
        'Error On Copying all JS Plugins Related Folder Form Sourch Root JS Folder To Destination Root JS Folder'
      )
    )
    .pipe(gulp.dest(dest.rootJs))
  done()
}

/* -- Gulp Main Js Task -- */
function mainJs(done) {
  gulp
    .src(src.mainJs)
    .pipe(customPlumber('Error On Copying Main Js File'))
    .pipe(gulp.dest(dest.rootJs))
  done()
}

/* --
    All, Watch & Default Task
-------------------------------------------------------------------- */

/* -- All -- */
gulp.task('clean', cleanProject)
gulp.task(
  'allTask',
  gulp.series(
    fonts,
    images,
    html,
    vendorCss,
    pluginsCss,
    styleCss,
    scss,
    vendorJs,
    pluginsJs,
    pluginsRelatedJs,
    pluginsRelatedJsRoot,
    mainJs
  )
)

/* -- Watch -- */
function watchFiles() {
  gulp.watch(src.fontsAll, gulp.series(fonts, reload))

  gulp.watch(src.rootHtml, gulp.series(html, reload))
  gulp.watch(src.rootPartials, gulp.series(html, reload))

  gulp.watch(src.rootVendorCss, gulp.series(vendorCss, reload))
  gulp.watch(src.rootPluginsCss, gulp.series(pluginsCss, reload))
  gulp.watch(src.scssAll, gulp.series(styleCss, reload))
  gulp.watch(src.scssAll, gulp.series(scss, reload))

  gulp.watch(src.rootVendorJs, gulp.series(vendorJs, reload))
  gulp.watch(src.rootPluginsJs, gulp.series(pluginsJs, reload))
  gulp.watch(src.pluginsJsRelFolder, gulp.series(pluginsRelatedJs, reload))
  gulp.watch(
    src.pluginsJsRelFolderRoot,
    gulp.series(pluginsRelatedJsRoot, reload)
  )
  gulp.watch(src.mainJs, gulp.series(mainJs, reload))
  gulp.watch('./src/assets/img/**/*', gulp.series(images, reload))
}

/* -- Default -- */
gulp.task(
  'default',
  gulp.series('allTask', gulp.parallel(liveBrowserSync, watchFiles))
)