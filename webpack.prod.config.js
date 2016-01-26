/** Created by hhj on 1/5/16. */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const isomorphicToolsConfig = require('./webpack-isomorphic-tools.config.js')
import loadEnv from './src/shared/lib/loadEnv'

const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig)
const prefixLoaders = 'css-loader!postcss-loader'

const env = loadEnv('.env.json')
process.env = { ...process.env, ...env }

module.exports = {
  entry: {
    main: [
      './src/client'
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions: ['', '.js', '.jsx', '.scss', '.sass']
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
    use: [require('rupture')()],
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
        loader: ExtractTextPlugin.extract('style-loader', prefixLoaders + '!less-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', prefixLoaders + '!sass-loader')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', prefixLoaders + '!stylus-loader')
      }
    ]
  },
};
