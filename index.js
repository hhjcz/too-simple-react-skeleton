/** Created by hhj on 12/23/15. */
'use strict'

require('babel-core/register')({})

var server = require('./src/server').default

const PORT = process.env.PORT || 3000

server.listen(PORT, function() {
  console.log('Server listening on', PORT)
})

