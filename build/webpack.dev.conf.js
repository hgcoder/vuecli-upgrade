var config = require('../config')
var webpack = require('webpack')
var glob = require('glob')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')
var extObj = null;
console.log(config.runType)
if(config.runType == "mult"){
    
    // 获取指定路径下的入口文件
    function getEntries(globPath) {
         var files = glob.sync(globPath),
           entries = {};
         files.forEach(function(filepath) {
             // 取倒数第二层(view下面的文件夹)做包名
             var split = filepath.split('/');
             var name = split[split.length - 2];

             entries[name] = './' + filepath;
         });

         return entries;
    }

    var entries = getEntries('src/views/**/index.js');
    Object.keys(entries).forEach(function(name) {
        // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
        baseWebpackConfig.entry[name] = entries[name];

        // 每个页面生成一个html
        var plugin = new HtmlWebpackPlugin({
            title:"express1",
            // 生成出来的html文件名
            filename: name + '.html',
            // 每个html的模版，这里多个页面使用同一个模版
            template: 'src/views/'+ name +'/'+ name + '.html',
            // 自动将引用插入html
            inject: true,
            // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            chunks: ['vendor',name]
        });
        baseWebpackConfig.plugins.push(plugin);
    })
    extObj = {

        devtool: '#eval-source-map',
        plugins: [
            // 删除js依赖树中交叉的重复依赖
            new webpack.DefinePlugin({
              'process.env': config.dev.env
            }),
            // 最小化编译文件
            new webpack.optimize.OccurenceOrderPlugin(),
            // 热替换相关
            new webpack.HotModuleReplacementPlugin(), 

            // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
            new webpack.NoErrorsPlugin(),
            new FriendlyErrors()
        ]
    }
    
}else{
    extObj =  {
      module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
      },
      
      devtool: '#eval-source-map',
      plugins: [
        // 删除js依赖树中交叉的重复依赖
        new webpack.DefinePlugin({
          'process.env': config.dev.env
        }),
        // 最小化编译文件
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 热替换相关
        new webpack.HotModuleReplacementPlugin(),
        // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.NoErrorsPlugin(),
        //生成html
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        }),
        // 错误提示
        new FriendlyErrors()
      ]
    }
}

module.exports = merge(baseWebpackConfig, extObj)

// 配置热加载监听文件
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

