module.exports = {
	sourceMap: true,
  	plugins: {
	    'postcss-import': {},
	    'postcss-cssnext': {
	      browsers: ['last 2 versions', '> 5%'],
    	},
  	},
};