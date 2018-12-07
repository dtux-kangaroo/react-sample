const path = require('path');
const webpack = require('webpack');
const main = [
  {
    mode:'production',
    entry:{
        vendor: ['react', 'react-dom', 'react-router'],
        bizcharts:['bizcharts']
    },
    output: {
      path: path.resolve(__dirname,'dll'),
      filename: 'dll.[name].js',
      library: '[name]_[hash]'
    },
    plugins: [new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, 'dll', '[name]-manifest.json')
    })],
    performance: { //打包性能配置
        hints: false, // 关闭性能提示
    },
  }
];
module.exports = main;