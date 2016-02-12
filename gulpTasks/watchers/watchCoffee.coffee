gulp    = require 'gulp'

gulp.task 'watchCoff', ->
  gulp
    .watch 'coffee/**/*.coffee', [ 'coffee']
    .on 'change', (event) ->
      console.log 'File : ' +
      event.path +
      ' was ' +
      event.type +
      ', running tasks...'
