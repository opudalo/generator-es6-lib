var gulp = require('gulp')
  , git = require('gulp-git')
  , bump = require('gulp-bump')
  , filter = require('gulp-filter')
  , tag_version = require('gulp-tag-version')

/*
 *  gulp patch     # makes 0.1.0 → 0.1.1
 *  gulp feature   # makes 0.1.1 → 0.2.0
 *  gulp release   # makes 0.2.1 → 1.0.0
 */
gulp.task('default', ['patch'])
gulp.task('patch', function() { return inc('patch') })
gulp.task('feature', function() { return inc('minor') })
gulp.task('release', function() { return inc('major') })

function inc(importance) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('version bump'))
    .pipe(filter('package.json'))
    .pipe(tag_version({ prefix: '' }));
}
