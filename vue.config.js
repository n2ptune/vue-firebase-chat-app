const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
        '@@': path.join(__dirname, './')
      }
    },
    module: {
      rules: [
        {
          test: /\.(s*)css$/,
          use: ['postcss-loader']
        }
      ]
    }
  }
}
