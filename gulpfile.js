const gulp = require('gulp');

// babel 转 js
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
//  压缩js
const uglify = require('gulp-uglify');
const pump = require('pump');
// scss转css  和 压缩
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
// 压缩图片
const tinypng = require('gulp-tinypng');


// server
const browserSync = require('browser-sync').create();
const SSI = require('browsersync-ssi');

gulp.task('default', function(){
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('src/js/*.js', gulp.series('compress'));
    console.log('监听中...');
});

// watch   scss  转 css
gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 10'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});


// 压缩css
gulp.task('mincss', () =>
    gulp.src('dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/min-css'))
);

//  babel 转码js  和 压缩js  并且有source map
gulp.task('compress', function (cb) {
    pump([
            gulp.src('src/js/*.js'),
            sourcemaps.init(),
            babel({
                presets: ['@babel/env']
            }),
            uglify(),
            sourcemaps.write(),
            gulp.dest('dist/js')
        ],
        cb
    );
});

//  压缩图片
const myKey = 'Er7GcvNBNDyUVEfkgX1jYpUtQ6eGkH6';
gulp.task('tinypng', () =>
    gulp.src('src/images/*')
        .pipe(tinypng(myKey))
        .pipe(gulp.dest('dist/images2'))
);





// gulp.task('default', () =>{
//   gulp.src('src/app.js')
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('dist'))
// })