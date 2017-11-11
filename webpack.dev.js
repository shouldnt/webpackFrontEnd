const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin');
const ejsPages = require('./webpack.ejs.js')()
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
	images = {
		test: /\.(jpe?g)|png|gif|svg$/,
        use: [
        	{
        		loader: 'file-loader'
        	}
        ]
	}
	html = {
		test: /\.(ejs)$/,
		use:[
			// {
			// 	loader: 'html-loader',
			// 	options: {
			// 		url: false
			// 	}
			// },
			{
				loader: 'ejs-compiled-loader'
			}
		]
	},

	// devServer config
	devServer = {
		hot: true,
		contentBase : [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'src/*/*.ejs')],
		publicPath: '/',
		watchContentBase: true
	},

	plugins = [
		new CleanWebpackPlugin('./dist/css/main.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		// new webpack.ProvidePlugin({
		//       _: 'lodash'
		// }),
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
			html,
			// images,
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			// { test: /^(?!.*(hot)).*/, loader: "ignore-loader"}
		],
	},

	plugins: plugins
}