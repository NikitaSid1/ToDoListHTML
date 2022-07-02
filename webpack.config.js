'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./js/script.js', './scss/style.scss'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/bundleJS',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: './css/', name: '[name].min.css' },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
