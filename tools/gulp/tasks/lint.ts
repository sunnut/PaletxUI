import gulp = require('gulp');
import {execNodeTask, sequenceTask} from '../task_helpers';

var gulpFormat = require('gulp-clang-format');

gulp.task('format', function() {
  return gulp.src(['src/**/*.ts'], {base: '.'})
      .pipe(gulpFormat.format())
      .pipe(gulp.dest('.'));
});

gulp.task('stylelint', execNodeTask(
  'stylelint', ['src/**/*.scss', '--config', 'stylelint-config.json', '--syntax', 'scss']
));
gulp.task('tslint', execNodeTask('tslint', ['-c', 'tslint.json', 'src/**/*.ts']));

gulp.task('lint', sequenceTask('format', 'tslint', 'stylelint'));
