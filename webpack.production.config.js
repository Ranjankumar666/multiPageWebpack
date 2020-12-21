const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path.join(__dirname, "./src/index.js"),
    helloImage: path.join(__dirname, "./src/helloImage.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "/dist"),
  },
  mode: "production",
  optimization: {
    splitChunks: {
      minSize: 10000,
      automaticNameDelimiter: "_",
    },
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
          MiniCssExtractPlugin.loader,
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
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
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Webpack",
      chunks: ["index"],
      template: "./src/template.ejs",
    }),
    new HtmlWebpackPlugin({
      filename: "helloWorld.html",
      title: "Webpack",
      chunks: ["helloImage"],
      template: "./src/template.ejs",
    }),
  ],
};
