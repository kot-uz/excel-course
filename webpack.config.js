const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const computeFilename = extension => isProd? `bundle.[fullhash].${extension}` : `bundle.${extension}`;

console.log("isProd = ", isProd);
console.log("isDev = ", isDev);

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: 'development',
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: computeFilename("js")
  },
  devtool: isDev? 'source-map': false,
  devServer: {
  // static: {
  //   directory: path.join(__dirname, 'public'),
  // },
  // compress: true,
    port: 3000,
    hot: isDev,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      '@core': path.resolve(__dirname, "src/core")
    },
    extensions: [".js"]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist")
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: computeFilename("css")
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
