const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",

  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/build/js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },

  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    liveReload: true,
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 1,
        },
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Webpack Starter",
      filename: "index.html",
      template: path.resolve(__dirname, "src", "template.html"),
    }),
  ],
};
