var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AutoDllPlugin = require("autodll-webpack-plugin");
var publicPath = "/";

module.exports = {
    entry: {
        app: path.resolve(__dirname, "./src/index.tsx")
    },
    output: {
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: publicPath,
        sourceMapFilename: "sourcemap/[file].map"
    },
    devtool: "eval",
    devServer: {
        port: 8801,
        hot: true,
        // https://blog.csdn.net/liangklfang/article/details/54944012
        historyApiFallback: {
            index: "index.html"
        },
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: publicPath,
        proxy: {}
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: "react-hot-loader/webpack"
                    },
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                // type: "javascript/auto",
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/
            },
            {
                test: /\.(jsx|js)$/,
                enforce: "pre",
                loader: "eslint-loader"
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    // fallback: "style-loader",
                    use: ["css-loader", "less-loader"],
                    publicPath: "/"
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader:
                    "url-loader?limit=8192&name=assets/image/[name].[ext]&publicPath=" +
                    publicPath
            },
            {
                test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:
                    "url-loader?limit=8192&name=iconfont/[name].[ext]&publicPath=" +
                    publicPath
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.js",
            chunks: ["index"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
            moment: "moment"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": `'${process.env.NODE_ENV}'`
        }),
        new ExtractTextPlugin({
            filename: "assets/styles/[name].css",
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: "站长选品助手",
            template: path.resolve(__dirname, "src/html", "index.html"),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunksSortMode: "dependency"
        }),
        // new AutoDllPlugin({
        //     inject: true, // will inject the DLL bundle to index.html
        //     debug: true,
        //     filename: "[name].js",
        //     path: "./dll",
        //     entry: {
        //         dll: [
        //             "react",
        //             "react-dom",
        //             "react-router",
        //             "immutable",
        //             // "echarts"
        //         ]
        //     }
        // })
    ],
    externals: {
        // React: "react"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css", ".jsx", ".less", ".json"]
    }
};
