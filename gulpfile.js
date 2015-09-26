var gulp = require('gulp');
var inject = require('gulp-inject');
var run = require('gulp-run');
var traceur = require('gulp-traceur');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var cache = require('gulp-cached');
var recess = require('gulp-recess');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var rename = require('gulp-rename');
var karma = require('gulp-karma');
var gulpNgConfig = require('gulp-ng-config');

gulp.task('default', function(cb) {
    runSequence(
        'develop:cleanAll',
        'develop:serve',
        cb
    );
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir : './develop',
            index: 'index.html'
        },
        open : false,
        ui: {
            port: 8090
        }
    });

    gulp.watch('app/modules/**/*.js', ['develop:compile']);
    gulp.watch('app/modules/**/*.tpl.html', ['develop:templateCache']);
    gulp.watch('app/modules/**/*.less', ['develop:compileLess']);
    gulp.watch('app/**/*.html', ['develop:copyHtml']);
    gulp.watch('app/index.html', ['develop:index']);
});

gulp.task('develop:cleanAll', function(cb) {
    del([
        'develop'
    ], cb);
});

gulp.task('index', ['compile'], function() {
    var target = gulp.src('app/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var cssSources = gulp.src(['develop/modules/**/*.css'], { read: false });
    var jsSources = gulp.src(['develop/modules/**/*.js']).pipe(angularFilesort());

    return target
        .pipe(inject(gulp.src(bowerFiles({ paths: 'app' }, {read: false})), {name: 'bower', relative: true }))
        .pipe(inject(es.merge(jsSources, cssSources), { addRootSlash: false, ignorePath: 'develop' })).pipe(gulp.dest('develop'));
});

gulp.task('compile', ['jsHint'], function() {
    return gulp.src('app/modules/**/*.js')
        .pipe(traceur()).on('error', errHandler)
        .pipe(gulp.dest('develop/modules'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build', ['index', 'templateCache', 'compileLess', 'copyOther']);

gulp.task('jsHint', function() {
    return gulp.src('app/modules/**/*.js')
        .pipe(cache('develop:jsHint'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('templateCache', function () {
    gulp.src('app/modules/**/*.tpl.html')
        .pipe(templateCache('templates.gen.js', {
            root : 'app/modules',
            module: 'kv.app.templates.gen',
            standalone: true,
            templateHeader : '(() => { angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
            templateFooter : '}]); })();'
        }))
        .pipe(gulp.dest('app/modules'));
});

gulp.task('copyOther', ['copyComponents', 'copyHtml', 'copyFonts']);

gulp.task('copyBowerComponents', function() {
    return gulp.src('app/bower_components/**/*')
        .pipe(gulp.dest('develop/bower_components'));
});

gulp.task('copyLocalComponents', function() {
    return gulp.src('app/components/**/*')
        .pipe(gulp.dest('develop/components'));
});

gulp.task('copyComponents', ['copyBowerComponents', 'copyLocalComponents']);

gulp.task('copyHtml', function() {
    return gulp.src(['app/**/*.html', '!app/**/*.tpl.html', '!app/index.html'])
        .pipe(gulp.dest('develop'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('copyFonts', function() {
    return gulp.src(['app/**/*.woff', 'app/**/*.woff2', 'app/**/*.ttf'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('develop/fonts'));
});

gulp.task('compileLess', ['develop:lessHint'], function () {
    return gulp.src('app/modules/styles.less')
        .pipe(less()).on('error', errHandler)
        .pipe(gulp.dest('develop'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('lessHint', function() {
    return gulp.src('app/modules/**/*.less')
        .pipe(cache('develop:lessHint'))
        .pipe(recess()).on('error', errHandler)
        .pipe(recess.reporter()).on('error', errHandler);
});

gulp.task('test', ['develop:build'], function() {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('autotest', function() {
    return gulp.watch(['app/modules/**/*.js', 'app/tests/**/*.js'], ['test']);
});

function errHandler (err) {
    console.log(err.toString());
    this.emit('end');
}