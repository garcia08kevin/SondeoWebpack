const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  plugins: [
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "index.css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 2525,
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
        test: /\.(js|jsx)$/,         // <-- added `|jsx` here
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: [".*", ".js", ".jsx", ".scss", ".css"],    // <-- added `.jsx` here  
    fallback: {
      "http": require.resolve("stream-http"),
      "buffer": require.resolve("buffer/"),
      "https": require.resolve("https-browserify")
    }
  },
};