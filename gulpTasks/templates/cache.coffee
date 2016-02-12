params   = require './config.coffee'
gulp    = require 'gulp'
glp     = require('gulp-load-plugins')
p       = glp()

gulp.task 'cache', ->
  gulp
    .src params.html_folder
    .pipe p.angularTemplatecache('BmnkTemplatesCache.js', { module:'Bmnk', standalone:false })
    .pipe gulp.dest params.html_cache_dest_folder
