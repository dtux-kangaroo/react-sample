const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: "production", //编译模式3
    //target
    context: __dirname, // webpack 的主目录(绝对路径)entry 和 module.rules.loader等相对于此目录解析
    target: "web", //7种方式 node,web,默认web，做web一般不用设置
    //devtool:"source-map",
    entry: { //文件输入配置
        vendor: ['react', 'react-dom', 'react-router'],
        app: [path.resolve(__dirname, './src/index.js')],
    },
    output: { //文件输出配置
        path: path.resolve(__dirname, "dist"), // 所有输出文件的目标路径
        publicPath: "/", // 输出解析文件的目录，url 相对于 HTML 页面
        chunkFilename: "js/[name].[chunkhash].js",
        filename: "js/[name].[chunkhash].js",
        // library: "libs", //  导出库(exported library)的名称
        // libraryTarget: "umd", // 通用模块定义    // 导出库
    },
    module: { //这些选项决定了如何处理项目中的不同类型的模块。
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/, //处理该文件时，排除的目录，建议使用include
                use: {
                    loader: 'babel-loader',
                    options: {}
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                     MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [ //插件使用
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
          }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin({ //允许创建一个在编译时可以配置的全局常量。
            test: JSON.stringify("test"), //注：给定的值必须包含字符串本身内的实际引号 '"test"'
        }),
        new webpack.ProvidePlugin({ //自动加载模块，而不必到处 import 或 require 
            _: 'lodash',
        }),
        new webpack.NamedModulesPlugin(), //product 默认为此项
    ],
    performance: { //打包性能配置
        hints: false, // 关闭性能提示
    },
    optimization: { //手动优化配置，并覆盖默认
        runtimeChunk: {
            name: 'manifest'
        },
        minimize: true, //无需配置
        //nameModules:true, //变异的的文件以名字显示
        noEmitOnErrors: true, //跳过错误的编译
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
          ],
        splitChunks: {
            minSize: 30000, //生成的块的最小大小
            maxSize: 3000000, //告诉webpack尝试将大于maxSize的块拆分成更小的部分
            minChunks: 1, //分割前必须共享模块的最小块数。
            maxAsyncRequests: 5, //加载模块时，最大请求数
            maxInitialRequests: 3, //初始最大最大请求数
            automaticNameDelimiter: '-', //名字分隔符，可不使用；
            name: true, //将根据块和缓存 组密钥自动生成名称
            cacheGroups: { //缓存组可以从splitChunks继承和/或覆盖任何选项。test,proiority只能在缓存组级别配置
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor'
                },
                biz: {
                    test: /[\\/]bizcharts[\\/]/,
                    name: 'biz',
                    chunks: 'all',
                }         
                
            }
        }
    },
    resolve: { //配置模块如何解析
        extensions: ['.js', '.jsx', '.scss', '.css', '.json'], //自动解析确定的扩展。覆盖原有扩展
        alias: { //创建 import 或 require 的别名，来确保模块引入变得更简单
            pages: path.resolve(__dirname, 'src/pages/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            component: path.resolve(__dirname, 'src/components/'),
            tpls: path.resolve(__dirname, 'src/tpls/')
        },
        modules: [
            path.resolve(__dirname, "src"), //告诉 webpack 解析模块时应该搜索的目录。
            path.resolve(__dirname, 'node_modules')
        ]
    },
    externals: { //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖         
    }
}