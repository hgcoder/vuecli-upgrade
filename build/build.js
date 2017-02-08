// https://github.com/shelljs/shelljs
require('./check-versions')() //检查nodejs 和 npm 版本
require('shelljs/global')  //启用便携式Unix命令 转化成nodejs APi
env.NODE_ENV = 'production' //设置环境标识

//模块依赖引入
var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  提示:\n' +
  '  执行文件打包\n' 
)

var spinner = ora('打包中..')//loading
spinner.start()

//打包文件到指定文件，
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)//组合路径
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

//打包回调配置
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
