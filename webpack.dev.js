const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin');

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

	html = {
		test: /\.(html)$/,
		use: [
			{
			    loader: 'html-loader',
			    options: {
			      	attrs: [':data-src'],
			      	removeComments: false,
	        		collapseWhitespace: false
			    }
			},
		]
	}
	img = {
		test: /\.(jpg|png)$/,
		use: {
			loader: 'file-loader',
			options: { name: '[path]/[name].[ext]' }
		}
	}

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
		new HtmlPlugin({
			filename: './dist/index.html',
			template: 'templates/index.html',
			inject: 'body'
		}),
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
			img,
			html,
			sass,
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			// { test: /^(?!.*(hot)).*/, loader: "ignore-loader"}
		],
	},

	plugins: plugins
}