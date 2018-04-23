var webpack = require("webpack");
var config = require("./webpack.config");
// 包分析
var WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

config.devtool = "cheap-moudle-source-map";
config.plugins.splice(config.plugins.length - 2).concat([
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`
    }),
    new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js|\.tsx|\.ts)$/,
        compress: {
            warnings: false
        },
        minimize: true,
        sourceMap: false
    }),
    new WebpackBundleAnalyzer()
]);

module.exports = config;
