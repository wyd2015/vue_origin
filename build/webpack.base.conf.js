'use strict'
// webpack 通用配置,dev/build均依赖
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 页面中的入口文件。单页面组件单个入口，多页面组件多个入口
  entry: {
    app: './src/main.js'
  },
    // 输出文件配置
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@np': resolve('node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [resolve('src'),resolve('easyscroll')],
        exclude: [/static/,/iview-theme/],
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'),resolve('easyscroll'),resolve('node_modules/webpack-dev-server/client')],
        exclude: [/static/,/iview-theme/],
        options:{
            cacheDirectory: '.webpack_cache'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 3072,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
}
