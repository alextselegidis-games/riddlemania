/* ----------------------------------------------------------------------------
 * Riddles4U - Amazing Riddles Game Platform
 *
 * @package     Riddles4U
 * @author      Alex Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) 2016, BigBlackCode
 * @license     http://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        http://riddles4u.com
 * @since       v1.0.0
 * ---------------------------------------------------------------------------- */

const development = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const notifier = require('webpack-notifier');
const plugins = [new notifier()];
const path = require('path');

if (!development) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: development
    }));
}

module.exports = {
    devtool: development ? 'source-map' : '',
    context: path.resolve(__dirname, 'src'),
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'src/bundle'),
        filename: 'scripts.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015',
                        'es2017'
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'mustache-loader'
                ]
            },
            {
                test: /\.(woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: '100000',
                    name: 'assets/asset-[hash].[ext]'
                }
            }
        ]
    },
    plugins: plugins
};