var HtmlWebpackPlugin = require("html-webpack-plugin");
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/templates/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    entry: [
        './public/scripts/index.js'
    ],
    output: {
        path: __dirname + '/public/dist',
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
};