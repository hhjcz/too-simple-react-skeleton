/** Created by hhj on 1/26/16. */
require('babel-register')({})

const webpack = require('webpack')
const config = require('./webpack.prod.js')

const compiler = webpack(config)

compiler.run((err, stats) => {
  if (!stats.hasErrors()) {
    console.log(stats.toString({ colors: true, chunks: false, modules: false, children: false }))
  }
})
