const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    devMiddleware: {
      stats: "minimal",
    },
    client: {
      overlay: true,
    },
    historyApiFallback: true,
    allowedHosts: "all",
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: "" }),
    new ESLintPlugin({
      extensions: [`js`, `jsx`],
      exclude: ["node_modules"],
      // rules: {
      //   "testing-library/no-debugging-utils": [
      //     "error",
      //     {
      //       utilsToCheckFor: {
      //         debug: false,
      //         logRoles: true,
      //         logDOM: true,
      //       },
      //     },
      //   ],
      // },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
