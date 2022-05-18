// Конфігурація module.rules

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = function (confPath) {
    return [
        {
            test: /\.js$/,
            include: path.join(confPath, 'src', 'js'),
            use: 'babel-loader',
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
                'postcss-loader',
                'sass-loader',
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