gulp    = require 'gulp'
glp     = require('gulp-load-plugins')
p       = glp()

gulp.task 'coffee', ->
  gulp.src [
    'coffee/*App.coffee'
    'coffee/**/*Module.coffee'
    'coffee/**/*Constante.coffee'
    'coffee/**/*Service.coffee'
    'coffee/**/*Factory.coffee'
    'coffee/**/*Directive.coffee'
    'coffee/**/*.coffee'
    '!coffee/**/*.Spec.coffee'
  ]
  .pipe p.coffee bare: false
  .on 'error', p.util.log
  .pipe p.concat 'core.js', {newLine: ';'}
  #.pipe(p.bytediff.start())
  #.pipe p.uglify {mangle: false}
  #.pipe(p.bytediff.stop())
  .pipe p.ngAnnotate()
  .pipe gulp.dest 'app/js'
  .pipe p.connect.reload()
