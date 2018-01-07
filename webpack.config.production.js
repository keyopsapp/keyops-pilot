var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
        app: [
            'babel-polyfill',
            './src/index'
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[name].[chunkhash].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.js|.jsx$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    "presets": [["es2015", {modules: false}], "stage-0", "react"],
                    "plugins": ['transform-async-to-generator', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.scss|css$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap']),
                // loader: ExtractTextPlugin.extract(
                //     'style',
                //     'css?importLoaders=1!postcss')


            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
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
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss|css$/,
            debug: true,
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                },
                // context: path.join(__dirname, 'src'),
                context: path.join(__dirname, 'src'),
                output: {
                    path: path.join(__dirname, 'dist')
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("assets/styles/styles.css"),
        new HtmlWebpackPlugin({
            hash: false,
            template: './index.hbs'
        })
    ],
};
