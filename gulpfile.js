var gulp = require('gulp')
, inject = require('gulp-inject')
, wiredep = require('wiredep')
, nodemon = require('gulp-nodemon');

gulp.task('injectfiles', function() {

    var targetUrl = './src/index.ejs';
    wiredep({src: targetUrl});

    var target = gulp.src(targetUrl);
    var sources = gulp.src(['./src/js/**/*.js', './src/css/**/*.css'], {read: false});

    target.pipe(inject(sources, {ignorePath: 'src'}))
      .pipe(gulp.dest('./src'));

});

gulp.task('start', function () {
  nodemon({ script: 'server.js'
          , ext: 'html ejs js css'
          , ignore: ['index.ejs']
          , tasks: ['injectfiles'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});
