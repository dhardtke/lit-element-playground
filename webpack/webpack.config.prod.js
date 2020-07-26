const {merge} = require("webpack-merge");
const base = require("./webpack.config")("production");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(base, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false
                    },
                }
            }), new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
});
