var gulp = require('gulp')
  , git = require('gulp-git')
  , bump = require('gulp-bump')
  , filter = require('gulp-filter')
  , tag_version = require('gulp-tag-version')
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

/*
 *  gulp patch     # makes v0.1.0 → v0.1.1
 *  gulp feature   # makes v0.1.1 → v0.2.0
 *  gulp release   # makes v0.2.1 → v1.0.0
 */
gulp.task('patch', function() { return inc('patch') })
gulp.task('feature', function() { return inc('minor') })
gulp.task('release', function() { return inc('major') })

function onerror(err) {
  console.log(err.toString)
  this.emit('end')
}

function inc(importance) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('version bump'))
    .pipe(filter('package.json'))
    .pipe(tag_version({ prefix: '' }));
}
