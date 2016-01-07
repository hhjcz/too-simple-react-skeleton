/** Created by hhj on 12/23/15. */

import webpack from 'webpack';
import assign from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import prodCfg from './webpack.prod.config.js';

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

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader'
]

// consumed in src/server.jsx
export default function(app) {
  const config = Object.assign(prodCfg, {
    devtool: 'inline-source-map',
    entry: [
      'webpack-hot-middleware/client',
      './src/client'
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: BABEL_QUERY
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!' + sassLoaders.join('!')
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
          IS_BROWSER: true
        }
      }),
      new ExtractTextPlugin('[name].css')
    ],
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, colors: true }));
  app.use(webpackHotMiddleware(compiler));
}
