const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const {resolve} = require("./helpers");
const {glob} = require("glob");

module.exports = (mode) => {
    const components = glob.sync(resolve("src/components/*/"));

    const singleEntry = true;
    const entry = {};
    components.forEach((p) => {
        const parts = p.split("/");
        const name = parts[parts.length - 1];
        const main = `${p}/${name}.ts`;
        if (singleEntry) {
            entry["app"] = [...(entry["app"] || []), main];
        } else {
            entry[name] = main;
        }
    });

    return {
        mode,
        entry,
        stats: "errors-only",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
        },

        module: {
            rules: [
                // {test: /\.tsx?$/, loader: "ts-loader"},
                {
                    test: /\.js$|.ts$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            compact: mode === "production"
                        }
                    }
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "fonts/"
                            }
                        }
                    ]
                }
            ]
        },

        output: {
            filename: "[name].[chunkhash].js",
            path: resolve("dist/")
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: resolve("src/index.html")
            }),
            new webpack.HashedModuleIdsPlugin() // so that file hashes don't change unexpectedly
        ]

        // optimization: {
        //     runtimeChunk: "single",
        //     splitChunks: {
        //         chunks: "initial",
        //         name: "runtime"
        //     }
        // }
    };
};
