var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var globby = require('globby');
var template = require('gulp-template');
var runSequence = require('run-sequence');
var merge = require('merge-stream');

var build_config = require('./build.config.js');
var src = build_config.src;
var vendor = build_config.vendor;
var build_dir = build_config.build_dir;

gulp.task('sass', function(){
    return gulp.src(src.sass)
        .pipe(sass({errLogToConsole:true}))
        .pipe(autoprefixer('last 10 version'))
        .pipe(gulp.dest(build_dir + '/assets/css'));
});

gulp.task('watch-sass', function(){
    gulp.watch(src.sass, ['sass']);
});

gulp.task('js', function(){
    return gulp.src(src.js)
        .pipe(gulp.dest(build_dir + '/assets/js'));
});

gulp.task('watch-js', function(){
    gulp.watch(src.js, ['js']);
});

gulp.task('tpl', function(){
    return gulp.src(src.tpl)
        .pipe(templateCache())
        .pipe(gulp.dest(build_dir + '/assets/js'));
});

gulp.task('watch-tpl', function(){
    gulp.watch(src.tpl, ['tpl']);
});

gulp.task('vendor', function(){
    var merged = merge();
    for(var key in vendor){
        var paths = vendor[key];
        merged.add(gulp.src(paths)
            .pipe(gulp.dest(build_dir + '/assets/vendor/' + key)));
    }
    return merged;
});

gulp.task('index', function(){
    return globby([build_dir + '/assets/vendor/angular/angular.js',build_dir + '/assets/vendor/**/*.js', build_dir + '/**/*.{js,css}'], null, function(err, files){
        files = files.map(function(file){
            return file.replace(build_dir, '');
        });
        var cssFiles = files.filter(function(file){
            return file.match(/\.css$/);
        });
        var jsFiles = files.filter(function(file){
            return file.match(/\.js$/);
        });
        return gulp.src('src/index.html')
            .pipe(template({
                styles:cssFiles,
                scripts:jsFiles
            }))
            .pipe(gulp.dest(build_dir));
    });
});

gulp.task('watch-index', function(){
    gulp.watch(build_dir + '/**/*.{js,css}', ['index']);
});

gulp.task('clear', function(cb){
    del([build_dir + '/**/*'], cb);
});

gulp.task('watch', ['watch-js', 'watch-sass', 'watch-tpl', 'watch-index']);
gulp.task('build', function(cb){
    return runSequence('clear', ['sass', 'vendor', 'js', 'tpl'], 'index', cb);
});

gulp.task('default', function(){
    return runSequence('build', 'watch');
});