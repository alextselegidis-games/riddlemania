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
const postcssImport = require('postcss-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const color = require('postcss-color-function');
const calc = require('postcss-calc');

if (!development) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
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
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
            {test: /\.pcss$/, loader: 'style!css!postcss'},
            {test: /\.html$/, loader: 'mustache'},
            {test: /\.(woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000&name=assets/asset-[hash].[ext]'}
        ]
    },
    plugins: plugins,
    postcss: function(webpack) {
        return [
            postcssImport({
                addDependencyTo: webpack
            }),
            precss,
            calc,
            color,
            autoprefixer
        ];
    }
};