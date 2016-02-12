params   = require './config.coffee'
gulp    = require 'gulp'
glp     = require 'gulp-load-plugins'
p       = glp()


gulp.task 'html', ->
  gulp
    .src params.html_folder
    .pipe p.connect.reload()
