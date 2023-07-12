const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build"),
      filename: isProduction ? '[name].[contenthash].js' : 'index_bundle.js',
      publicPath: '/'
    },
    plugins: [
      new NodePolyfillPlugin(),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name].[contenthash].css" : "index.css",
        chunkFilename: isProduction ? "[id].[contenthash].css" : "index.css"
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify("https://api-4y6f.onrender.com")
      }),
    ],
    devServer: {
      disableHostCheck: true
    },
    module: {
      // exclude node_modules
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(jpg|png|svg)$/i,
          loader: 'url-loader',
          options: {
            outputPath: 'images',
          }
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ],
        },
      ],
    },
    // pass all js files through Babel
    resolve: {
      extensions: [".*", ".js", ".jsx", ".scss", ".css"],
      fallback: {
        "http": require.resolve("stream-http"),
        "buffer": require.resolve("buffer/"),
        "https": require.resolve("https-browserify")
      }
    },
  }
};