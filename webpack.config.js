'use strict';

const args = require('args-parser')(process.argv);
const webpack = require('webpack');
const path = require('path');

module.exports = {
    target: args.mode === 'development' ? 'web' : path.join('browserslist:', __dirname, '/.browserslist'),
    context: path.join(__dirname, '/src/'),
    entry: require('./webpack/config/entry.config'),
    output: {
        path: path.join(__dirname, '/dist'),
        clean: true,
        assetModuleFilename: '[path][name][ext]?hash=[contenthash]',

        filename: "./js/[name].js?hash=[contenthash]",
    },
    mode: 'development',
    watch: false,
    watchOptions: {
        aggregateTimeout: 100,
    },
    devtool: args.mode === 'development' ? 'source-map' : false,
    plugins: require('./webpack/config/plugins.config')(__dirname, webpack),
    module: {
        rules: require('./webpack/config/module.rules.config')(__dirname)
    },
    resolve: {
        extensions: ['', '.js', '.scss', '...'],
        alias: {
            _: 'lodash',
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,

        hot: true,
        open: {
            target: ['index.html'],
        },
        watchFiles : [
            'src/template/**/*',
            'src/img/**/*',
            'src/favicon/**/*',
            'src/fonts/**/*',
        ],
    }
};