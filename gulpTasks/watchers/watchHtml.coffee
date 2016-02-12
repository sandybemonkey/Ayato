gulp    = require 'gulp'

gulp.task 'watchHtml', ->
  gulp
    .watch ['app/**/*.html'], ['html']
    .on 'change', (event) ->
      console.log 'File : ' +
      event.path +
      ' was ' +
      event.type +
      ', running tasks...'
