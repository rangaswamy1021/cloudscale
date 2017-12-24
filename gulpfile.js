var gulp=require('gulp');
var sass=require('gulp-sass');
var browserSync=require('browser-sync').create();
var useref=require('gulp-useref');
var image=require('gulp-imagemin');
var uglify=require('gulp-uglify');
var gulpIf=require('gulp-if');
var cssnano=require('gulp-cssnano');
gulp.task('browser-sync',function(){
browserSync.init({
	server:{
		baseDir:'app/'
	}
});
});
function swallowError (error) {
	
	  // If you want details of the error in the console
	  console.log(error.toString())
	
	  this.emit('end')
	}
gulp.task('sass',function(){
	return gulp.src('app/assets/scss/*.scss')
				.pipe(sass())
				.on('error', swallowError)
				.pipe(gulp.dest('app/assets/css'))
				.pipe(browserSync.reload({stream:true}));
});
gulp.task('image', function(){
	return gulp.src('app/assets/images/**/*.+(png|jpg|gif|svg)')
				.pipe(image())
				.pipe(gulp.dest('dist/assets/images'));
})
gulp.task('useref',function(){
	return gulp.src('app/*.html').pipe(useref()).pipe(gulpIf('*.js',uglify())).pipe(gulpIf('*.css',cssnano())).pipe(gulp.dest('dist')).pipe(browserSync.reload({stream:true}));
});
gulp.task('build',['useref','image']);
gulp.task('watch',['browser-sync','sass'],function(){
gulp.watch('app/assets/scss/**/*.scss',['sass']);
gulp.watch('app/*.html',browserSync.reload);
gulp.watch('app/assets/js/*.js',browserSync.reload);
});
