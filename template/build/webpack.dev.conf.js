var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var os = require('os')
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const isDebug = (process.env.NODE_ENV === 'development');
const libPath = './../static/js/dll/manifest.json';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // jquery设置为全局
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
        filename: 'login.html',
        template: 'login.html',
        inject: true,
        chunks: [
            'login'
        ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: [
        'app'
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'silent_renew.html',
      template: 'silent_renew.html',
      inject: true,
      chunks: ['silentRenew']
    }),
    new FriendlyErrorsPlugin(),
    new HappyPack({
        id: 'happybabel',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
        cache: true,
        verbose: true
    }),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(libPath),
    })
  ]
})
