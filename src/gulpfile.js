const gulp = require('gulp')
const { task, src } = gulp
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const ghPages = require('gulp-gh-pages')
const cssInput = './stylesheets/*.scss'
const cssOutput = '../public/assets/css'
const jsInput = './js/*.js'
const jsOutput = '../public/assets/js'

task('css', () => 
        // Find all `.scss` files from the `stylesheets/` folder
        src(cssInput)
        // Run Sass on those files
        .pipe(sass())
        // Add vendor prefixes for browsers over 5% of US usage
        .pipe(autoprefixer('>1% in US'))
        //Minify the css
        .pipe(cssmin())
        // Write the resulting CSS in the public folder
        .pipe(gulp.dest(cssOutput))
)

task('javascript', () => 
    src(jsInput)
    // minify/uglify js
    .pipe(uglify())
    // Write to public folder
    .pipe(gulp.dest(jsOutput))
)


task('deploy', () => 
    src('./public')
    .pipe(ghPages())
)
