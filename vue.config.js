/*
 * @Author: remy
 * @Date: 2021-01-08 16:41:29
 * @LastEditTime: 2021-12-29 23:46:12
 * @Description: 工程配置
 * @Version: 0.0.1
 */

const dotenv = require('dotenv');
const fs = require('fs');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

// 根部不同的环境使用不同的环境变量
const envFiles = ['.env', `.env.${NODE_ENV}`];
const productionGzipExtensions = ['js', 'css'];
for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      //对超过10kb的文件gzip压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /zh-cn/,
      )
    ],
    // 不需要打包进应用程序的第三方依赖
    externals: {
      'moment': 'moment',
      'vue': 'Vue',
      'vuex': 'Vuex'
    }
  },
  publicPath: './',
  outputDir: `${process.env.VUE_APP_OUTPUT_DIR || 'dist'}`,
  pages: {
    index: {
      entry: './src/main.js',
      title: process.env.VUE_APP_APP_TITLE
    }
  },
  // 配置代理
  devServer: {
    open: true,
    port: process.env.VUE_APP_PORT,
    proxy: {
      [process.env.VUE_APP_API_PROXY]: {
        target: process.env.VUE_APP_API_DOMAIN,
        changeOrigin: true,
        pathRewrite: { [`^${process.env.VUE_APP_API_PROXY}`]: '' }
      },
      [process.env.VUE_APP_SYS_API_PROXY]: {
        target: process.env.VUE_APP_SYS_API_DOMAIN,
        changeOrigin: true,
        pathRewrite: { [`^${process.env.VUE_APP_SYS_API_PROXY}`]: '' }
      }
    }
  },
  // 减少包大小，加密源码;设置为true会生成map文件
  productionSourceMap: false
};
