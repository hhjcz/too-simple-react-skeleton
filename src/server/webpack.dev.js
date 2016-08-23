/** Created by hhj on 12/23/15. */

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import prodCfg from './webpack.prod.js';
import IsomorphicToolsPlugin from '../../node_modules/webpack-isomorphic-tools/plugin';
import isomorphicToolsConfig from './webpack-isomorphic-tools.config.js';

const isomorphicToolsPlugin = new IsomorphicToolsPlugin(isomorphicToolsConfig)

const prefixLoaders = 'style-loader!css-loader!postcss-loader'

// consumed in src/server.js
export default function(app) {
  const config = {
    ...prodCfg,
    ...{
      devtool: 'cheap-eval-source-map',
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
            // babel hot reload; rest of babel config taken from .babelrc
            query: {
              presets: ['react-hmre']
            }
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
    }
  }

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, colors: true }));
  app.use(webpackHotMiddleware(compiler));
}
