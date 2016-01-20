var gulp = require('gulp')
, inject = require('gulp-inject')
, wiredep = require('wiredep')
, nodemon = require('gulp-nodemon')
, less = require('gulp-less');

gulp.task('injectfiles', function() {

    var targetUrl = './src/index.ejs';
    wiredep({src: targetUrl});

    var target = gulp.src(targetUrl);
    var sources = gulp.src([
        './src/js/**/*.js',
        './src/css/**/*.css'
    ], {read: false});

    target.pipe(inject(sources, {ignorePath: 'src'}))
      .pipe(gulp.dest('./src'));

});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('start', function () {
  nodemon({ script: 'server.js'
          , ext: 'html ejs js css less'
          , ignore: ['index.ejs', 'src/css/*.css']
          , tasks: ['injectfiles', 'less'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});
