module.exports = {
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