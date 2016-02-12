gulp    = require 'gulp'
glp     = require('gulp-load-plugins')
p       = glp()

gulp.task 'css', ->
  gulp.src 'app/assets/css/*.css'
    .pipe p.connect.reload()
