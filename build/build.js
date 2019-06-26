'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const packageJSON = require('../package');
const fs = require('fs'); //文件读写
const filePaths = ["./dist/index.html"];

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    
    if ( stats.hasErrors() ) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    } else {
        console.log(chalk.cyan('  Build complete...'));
        console.log(chalk.yellow("  project version : " + packageJSON.version));

        // 更新版本号
        filePaths.forEach(fpath => {
            var reg = /(\.css|\.js)\?v=/g;
            fs.readFile(fpath, 'utf8', function(err, data) {
              if (err) {
                console.log(chalk.red('file read error!'));
                throw err;
              } else {
                  var text = data.replace(reg,"$1?v="+packageJSON.version)
                  fs.writeFile(fpath,text,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
                      if(err){
                          console.log(chalk.red("file write error!!"))
                      }else{
                          console.log(chalk.yellow("  update version "+fpath+" success!"))
                      }
                  })
              }
            });
        });
    }
  })
});