const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.js', '.css'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main', 'index'],
    modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
  },
  entry: {
    'index': ['./src/index.js', './src/main.less'],
    'demo': ['./src/demo-1.js', './src/main.less'],
    'bower': ['./src/bower.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].js'
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(png|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /^((?!\.module).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.module\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
        ]
      }, {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(__dirname, 'src'),
          path.join(__dirname, 'example')]
      }]
  }
}
