/** Created by hhj on 12/23/15. */

import webpack from 'webpack';
import assign from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import prodCfg from './webpack.prod.js';
import IsomorphicToolsPlugin from '../../node_modules/webpack-isomorphic-tools/plugin';
import isomorphicToolsConfig from './webpack-isomorphic-tools.config.js';

const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig)

Object.assign = assign;

// add hot reload feature in dev mode (using babel-plugin-react-transform & react-transform-hmr),
// rest of babel config taken from .babelrc
const BABEL_QUERY = {
  plugins: [
    [
      'react-transform',
      {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }
        ]
      }
    ]
  ]
}

const prefixLoaders = 'style-loader!css-loader!postcss-loader'

// consumed in src/server.js
export default function(app) {
  const config = Object.assign(prodCfg, {
    devtool: 'inline-source-map',
    entry: {
      main: [
        'webpack-hot-middleware/client',
        './src/client'
      ]
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: BABEL_QUERY
        },
        {
          loader: 'url-loader?limit=100000',
          test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
        },
        {
          test: /\.css$/,
          loader: prefixLoaders
        },
        {
          test: /\.scss$/,
          loader: `${prefixLoaders}!sass-loader`
        },
        {
          test: /\.less$/,
          loader: `${prefixLoaders}!less-loader`
        },
        {
          test: /\.styl$/,
          loader: `${prefixLoaders}!stylus-loader`
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          IS_BROWSER: true,
          SERVER_BASE_URL: JSON.stringify(process.env.SERVER_BASE_URL)
        }
      }),
      isomorphicToolsPlugin.development()
    ],
  })

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, colors: true }));
  app.use(webpackHotMiddleware(compiler));
}
