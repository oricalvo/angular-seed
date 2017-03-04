const path = require("path");
const webpack = require("webpack");
const {searchGlob} = require("build-utils/fs");

module.exports = Promise.resolve().then(()=> {
    const config = {
        entry: {
            main: './aot/phase2/app/main-aot.js',
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].bundle.js',
            publicPath: "dist/",
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['main']
            })
        ]
    };

    const modulesDirPath = "./aot/phase2/aot/phase1/app/"
    const moduleFileName = "module.ngfactory.js";
    return searchGlob(`${modulesDirPath}**/${moduleFileName}`).then(files => {
        for (let file of files) {
            const moduleDirPath = file.substring(modulesDirPath.length, file.length - moduleFileName.length - 1);
            const bundleName = moduleDirPath.replace("/", ".");
            config.entry[bundleName] = file;
        }

        return config;
    });
});
