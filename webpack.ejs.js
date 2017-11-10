const HtmlPlugin = require('html-webpack-plugin')

// add file ejs here
let ejsList = [
	'index',
	'test'
]

// don't touch this
module.exports = function() {
	let list = []
	for (let i = 0; i < ejsList.length; i++) {
		list.push(
			new HtmlPlugin({
				filename: './'+ ejsList[i] + '.html',
				template: '!!ejs-render-loader!./src/' + ejsList[i] + '.ejs',
				inject: 'body'
			})
		)
	}
	// console.log(list)
	return list
}