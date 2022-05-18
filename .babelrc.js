// .babelrc.js env конфіг babel

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                // Використовуваты поліфіли для заміни джес методів
                "useBuiltIns": "usage",
                // використовувати для цього core-js версії 3
                "corejs": 3
            }
        ]
    ],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}