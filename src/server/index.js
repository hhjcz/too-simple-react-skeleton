/** Created by hhj on 12/23/15. */
require('babel-register')({})

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicConfig = require('./webpack-isomorphic-tools.config.js');
const rootDir = require('path').resolve(__dirname, '..', '..')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicConfig)
  .development(process.env.NODE_ENV !== 'production')
  .server(rootDir, () => {
    require('./server')
  });
