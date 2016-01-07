/** Created by hhj on 12/23/15. */
'use strict'

require('babel-register')({})

// ignore import and require of these extensions on server (in node; deprecated but still functional):
const ignoreRequireExtensions = ['.scss', '.sass', '.css', '.styl']
ignoreRequireExtensions.forEach((ext) => {
  require.extensions[ext] = () => {}
})

var server = require('./src/server').default

const PORT = process.env.PORT || 3000

server.listen(PORT, function() {
  console.log('Server listening on', PORT)
})

