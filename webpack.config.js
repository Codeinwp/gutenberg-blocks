const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// CSS loader for styles specific to blocks in general.
const blocksCSSPlugin = new ExtractTextPlugin({
	filename: './build/style.css'
});

// CSS loader for styles specific to block editing.
const editBlocksCSSPlugin = new ExtractTextPlugin({
	filename: './build/edit-blocks.css'
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	use: [
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				plugins: [
					require( 'autoprefixer' )
				]
			}
		},
		{
			loader: 'sass-loader',
			query: {
				outputStyle:
					'production' === process.env.NODE_ENV ? 'compressed' : 'nested'
			}
		}
	]
};

const glob = require( 'glob' ),
	webpack = require( 'webpack' ),
	NODE_ENV = process.env.NODE_ENV || 'development',
	webpackConfig = {
		mode: 'development',
		entry: [ ...glob.sync( './blocks/**/index.js' ), './store/index.js' ],
		output: {
			path: __dirname,
			filename: './build/block.js'
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js?$/,
					use: 'eslint-loader',
					exclude: /node_modules/
				},
				{
					test: /.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /style\.s?css$/,
					use: blocksCSSPlugin.extract( extractConfig )
				},
				{
					test: /editor\.s?css$/,
					use: editBlocksCSSPlugin.extract( extractConfig )
				},
				{
					test: /\.css$/,
					include: /node_modules/,
					use: editBlocksCSSPlugin.extract( extractConfig )
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
			}),
			blocksCSSPlugin,
			editBlocksCSSPlugin
		]
	};

module.exports = webpackConfig;
