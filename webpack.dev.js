/** Created by hhj on 12/23/15. */

import webpack from 'webpack';
import assign from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import prodCfg from './webpack.prod.config.js';

Object.assign = assign;

const BABEL_QUERY = {
  presets: ['react', 'es2015', 'stage-1'],
  plugins: [
    ['transform-runtime'],
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
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, colors: true }));
  app.use(webpackHotMiddleware(compiler));
}
