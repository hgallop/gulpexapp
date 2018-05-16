const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    -- TOP LEVEL FUNCTIONS --

    gulp.task - define tasks
    gulp.src - Point to the files to use
    gulp.dest - points to the folder to output
    gulp.watch - Watch files and folders for changes
*/

//Logs message
//run with gulp message in terminal
gulp.task('message', function(){
    return console.log('Gulp is running!');
});

//Copy all HTML files
// run with gulp copyHtml in terminal
gulp.task('copyHtml', function(){
    //points to all html files in the src directory
    gulp.src('src/*.html')
        //pipes the html files to a directory called dist
        .pipe(gulp.dest('dist'));
});

//Optimize images
//run with gulp imageMin in the terminal
gulp.task('imageMin', () =>
    //points to all files in the image directory inside of the src directory
    gulp.src('src/images/*')
        //pipes a call to imagemin  
        .pipe(imagemin())
        //pipes files to the images directory inside the dist directory
        .pipe(gulp.dest('dist/images'))
);

//Minify Js
//run with gulp minify in the terminal
// gulp.task('minify', function(){
//     //points to all files in the js directory inside the src directory
//     gulp.src('src/js/*.js')
//         //calls uglify to optimize the file
//         .pipe(uglify())
//         //pipes the optimized file to the js directory inside the dist directory
//         .pipe(gulp.dest('dist/js'));
// });

//Compile sass
//run with gulp sass in terminal
gulp.task('sass', function(){
    //points to all scss files in the sass directory inside of the srd directory
    gulp.src('src/sass/*.scss')
        //pipes a call to sass and add an action to logError if there is an error while compiling the sass
        .pipe(sass().on('error', sass.logError))
        //pipes the compiled sass to a css file inside the css directory inside the dist directory
        .pipe(gulp.dest('dist/css'));
});

//Combine all js files
//run with gulp scripts in the terminal
gulp.task('scripts', function(){
    //points to all js files in the js directory inside the src directory
    gulp.src('src/js/*.js')
        //calls concat to combine the code from both js files into a single main.js file
        .pipe(concat('main.js'))
        //calls uglify to optimize the main.js file
        .pipe(uglify())
        //pipes the combined and minified file to the js directory inside the dist directory
        .pipe(gulp.dest('dist/js'));
});

//Runs all tasks
//run with gulp in terminal as this is what gulp will default to called
gulp.task('default', ['message', 'copyHtml', 'imageMin', /*'minify',*/ 'sass', 'scripts']);

//Watches
//run with gulp watch in terminal
gulp.task('watch', function(){
    //tells gulp to watch files specified in the first argument for any changes and then run the task that is the second argument when any change is detected.
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
});