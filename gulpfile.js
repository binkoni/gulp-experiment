const gulp = require('gulp')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const git = require('gulp-git')
const exec = require('gulp-exec')
const fs = require('fs')

marked.setOptions({
  pedantic: true,
  smartypants: true
})

gulp.task('markdown', async () => {
  gulp.src('./content/**/*.md')
      .pipe(markdownToJSON(marked))
      .pipe(gulp.dest('./dist/'))
})

gulp.task('apps', async() => {
  fs.readdir('./apps', (err, paths) => {
    paths.forEach((path) => {
      git.pull('origin', 'master', {cwd: `./apps/${path}`, maxBuffer: Infinity})
    })
  })
})

gulp.task('default', gulp.series(['markdown', 'apps']))
