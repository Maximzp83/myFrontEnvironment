//MAIN
const gulp        	= require('gulp'), //Gulp
browserSync    		= require('browser-sync').create(), // Local server

//HTML
// pug			 		  = require('gulp-pug'), // Pug(Jade) into HTML

//CSS
autoPrefixer			= require('autoprefixer'), // Autoprefixer for older browsers
cssnano      		  	= require('gulp-cssnano'), // CSS minification
// cssnext			  	= require('postcss-cssnext'), // CSS4 syntax
mediaPacker		    	= require('css-mqpacker'), // Gather all media queries together
sass 					= require('gulp-sass'),
sourcemaps		    	= require('gulp-sourcemaps'), //Deep analysis for file direction
postcss			      	= require('gulp-postcss'), // Sass sytnax in css
// postcssFlexbugsFixes 	= require('postcss-flexbugs-fixes'),
postcssFocus            = require('postcss-focus'),

//JS
babel	 		    	= require('gulp-babel'), // Convert ES6 syntax into ES5
uglify				    = require('gulp-uglify'), // JavaScript minification

//OTHER
// absolutePath		    = require('path'), // Create file's path
// cache        			= require('gulp-cached'), // Cache edited files
// concat        			= require('gulp-concat'), // Get different files joined
del          			= require('del'), // Remove files
gulpIf 					= require('gulp-if'),
HTMLInclude 			= require('gulp-file-include'),
include 		 		= require('gulp-include'), // Include other files into another
imagemin     		  	= require('gulp-imagemin'), // Minify images
notify				    = require('gulp-notify'), // Tell about error during task processing
pngquant    			= require('imagemin-pngquant'), // Imagemin plugin for png
rename       		  	= require('gulp-rename'), // Rename files
size 				  	= require('gulp-size');


// ===========OPTIONS==============
var serverDevConfig = {
	server: { baseDir: 'build' },
	tunnel: false,
	ghostMode: false,
	online: false,
	open: false,
	host: 'localhost',
	logPrefix: "FrontendDEV",
	reloadDelay: 300
};
// ----------
var serverProdConfig = {
    server: { baseDir: "production" },
    tunnel: 'tunnel',  //you can set URL name here 
    ghostMode: false,
    online: true,
	open:  "tunnel",
    host: 'localhost',
    logPrefix: "FrontendPROD",
    reloadDelay: 500
};
// --------------
var path = {
    build: { //patch for builded files
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    buildProd: { //patch for builded files
        html: 'production/',
        js: 'production/js/',
        css: 'production/css/',
        img: 'production/img/',
        fonts: 'production/fonts/'
    },
    src: { //patch for source files
        html: 'src/*.html', 
        js: 'src/js/index.js',
        scss: 'src/styles/main.scss',
        css: 'src/styles/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //patch for wathching files
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        styles: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    cleanProduction: 'production',
    cleanBuild: 'build'
};

// --------PostCSS Config--------
var postcssConfig = [
    autoPrefixer(),
    // postcssFlexbugsFixes(),
    mediaPacker(),
    postcssFocus()
];

// =========== Main ============

gulp.task('test', function(done) {
	console.log('==========GULP TEST OK!==========');
	done();
});

// ----browser-sync----
gulp.task('serverDev', function() {
	browserSync.init( serverDevConfig );
	
});

gulp.task('serverProd', function() {
	browserSync.init( serverProdConfig );
});

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

// =====================

// =========DEV Builds========
// --------HTML----------
gulp.task('build:html', function (done) {
	gulp.src(path.src.html) 
	.pipe(HTMLInclude( {prefix: '@@', basepath: '@file'} ))
	.pipe(gulp.dest(path.build.html));
	done(); 
});

// --------JS----------
gulp.task('build:js', function () {
    return gulp.src(path.src.js)
        .pipe(include()).on('error', console.error) 
        .pipe(sourcemaps.init()) 
        .pipe(babel( {presets: ['env']}) ).on('error', function(err) {
            notify({ title: 'build:js task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js)) 
});

// --------CSS----------
gulp.task('build:css', function () {
    return gulp.src([path.src.scss, path.src.css]) 
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssConfig))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
});

// --------Images----------
gulp.task('build:image', function () {
   return gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false, cleanupIDs: true}],
            use: [pngquant()],
            interlaced: true
        })).on('error', console.error) 
        .pipe(gulp.dest(path.build.img)) 
});
// --------Fonts--------
gulp.task('build:fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// =========PROD Builds========
// --------HTML----------
gulp.task('buildProd:html', function () {
	return gulp.src(path.src.html) 
		.pipe(HTMLInclude( {prefix: '@@', basepath: '@file'} ))
		.pipe(gulp.dest(path.buildProd.html))
		.pipe(size({ title: 'html size =' }))
});
// --------JS----------
gulp.task('buildProd:js', function () {
    return gulp.src(path.src.js)
        .pipe(include()).on('error', console.error) 
        .pipe(babel( {presets: ['env']}) ).on('error', function(err) {
            notify({ title: 'js:buildProd task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(rename( {suffix: '.min'} ))
        .pipe(gulp.dest(path.buildProd.js))
        .pipe(size({ title: 'js size =' }))
});

// --------CSS----------
gulp.task('buildProd:css', function () {
	return gulp.src([path.src.scss, path.src.css])
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(postcssConfig))
		.pipe(cssnano({zindex: false}))
		.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.buildProd.css))
        .pipe(size({ title: 'styles size =' })) 
});
// ---------Images----------
gulp.task('buildProd:image', function () {
    return gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false, cleanupIDs: true}],
            use: [pngquant()],
            interlaced: true
        })).on('error', console.error) 
        .pipe(gulp.dest(path.buildProd.img))
        .pipe(size({ title: 'images size =' }))  
});
// ---------Fonts--------
gulp.task('buildProd:fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.buildProd.fonts))
        .pipe(size({ title: 'fonts size =' })) 
});

// =========Build===========

gulp.task('clean:build', function() {
    return del(path.cleanBuild);
});
gulp.task('clean:production', function() {
    return del(path.cleanProduction);
});

// -----Dev-----
gulp.task('build:Dev', gulp.series('clean:build', gulp.parallel(
	'build:html','build:js','build:css','build:fonts','build:image'
	)));

// -----Prod-----
gulp.task('build:Prod', gulp.series('clean:production', gulp.parallel(
	'buildProd:html','buildProd:js','buildProd:css','buildProd:fonts','buildProd:image'
	)));

// =========Watch===========
gulp.task('watch', function() {
    gulp.watch( path.watch.html, gulp.series('build:html', 'reload') );
    gulp.watch( path.watch.styles, gulp.series('build:css', 'reload') );
    gulp.watch( path.watch.js, gulp.series('build:js', 'reload') );
    gulp.watch( path.watch.img, gulp.series('clean:build', 'build:image', 'reload') );
    gulp.watch( path.watch.fonts, gulp.series('build:fonts', 'reload') );
});

// =============DEVELOPMENT=============
gulp.task('dev', gulp.series('build:Dev', gulp.parallel('watch', 'serverDev') ));

// =============PRODUCTION=============
gulp.task('prod', gulp.series('build:Prod', 'serverProd') );

