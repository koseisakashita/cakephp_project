var gulp   = require('gulp')
var plugins = require('gulp-load-plugins')()


// webpackを使う。
gulp.task('webpack', function(){
  gulp.src('./src/Assets/coffee/**/*.coffee')
  .pipe(plugins.webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./webroot/js/'))
});

// coffeeのコンパイルタスク
gulp.task('compile-coffee', function(){
  gulp.src('./src/Assets/coffee/**/*.coffee')
    .pipe(plugins.plumber())
    .pipe(plugins.coffee())
    .pipe(gulp.dest('./webroot/js/'))
});

// sassのコンパイルタスク
gulp.task('sass', function(){
    //scssディレクトリの指定
    gulp.src('./src/Assets/sass/**/*.scss')
    .pipe(plugins.plumber())
    //コンパイル実行
    .pipe(plugins.sass({style : 'expanded'}))
    .on('error', function(err){
      console.log(err.message+'です！')
    })
    //出力先の指定
    .pipe(gulp.dest('./webroot/css/'));
});

//sassの自動監視タスク
gulp.task('watch-sass', ['sass'], function(){
  var watcher = gulp.watch('./src/Assets/sass/**/*.scss', ['sass']);
  watcher.on('change', function(event) {
    console.log(event)
  });
});

//webpackの自動監視タスク
gulp.task('watch-webpack', ['webpack'], function(){
  var watcher = gulp.watch('./src/Assets/coffee/**/*.coffee', ['webpack']);
  watcher.on('change', function(event) {
  });
});

//coffeeの自動監視のタスク
gulp.task('watch-coffee', ['compile-coffee'], function(){
  var watcher = gulp.watch('./src/Assets/coffee/**/*.coffee', ['compile-coffee']);
  watcher.on('change', function(event) {
  });
});

gulp.task('default', ['watch-sass', 'watch-webpack']);

