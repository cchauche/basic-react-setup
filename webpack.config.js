const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/example.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
