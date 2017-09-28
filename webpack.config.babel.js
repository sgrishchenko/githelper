import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import packageJson from './package.json';

export default {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    entry: {
        main: path.resolve(__dirname, 'src/index.jsx'),
        vendor: Object.keys(packageJson.dependencies)
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader"})}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            title: 'Git Helper',
            template: 'node_modules/html-webpack-template/index.ejs',
            appMountId: 'root',
            inject: false
        }),
        new ExtractTextPlugin('[name].[contenthash].css')
    ],
    devServer: {
        proxy: {
            "/help": {
                target: "http://localhost:8080",
                pathRewrite: {"^/help" : ""}
            }
        }
    }
};