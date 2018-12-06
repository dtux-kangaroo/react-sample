const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  devtool: 'cheap-eval-source-map', //eval-source-map //此选项控制是否生成，以及如何生成 source map
  module: { //这些选项决定了如何处理项目中的不同类型的模块。
    rules: [{
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", //上面的简写方式
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  performance: { //打包性能配置
    hints: false, // 关闭性能提示
},
  plugins: [
    new HappyPack({
        //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      use: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      //verbose: true,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
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
  devServer: {
    disableHostCheck: true, //是否绕过主机检查
    contentBase: require('path').join(__dirname, "dist"),
    compress: true, //服务都启用gzip 压缩：
    hot: true,
    inline:true,//自动涮下模式，
    historyApiFallback: true,//h5 history api时任意的 404 响应都可能需要被替代为 index.html
    port: 8080,
    host: "127.0.0.1",
    proxy: [{
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
    }], 
  }
};