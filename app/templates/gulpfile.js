var gulp = require('gulp')
  , webpack = require('gulp-webpack-build')
  , CONFIG_FILENAME = webpack.config.CONFIG_FILENAME
  , mochaPhantomJS = require('gulp-mocha-phantomjs')

var src = './src'
  , test = './test'
  , dest = './dist'
  , mochaPhantomConfig = {
    phantomjs: {
      useColors: true
    }
  }

gulp.task('default', ['watch'])

gulp.task('watch', ['test'], function() {
  gulp.watch([src + '/**/*.js', test + '/**/*.js'], ['test'])
})

gulp.task('webpack', function (event) {
  return gulp.src('./')
    .pipe(webpack.closest(CONFIG_FILENAME))
    .pipe(webpack.compile())
    .pipe(webpack.format({
      version: false,
      timings: true
    }))
    .pipe(webpack.failAfter({
      errors: true,
      warnings: true
    }))
    .pipe(gulp.dest(dest))
})

gulp.task('test', ['webpack'], function () {
  return gulp.src('test/runner.html')
    .pipe(mochaPhantomJS(mochaPhantomConfig))
    .on('error', onerror)
})

function onerror(err) {
  console.log(err.toString)
  this.emit('end')
}
