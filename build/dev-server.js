require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
// 写入服务类型配置
process.env.runType = config.runType || "spa";

//配置端口
var port = process.env.PORT || config.dev.port
// 引入代理配置
var proxyTable = config.dev.proxyTable

var app = express()

//执行开发模式打包配置
var compiler = webpack(webpackConfig) 

//配置开发环境
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  stats: {
    colors: true,
    chunks: false
  }
})
//配置热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 页面编译 reload配置
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//设置代理
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

//  HTML5 history API 配置
app.use(require('connect-history-api-fallback')())

// 启用本地服务器
app.use(devMiddleware)

// 启用热加载
app.use(hotMiddleware)

// 静态资源挂载配置
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

//服务启动wait提示
devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

//错误信息监听
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
