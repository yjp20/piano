const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './public/js/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'piano.bundle.js',
    path: path.join(__dirname, 'public/js'),
  },
};

