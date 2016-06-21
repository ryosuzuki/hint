
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const config = require('./webpack.config')
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(3000, '127.0.0.1', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:3000');
  });
} else {
  const path = require('path')
  const express = require('express')
  const port = (process.env.PORT || 3000)

  const app = express()
  const indexPath = path.join(__dirname, '/index.html')
  const publicPath = express.static(path.join(__dirname))
  app.use(express.static('./'))
  app.use('/dist', express.static(__dirname + '/dist'));
  app.use('/src', express.static(__dirname + '/src'));
  app.use('/sample', express.static(__dirname + '/sample'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
  app.get('/', function (_, res) {
    res.sendFile(indexPath)
  })
  app.listen(port)
  console.log(`Listening at http://localhost:${port}`)
}

