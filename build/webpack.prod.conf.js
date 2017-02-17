var path = require('path')
var config = require('../config')
var utils = require('./utils')
var glob = require('glob')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')
var env = config.build.env
var extObj = null;
// 根据多页及单页打包配置
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
            title:"feProject",
            // 生成出来的html文件名 位置放到配置的打包输出文件夹中
            filename:config.build.index +'/' + name + '.html',
            // 每个html的模版，这里多个页面使用同一个模版
            template: 'src/views/'+ name +'/'+ name + '.html',
            // 自动将引用插入html
            inject: true,
            // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            chunks: ['manifest','vendor',name]
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
      // source-map 文件配置，开发阶段开启
      devtool: config.build.productionSourceMap ? '#source-map' : false,
      output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      },
      vue: {
        loaders: utils.cssLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true
        })
      },
      devtool: '#eval-source-map',
      plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // 删除重复依赖
        new webpack.DefinePlugin({
          'process.env': env
        }),
        // 启用压缩 
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        // 最小化编译文件
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 提取 entry chunk 分离成单个css文件
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        // 生成html
        new HtmlWebpackPlugin({
          filename: config.build.index,
          template: 'index.html',
          inject: true,
          minify: {
            removeComments: true, //去注释
            collapseWhitespace: true,//压缩空格
            removeAttributeQuotes: true //去除属性引用
            
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          
          chunksSortMode: 'dependency'
        }),
        // 提取公用库文件 生成vendor 文件
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        }),
        // 分离与webpack运行相关文件
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          chunks: ['vendor']
        })
      ]
    }
}

var webpackConfig = merge(baseWebpackConfig, extObj)
// 开启 gzip 压缩
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
