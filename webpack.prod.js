const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

const prodSpecifics = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin([path.resolve('./build')], {
            root: path.resolve('./'),
            verbose: true
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                ecma: 6,
            }
        }),
        new CompressionPlugin(),
    ]
}

const prodConfig = merge(common, prodSpecifics);

module.exports = prodConfig;