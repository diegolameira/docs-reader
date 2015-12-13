var gulp              = require('gulp');
var shell                = require('gulp-shell');
var browserSync = require('browser-sync').create();
var reload            = browserSync.reload;

var path = {
	src: 'src',
	dist: 'public',
	bower: 'bower_components'
};

// Static server
gulp.task('serve', function() {

	browserSync.init({
		server: {
			baseDir: path.src,
			routes: {
				"/bower_components": "bower_components"
			}
		},
		options: {
			reloadDelay: 250
		},
		notify: false
	});

	gulp.watch(path.src+'/**/*.html').on('change', browserSync.reload);
	gulp.watch(path.src+'/**/*.{css,js}').on(['add', 'unlink'], browserSync.reload);

});

gulp.task('clean', function(){
	return shell.task([
		'rm -rf ' + path.dist
	]);
});

gulp.task('build', ['clean'], function(){

	gulp.src( path.src + '/**/*' )
		.pipe(gulp.dest(path.dist));

	gulp.src(path.bower + '/**/*' )
		.pipe(gulp.dest(path.dist + '/' + path.bower));
		
});