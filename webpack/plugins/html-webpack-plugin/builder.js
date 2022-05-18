const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class HtmlWebpackBuilderPlugin {
    /**
     * @param {{
     *  template: {
     *      path: string,
     *      plugin: {
     *          options: HtmlWebpackPlugin.Options,
     *      },
     *  },
     *  views: [{
     *      filename: string,
     *      layout: string,
     *      rename: string,
     *      options: HtmlWebpackPlugin.Options
     *  }],
     * }} options
     */
    constructor(options) {
        this.views = options.views || [];
        this.template = options.template;
        this.options = this.template.plugin?.options || {};
    }

    apply(compiler) {
        this.index = compiler.options.plugins.indexOf(this);

        fs.readdirSync(path.join(this.template.path))
            .filter(file => file.match(/\.html\.ejs$/))
            .forEach(file => {
                const item = this.views.find(view => view.filename = file) || {};

                item.filename = item.rename || file.replace('.ejs', '');

                if (item.layout === undefined) {
                    item.layout = path.join(this.template.path, file);
                }

                const options = {
                    filename: item.filename,
                    template: item.layout,
                    ...item.options
                };

                compiler.options.plugins.splice(
                    ++this.index,
                    0,
                    new HtmlWebpackPlugin(
                        {
                            inject: 'body',
                            chunks: [item.filename.replace('.html', '')],
                            ...this.options,
                            ...options,
                        }
                    )
                );
        });
    }
}

module.exports = HtmlWebpackBuilderPlugin;