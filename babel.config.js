module.exports = {
    presets: [
        "@babel/preset-typescript",
        /*["@babel/preset-env", {
            // targets: findSupportedBrowsers(),
            // preset-env compiles template literals for safari 12 due to a small bug which
            // doesn't affect most use cases. for example lit-html handles it: (https://github.com/Polymer/lit-html/issues/575)
            exclude: ["@babel/plugin-transform-template-literals"],
            useBuiltIns: false,
            modules: false,
            bugfixes: true
        }]*/
    ],

    plugins: [
        //"@babel/plugin-syntax-dynamic-import",
        //"@babel/plugin-syntax-import-meta",
        ["template-html-minifier", {
            "modules": {
                "lit-html": ["html"],
                "lit-element": [
                    "html",
                    {"name": "css", "encapsulation": "style"}
                ]
            },
            "strictCSS": true,
            "htmlMinifier": {
                "collapseWhitespace": true,
                "conservativeCollapse": true,
                "removeComments": true,
                "caseSensitive": true,
                "minifyCSS": true
            }
        }],
        // webpack does not support import.meta.url yet, so we rewrite them in babel
        ["babel-plugin-bundled-import-meta", {importStyle: "baseURI"}],
        ["@babel/plugin-proposal-decorators", {decoratorsBeforeExport: true}],
        "@babel/plugin-proposal-class-properties"
    ]
};
