// Конфігуратор оточення postcss

module.exports = {
    plugins: [
        [
            'postcss-preset-env',
            {
                browsers: [
                    "> 5%",
                    "last 2 versions",
                    "Firefox ESR",
                ]
            }
        ],
    ],
};