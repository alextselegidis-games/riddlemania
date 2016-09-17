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

var development = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var notifier = require('webpack-notifier');
var plugins = [ new notifier() ];
var path = require('path');
var postcssImport = require('postcss-import');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var color = require('postcss-color-function');

if (!development) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    devtool: development ? 'source-map' : '',
    context: path.resolve(__dirname, 'src'),
    entry: './scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'src/assets'),
        filename: 'scripts.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
            {test: /\.pcss$/, loader: 'style!css!postcss'},
            {test: /\.html/, loader: 'mustache'}
        ]
    },
    plugins: plugins,
    postcss: function() {
        return [postcssImport, precss, color, autoprefixer];
    }
};