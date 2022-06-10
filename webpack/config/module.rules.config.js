// Конфігурація module.rules

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = function (confPath) {
    return [
        {
            test: /\.js$/,
            include: path.join(confPath, 'src', 'js'),
            use: {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    configFile: path.join(__dirname, 'loaders', 'babel.config.js'),
                    compact: false,
                    cacheDirectory: true,
                    sourceMaps: false,
                },
            },
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf|)$/,
            type: 'asset/resource',
        },
        {
            test: /\.(s[ac]|c)ss$/i,
            include: path.join(confPath, 'src', 'scss'),
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            config: path.join(__dirname, 'loaders', 'postcss.config.js'),
                        }
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            sassLoader: {
                                includePaths: [path.join(confPath, 'src')]
                            }
                        }
                    }
                },
            ],
        },
        {
            test: /\.(html)$/,
            include: [
                path.join(confPath, 'src', 'template', 'inc'),
            ],
            use: ['html-loader'],
        },
    ]
}