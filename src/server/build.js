/** Created by hhj on 1/26/16. */
require('babel-register')({})
require('./loadEnv').default()

const webpack = require('webpack')
const config = require('./webpack.prod.js')

const compiler = webpack(config)

console.info('Building webpack bundle...')

compiler.run((err, stats) => {
  if (!stats.hasErrors()) {
    console.log(stats.toString({ colors: true, chunks: false, modules: false, children: false }))
  }
})
