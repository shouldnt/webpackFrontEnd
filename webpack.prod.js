const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ejsPages = require('./webpack.ejs.js')()


var entry = {
		main: ["babel-polyfill", './js/main.js']
	},

	output = {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	}

	// watch the sass file
	sass = {
		test: /\.(sass|scss)$/,
		use: ExtractTextPlugin.extract({
			// use: ['css-loader?modules', 'sass-loader'],
			use: [
				{
					loader: 'css-loader?source-map',
					options: {url: false, minimize: true} 
				},
				'postcss-loader',
				'sass-loader'
			],
			fallback: 'style-loader'
		})
	},
	plugins = [
		new ExtractTextPlugin('/css/[name].css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: false,
			}
		}),
		...ejsPages
	]

	module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: entry,

	output: output,

	devtool: 'inline-source-map',

	module: {
		rules: [
			sass,
		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
		// { test: /^(?!.*(hot)).*/, loader: "ignore-loader"}
		],
	},

	plugins: plugins
}