var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// var less = require('gulp-less');
// var rename = require('gulp-rename');
// var cleanCSS = require('gulp-clean-css');
// var del = require('del');

const paths = {
  // styles: {
  //   src: 'src/styles/**/*.less',
  //   dest: 'assets/styles/'
  // },
  scripts: {
    src: 'dist/**/*.js',
    dest: 'distMin/'
  }
};

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

scripts();
