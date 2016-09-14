/** Created by hhj on 1/26/16. */
require('babel-register')({})
require('./loadEnv').default()

const webpack = require('webpack')
const config = require('./webpack.prod')

const compiler = webpack(config)

if (process.env.NODE_ENV === 'development') {
  console.info(`Skipping webpack build in development mode... (NODE_ENV=${process.env.NODE_ENV})`)
  return
}

console.info(`Building webpack bundle... (NODE_ENV=${process.env.NODE_ENV})`)

function handleError(error) {
  console.error('Webpack build error: ', error)
  throw error
}

function handleWarning(warning) {
  console.warn('Webpack build warning: ', warning)
  return warning
}

compiler.run((err, stats) => {
  if (err) return handleError(err)
  const jsonStats = stats.toJson()
  if (jsonStats.errors.length > 0) return handleError(jsonStats.errors)
  if (jsonStats.warnings.length > 0) handleWarning(jsonStats.warnings)

  if (!stats.hasErrors()) {
    console.log(stats.toString({ colors: true, chunks: false, modules: false, children: false }))
  }
  return null
})
