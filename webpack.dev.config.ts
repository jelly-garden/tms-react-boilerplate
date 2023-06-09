import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
// 이 내용이 없으면, devServer 이하 내용에 대하여 에러 발생함
import "webpack-dev-server";
const webpack = require("webpack");
require("dotenv").config();

const config: Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, "build"),
        filename: "[name]-[chunkhash].js",
        assetModuleFilename: "images/[hash][ext][query]",
        publicPath: "/",
        clean: true,
    },
    cache: { type: "memory" },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "tsx",
                    target: "es2015",
                    tsconfigRaw: require("./tsconfig.json"),
                },
            },
            {
                test: /\.(js|jsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "jsx",
                    target: "es2015",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "esbuild-loader",
                        options: {
                            loader: "css",
                            minify: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "./fonts/[name][ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            buffer: require.resolve("buffer"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico",
            env: process.env,
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: true,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/favicon.ico", to: "favicon.ico", noErrorOnMissing: true },
                { from: "public/mockup/auth/checkLogin.json", to: "checkLogin.json", noErrorOnMissing: true },
                { from: "public/mockup/auth/getUserAuth.json", to: "getUserAuth.json", noErrorOnMissing: true },
            ],
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    devtool: "eval-cheap-module-source-map",
    performance: {
        hints: false,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "build"),
        },
        historyApiFallback: true,
        port: process.env.REACT_APP_PORT,
        open: [`http://localhost:${process.env.REACT_APP_PORT}${process.env.REACT_APP_URL}`],
        hot: true,
        proxy: {},
    },
};

export default config;
