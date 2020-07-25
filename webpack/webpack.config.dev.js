const {resolve} = require("./helpers");
const {merge} = require("webpack-merge");
const base = require("./webpack.config")("development");

module.exports = merge(base, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        contentBase: resolve("dist"),
        compress: true,
        port: 8080
    },
    output: {
        publicPath: "/"
    }
});
