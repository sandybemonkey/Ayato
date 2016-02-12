params    = require './config.coffee'
gulp    = require 'gulp'
glp     = require('gulp-load-plugins')
p       = glp()

gulp.task 'server', ->
  p.connect.server
    root: params.app_path
    port: params.port
    livereload: true

# default task
gulp.task 'default', [
  'server'
  'coffee'
  'watchCoff'
  'watchHtml'
  'watchCss'
]
