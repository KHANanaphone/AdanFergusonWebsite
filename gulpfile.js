var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep');

gulp.task('default', function() {

    var target = './src/index.html';
    wiredep({src: target});

    var target = gulp.src(target);
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./src/js/**/*.js', './src/css/**/*.css'], {read: false});

    target.pipe(inject(sources))
      .pipe(gulp.dest('./src'));

});
