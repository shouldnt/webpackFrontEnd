const HtmlPlugin = require('html-webpack-plugin')
const path = require('path');
var fs = require('fs');

// fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));

// add file ejs here
let ejsList = [
	'index'
]

// don't touch this
module.exports = function() {
	let list = []
	for (let i = 0; i < ejsList.length; i++) {

		// check if files in the list ( ejsList ) are exist or not
		if (!fs.existsSync(path.resolve(__dirname, 'src/' + ejsList[i] + '.ejs'))) {

			let src = path.resolve(__dirname, 'src/copy/copy.ejs'), // path to get file need to copy

				dest = path.resolve(__dirname, 'src/' + ejsList[i] + '.ejs') // path to create file

			// copy from 'src/copy/copy.ejs' to 'src/[name].ejs'
		    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
		    console.log('success add file ' + ejsList[i] + '.ejs')
		}

		// add to html plugin
		list.push(
			new HtmlPlugin({
				filename: './'+ ejsList[i] + '.html',
				template: ejsList[i] + '.ejs',
				inject: 'body'
			})
		)
	}
	return list
}