// Конфігурація plugins

const HtmlWebpackBuilderPlugin = require('../plugins/html-webpack-plugin/builder');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DashboardPlugin = require("webpack-dashboard/plugin");

const path = require('path');
const args = require('args-parser')(process.argv);

module.exports = function (confPath, webpack) {
    const plugins = [];

    if (args.analizer) {
        plugins.push(new BundleAnalyzerPlugin({analyzerHost: '0.0.0.0', analyzerPort: 8081}));
    }

    return [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css?hash=[contenthash]",
            chunkFilename: "./css/[name].css?hash=[contenthash]"
        }),
        new HtmlWebpackBuilderPlugin({
            template: {
                path: path.join(confPath, 'src', 'template', 'views'),
                plugin: {
                    options: {
                        title: 'Webpack'
                    },
                },
            }
        }),
        new CaseSensitivePathsPlugin(),
        new DuplicatesPlugin(),
        new CircularDependencyPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        new webpack.EnvironmentPlugin(args),
        new webpack.AutomaticPrefetchPlugin(),
        new DashboardPlugin(),
        ...plugins,
    ]
}