// dllPlugin dll预打包
var path = require("path");
var webpack = require("webpack");
var config = require('../config')

var env = config.build.env

module.exports = {
  // 打包的模块
  entry: {
    common: ['vue/dist/vue.esm.js', 'vue-resource', 'vue-router', 'iview'],
    echarts: ['echarts'],
    d3: ['d3','d3-cloud'],
    muuri : ['muuri']
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' 
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
  	new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', 'dll/[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({ 
      compress: {
        warnings: false
      }
    })
  ]
};