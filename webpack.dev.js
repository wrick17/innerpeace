const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const common = require('./webpack.common');

const devSpecifics = {
    plugins: [
        new WebpackNotifierPlugin({ alwaysNotify: true }),
    ]
}

const devConfig = merge(common, devSpecifics);

module.exports = devConfig;