const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: {
        bundle: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['es2015', 'env']
    //                 }
    //             }
    //         }
    //     ]
    // },
    plugins: [
        // new UglifyJSPlugin({
        //     uglifyOptions: {
        //         ecma: 6,
        //     }
        // }),
        // new CompressionPlugin(),
        // new CleanWebpackPlugin(['build']),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
    ],
    devtool: 'cheap-module-source-map'
}

module.exports = config;