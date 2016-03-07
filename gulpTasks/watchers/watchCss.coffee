gulp    = require 'gulp'

gulp.task 'watchCss', ->
  gulp
    .watch ['app/assets/css/*.css'], ['html']
    .on 'change', (event) ->
      console.log 'File : ' +
      event.path +
      ' was ' +
      event.type +
      ', running tasks...'
