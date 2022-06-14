const BaseWebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');

module.exports = class WebpackIconfontPluginNodejs extends BaseWebpackIconfontPluginNodejs {
    apply(compiler) {
        // 生成的字体和css会被作为源码被提交，故npm run build时不需再次生成。
        // 而生成的字体和css在npm run dev时也会被webpack监听（watch），所以只需在svg变动时，重新生成字体和css即可
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
            this.getBinder(compiler, 'run')(this.compile);
        }
    }
}