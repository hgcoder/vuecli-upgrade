// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../../express-ejs/views/project02/index.html'), //打包输出文件设置
        assetsRoot: path.resolve(__dirname, '../../express-ejs/public/project02'),
        assetsSubDirectory: 'static', //打包生成的index.html中 访问路径配置 二级目录
        assetsPublicPath: '',//index.html 上引入静态资源配置 结合线上环境挂载点设置
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 9990,
        assetsSubDirectory: 'static', //静态资源子目录 配置可访问目录
        assetsPublicPath: '/',  //静态资源根目录
        //接口代理配置 http://webpack.github.io/docs/webpack-dev-server.html#proxy
        proxyTable: { 
            '/api':{
                target:'',
                changeOrigin:true,
                pathRewrite:{ //匹配转发
                    '^/api':''
                }
            },
            '/api': {
                target: 'http://....',
                pathRewrite: {'^/api' : ''}
            }
        }, 
        cssSourceMap: false
    },
    runType:"spa" //服务运行类型 spa-单页面 mult - 多页面
}
