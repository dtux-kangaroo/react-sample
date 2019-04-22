const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (context) => {
  const { webpack } = context;
  return {
    "server": {
      "host": "127.0.0.1",
      "port": 3002
    },
    "proxy": [{
      "context": ["/auth", "/api"],
      "target": "http://localhost:3000"
    }],
    webpack: {
      // entry: {},
      output: {},
      module: {
        rules: []
      },
      plugins: [
        new webpack.DefinePlugin({
          ASSETS_VERSION: '0.0.1',
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve('dll'),
            to: path.resolve('test')
          },
          {from: path.resolve(__dirname,'public/mock'),to:'./mock'}
        ])
      ]
    }
  };
};