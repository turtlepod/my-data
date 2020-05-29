module.exports = {
	entry: {
		'/': './my-data.js'
	},
	output: {
		path: __dirname,
		filename: 'my-data.min.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: { 
					loader: "babel-loader",
				},
				exclude: /(node_modules|bower_components)/,
			}
		]
	}
};
