const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin');
const ejsPages = require('./webpack.ejs.js')()

var entry = {
		main: ["babel-polyfill", './js/main.js'],
	},
	// set the output
	output = {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	// watch the sass file
	sass = {
		test: /\.(sass|scss)$/,
		use:[
			{
				loader: 'style-loader',
				options: { sourceMap: true }
			},
			{
				loader: 'css-loader',
				options: { url: false, sourceMap: true }
			},
			{
				loader: "sass-loader",
				options: { sourceMap: true }
			}
		]
	},

	// devServer config
	devServer = {
		hot: true,
		contentBase : path.resolve(__dirname, 'dist'),
		publicPath: '/',
		watchContentBase: true
	},

	plugins = [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		...ejsPages,
		new DashboardPlugin()
	];

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: entry,

	output: output,

	devtool: 'inline-source-map',

	devServer: devServer,

	module: {
		rules: [
			sass,
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			// { test: /^(?!.*(hot)).*/, loader: "ignore-loader"}
		],
	},

	plugins: plugins
}