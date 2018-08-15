var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var beep = require('beepbeep');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('gulp-rimraf');
var colors = require('colors');
var livereload = require('gulp-livereload');

gulp.task('sass:dev', function () {

    console.log('[sass]'.bold.magenta + ' Compiling development CSS');

    return gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceMap: true
        }))
        .on('error', function (error) {
            beep();
            console.log('[sass]'.bold.magenta + ' There was an issue compiling Sass'.bold.red);
            console.error(error.message);
            this.emit('end');
        })
        // Should be writing sourcemaps AFTER autoprefixer runs,
        // but that breaks everything right now.
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie 9']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

gulp.task('sass:prod', function () {

    console.log('[sass]'.bold.magenta + ' Compiling production CSS');

    return gulp.src('scss/*.scss')

        .pipe(sass({
            outputStyle: 'compressed',
            sourcemap: false
        }))

        .on('error', function (error) {
            beep();
            console.error(error);
            this.emit('end');
        })

        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie 9']
        }))

        .pipe(gulp.dest('./css'));
});



// Watch files for changes
gulp.task('watch', function () {

    console.log('[watch]'.bold.magenta + ' Watching Sass files for changes');

    livereload.listen();
    gulp.watch(['scss/**/*.scss'], ['sass:dev']);

});

// Compile Sass and watch for file changes
gulp.task('dev', ['sass:dev', 'watch'], function () {
    return console.log('\n[dev]'.bold.magenta + ' Ready for you to start doing things\n'.bold.green);
});


// Compile production Sass
gulp.task('build', ['sass:prod']);

// Visual Studio build tasks
//gulp.task('Debug', ['sass:dev']);
//gulp.task('Release', ['sass:prod']);