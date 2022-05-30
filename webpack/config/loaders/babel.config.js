const args = require('args-parser')(process.argv);

module.exports = function (api) {
    api.cache(true);

    const ptbs = {};
    if (args.mode === 'development') {
        ptbs.tdz = true;
    }

    return {
        assumptions: {
            skipForOfIteratorClosing: true
        },
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs : {
                        version : "3",
                        proposals : true
                    },
                    targets: {
                        browsers: [
                            "> 5%",
                            "last 2 versions",
                            "Firefox ESR",
                            "not dead",
                            "ie >= 11",
                            // "edge >= 16",
                            // "safari >= 9",
                            // "firefox >= 57",
                            // "ios >= 9",
                            // "chrome >= 80"
                        ]
                    }
                }
            ]
        ],
        plugins: [
            ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
            ['@babel/plugin-transform-for-of', { assumeArray: true }],
            ['@babel/plugin-proposal-class-properties'],
            ['@babel/plugin-syntax-dynamic-import'],
            ['@babel/plugin-proposal-function-bind'],
            ['@babel/plugin-proposal-throw-expressions'],
            ['@babel/plugin-transform-arrow-functions'],
            ['@babel/plugin-transform-block-scoping', {throwIfClosureRequired: true, ...ptbs}],
            ['@babel/plugin-transform-destructuring', { useBuiltIns: true, allowArrayLike: true }],
        ]
    }
}