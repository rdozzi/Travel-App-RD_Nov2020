const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    },
    module: {
        rules: [
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.scss$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    //Creates 'style' nodes from JS strings
                    'style-loader',
                    //Translates CSS into CommonJS
                    'css-loader',
                    //Compiles Sass to Css
                    'sass-loader'
                ]
            },
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}