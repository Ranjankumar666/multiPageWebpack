const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dynamic  = require("./dynamicEntries");



const entries = dynamic.entries('./src/**/index.js');
const plugins = dynamic.HTMLPlugins(HtmlWebpackPlugin, entries);

module.exports = {
  entry: entries,
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "/dist"),
  },
  mode: "development",
  devServer: {
    // Base folder to watch
    contentBase: path.join(__dirname, "/dist"),
    index: "index.html",
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-react"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      { test: /\.(png|jpg|jpeg)$/, use: "file-loader" },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "post-css",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          variable: "data",
          interpolate: "\\{\\{(.+?)\\}\\}",
          evaluate: "\\[\\[(.+?)\\]\\]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...plugins
  ],
};
