const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['react', 'stage-0', ['env', {
          // 版本兼容大部分浏览器最后2个
          targets: {
            browsers: ['last 2 versions']
          }
        }]]
      }
    }]
  }
}