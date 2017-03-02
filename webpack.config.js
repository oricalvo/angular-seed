const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        main: './aot/phase2/app/main-aot.js',
        admin: "./aot/phase2/app/admin/module-aot.js",
        about: "./aot/phase2/app/about/module-aot.js",
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['main']
        })
    ]
};
