const path = require('path');
var glob = require("glob");

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//esternal
const nodeExternals = require('webpack-node-externals');


module.exports = {
  mode: "development",
  entry: {
    js: glob.sync("./src/*.js"),  // per raccogliere tutti i file .js in un unico file
  
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/webpackbuild'),
    clean: true,
  },
 
  resolve: {
    // fallback: {
    //   path: require.resolve('path-browserify'),
    //   constants: require.resolve("constants-browserify"),
    //   stream: require.resolve("stream-browserify"),
    //   "assert": require.resolve("assert/"),
    //   "os": require.resolve("os-browserify/browser"),
    //   "url": require.resolve("url/"),
    //   "zlib": require.resolve("browserify-zlib"),
    //   "crypto": require.resolve("crypto-browserify"),
    //   "fs": require.resolve("fs"),
    //   "http": require.resolve("stream-http"),
    //   "https": require.resolve("https-browserify")
    // },

  },
  
  target: "node", // per abiltare le libreire node (per esempio senza qst comando sarebbe esploso in fase di build per mancanza del modulo fs)
  devtool: "source-map", // per abilitare il file js.map (quando mode è impostatoa development) --> permettono di vedere dal browswer in modalità debug il file non minificato e uglificato che altrimenti si vedrebbe in fase di produzione
  externals: [nodeExternals()], // per abiltare le librerie node (per esempio senza qst comando sarebbe esploso in fase di build per mancanza del modulo fs)
  plugins: [
    new HtmlWebpackPlugin({ }),
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin() // per pulire in automatico i file autogenerati da webpack se cambiamo le impostazioni

  ],
};