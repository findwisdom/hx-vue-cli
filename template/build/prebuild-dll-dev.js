process.env.NODE_ENV = 'development'

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var dllConfig = require('./webpack.dll.config.js')

var spinner = ora('开始预编译dll...')
spinner.start()

webpack(dllConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
})