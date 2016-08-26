/** Created by hhj on 1/5/16. */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const isomorphicToolsConfig = require('./webpack-isomorphic-tools.config')
const constants = require('./constants')

const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig)
const prefixLoaders = 'css-loader!postcss-loader'

module.exports = {
  debug: true,
  entry: {
    main: [
      './src/client'
    ]
  },
  resolve: {
    root: [constants.BASE_DIR],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  resolveLoader: { // required when using modules outside of root dir:
    root: [constants.NODE_MODULES_DIR],
    fallback: [constants.NODE_MODULES_DIR],
    modulesDirectories: ['node_modules'],
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.js',
    chunkFilename: 'bundle-[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        IS_BROWSER: true,
        SERVER_BASE_URL: JSON.stringify(process.env.SERVER_BASE_URL),
      }
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false // Because uglify reports irrelevant warnings.
      }
    }),
    isomorphicToolsPlugin
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules/breakpoint-sass/stylesheets'),
    ]
  },
  stylus: {
    // use: [require('rupture')()],
    // import: ['~rupture/rupture/index.styl']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', prefixLoaders)
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', `${prefixLoaders}!less-loader`)
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', `${prefixLoaders}!sass-loader`)
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', `${prefixLoaders}!stylus-loader`)
      }
    ]
  },
};
