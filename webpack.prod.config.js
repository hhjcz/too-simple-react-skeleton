/** Created by hhj on 1/5/16. */

var path = require('path');

module.exports = {
  entry: [
    './src/client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
};
