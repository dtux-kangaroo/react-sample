const path = require('path');
const webpack = require('webpack');
const main = [
  {
    mode:'production',
    entry:{
        vendor: ['react', 'react-dom', 'react-router','bizcharts'],
    },
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: 'vendor.js',
      library: 'vendor_[hash]'
    },
    plugins: [new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.resolve(__dirname, 'dll', 'manifest.json')
    })],
    performance: { //打包性能配置
        hints: false, // 关闭性能提示
    },
  }
];
module.exports = main;