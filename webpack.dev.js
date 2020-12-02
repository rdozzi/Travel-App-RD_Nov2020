const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    optimization : {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                exclude: ['/node_modules/', require.resolve('./src/client/index.js')], //Refer to SO page that discusses file-loader/HTML WP plugin conflicts
                use: {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'imgs',
                      publicPath: 'imgs'
                  }
                }
            }                        
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
          // Simulate the removal of files
            dry: true,
          // Write Logs to Console
            verbose: true,
          // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false
        })
    ]    
}