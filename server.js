const express = require('express')
const path = require('path')
const config = require('./webpack.config.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/dist'))
app.use('/client', express.static(__dirname + '/client'))
app.use('/sample', express.static(__dirname + '/sample'))
app.use('/bower_components', express.static(__dirname + '/bower_components'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.use('/', function (req, res) {
  res.sendFile(path.resolve('client/index.html'))
})

const port = 3000

app.listen(port, function(error) {
  if (error) throw error
  console.log('Express server listening on port', port)
})
