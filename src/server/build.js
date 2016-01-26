/** Created by hhj on 1/26/16. */
require('babel-register')({})

const webpack = require('webpack')
const config = require('../../webpack.prod.config')

const compiler = webpack(config)

compiler.run(() => {})

