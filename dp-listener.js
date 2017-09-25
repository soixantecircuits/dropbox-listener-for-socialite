const fs = require('fs')
const async = require('async')
const request = require('request')
const standardSettings = require('standard-settings')
const chokidar = require('chokidar')

const settings = standardSettings.getSettings()

var path = settings['autoUpload']['path']
var maxParrallel = settings['autoUpload']['maxParallel']
var altruistAPIURL = settings['autoUpload']['altruistAPIURL']

var watcher = chokidar.watch(path, {
  ignored: /(^|[/\\])\../,
  persistent: true
})

watcher
  .on('add', path => q.push(path, function (err, result) {
    if (err) {
      console.error(err)
    } else {
      console.log('Upload successful!  Server responded with:', result)
    }
  }))

var q = async.queue(function (media, callback) {
  var regexp = /.*\//
  var name = media.replace(regexp, '')
  var formData = {
    filename: name,
    media: fs.createReadStream(media)
  }

  request.post({url: altruistAPIURL, formData: formData}, function optionalCallback (err, httpResponse, body) {
    if (err) {
      typeof callback === 'function' && callback(new Error('Upload failed: ' + err))
    } else {
      if (body.match(/{"response":"OK".*/)) {
        typeof callback === 'function' && callback(null, body)
      } else {
        typeof callback === 'function' && callback(new Error('Altruist failure.' + body))
      }
    }
  })
}, maxParrallel)

q.drain = function () {
  console.log('All the media have been uploaded')
}
