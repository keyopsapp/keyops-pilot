var path = require("path");
var webpack = require("webpack");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "babel-polyfill",
        "whatwg-fetch",
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./src/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "static/js/app.[hash].js"
    },
    devtool: "eval",
    module: {
        loaders: [
            {
                test: /\.js|.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        [ "es2015", { modules: false } ],
                        "stage-0",
                        "react"
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
                }
            },
            {
                test: /\.scss|css$/,
                loader: "style-loader!css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader"
            }
        ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                    // 'NODE_ENV': JSON.stringify('production'),
                'ACCESS_KEY': JSON.stringify('b4a00480f27c438596d828bc42da477a')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("assets/styles/styles.css"),
        new HtmlWebpackPlugin({
          hash: false,
          template: "./index.hbs"
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            debug: true,
            options: {
                postcss: function() {
                    return [ precss, autoprefixer ];
                },
                context: path.join(__dirname, "src"),
                output: { path: path.join(__dirname, "dist") }
            }
        })
    ]
};
