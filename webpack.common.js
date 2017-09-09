const config = {
    entry: {
        bundle: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    devtool: 'cheap-module-source-map'
}

module.exports = config;