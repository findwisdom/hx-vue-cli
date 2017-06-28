const webpack = require('webpack');
const path = require('path');
const isDebug = process.env.NODE_ENV === 'development';
const outputPath = path.join(__dirname, '../static/js/dll');
const fileName = '[name].js';

var Visualizer = require('webpack-visualizer-plugin');

// 资源依赖包，提前编译
const lib = [
    'async-validator',
    'echarts',
    'jquery',
    'o.js',
    'oidc-client',
    'url-append',
    'vue',
    // 'iview',  不要打包进去，组建会出错，不能实现注册
    'vue-resource',
    'vue-router',
    'vuex'
];
const plugin = [
    new webpack.DllPlugin({
        /**
         * path
         * 定义 manifest 文件生成的位置
         * [name]的部分由entry的名字替换
         */
        path: path.join(outputPath, 'manifest.json'),
        /**
         * name
         * dll bundle 输出到那个全局变量上
         * 和 output.library 一样即可。
         */
        name: '[name]',
        context: __dirname
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new Visualizer({
        filename: './statistics.html'
    })
];

if (!isDebug) {
  plugin.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'exports', 'require']
      },
      compress: { warnings: false },
      output: { comments: false }
    })
  )
}

module.exports = {
  devtool: '#source-map',
  entry: {
    lib: lib
  },
  output: {
    path: outputPath,
    filename: fileName,
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugin
};
