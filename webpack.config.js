const path = require("path"); // connect path to webpack config
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // connect plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // connect plugin

module.exports = {
  devtool: "inline-source-map", //This option lets you choose a style of source mapping in a browser to enhance the debugging process. With the inline-source-map value, you will see the original code in the debugger.
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    // rewrite the output point using the path utility
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"],
  stats: "errors-only", // only output when errors happen
  mode: "development",

  //WebPack Server
  devServer: {
    static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)
    open: true, // site will open automatically in the browser after executing npm run dev
    liveReload: true, // The last two properties are necessary in order to instruct the development server to reload the page whenever it detects changes.
    hot: false,
  },

  //Babel
  module: {
    rules: [
      // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            //To make PostCSS process CSS files that have @import
            // A value of 1 means that certain PostCSS transformations must be performed before running css-loader.
            options: { importLoaders: 1 },
          },
          // add postcss-loader
          "postcss-loader",
        ],
      },
      //Images and Fonts - No need for an additional package
      {
        // add the rule for processing files
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },

  //Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // path to our index.html file
    }),
    new CleanWebpackPlugin(), // use plugin
    new MiniCssExtractPlugin(), // connect the plugin for merging CSS files
  ],
};
