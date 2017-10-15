const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var WriteFilePlugin = require('write-file-webpack-plugin');

const env = process.env.NODE_ENV;

var 
	// init entry point
	entry = {
		main: ["babel-polyfill", './js/main.js'],
	},

	// set the output
	output = {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	// watch the sass file
	sass = {
		test: /\.(sass|scss)$/
	},

	// devServer config
	devServer = {},

	plugins = [];

if(env === "production") {

	sass.use = ExtractTextPlugin.extract({
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
			});

	plugins.push(new ExtractTextPlugin('/css/[name].css'));
	plugins.push(new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					drop_console: false,
				}
			}));

} else {

	//entry 
	// entry.push(
	// 		'webpack-dev-server/client?http://localhost:8080',
	// 	    // bundle the client for webpack-dev-server
	// 	    // and connect to the provided endpoint
	// 	    'webpack/hot/only-dev-server'
	// 	    // bundle the client for hot reloading
	// 	    // only- means to only hot reload for successful updates
	// 	);

	//out put
	output.publicPath = '/';

	//devServer
	devServer.hot = true;
	// enable HMR on the server
	devServer.contentBase = path.resolve(__dirname, 'dist');
	// match the output path
	devServer.publicPath = '/';
	// match the output `publicPath`
	devServer.watchContentBase = true;

	//sass compile
	sass.use = [
				{
					loader: 'style-loader',
					options: { sourceMap: true } 
				},
				{
					loader: 'css-loader',
					options: { url: false, sourceMap: true, importLoaders: 1} 
				},
				{
					loader: 'postcss-loader',
					options: { sourceMap: 'inline'}
				},
				{
					loader: "sass-loader",
					options: {
						sourceMap: true
					} 
				}];

	//plugins
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NamedModulesPlugin()
	);
}

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
