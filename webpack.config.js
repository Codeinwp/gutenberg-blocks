const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const glob = require( 'glob' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	mode: NODE_ENV,
	entry: [
		...glob.sync( './src/**/**/index.js' ),
		...glob.sync( './src/plugins/registerPlugin.js' )
	],
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	output: {
		path: __dirname,
		filename: './build/block.js',
		chunkFilename: './build/[name].js',
		jsonpFunction: 'tiOtterWebpackJsonp'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-transform-async-to-generator',
							'@babel/plugin-proposal-object-rest-spread',
							[
								'@babel/plugin-transform-react-jsx', {
									'pragma': 'wp.element.createElement'
								}
							]
						]
					}
				},
				'eslint-loader' ],
				exclude: /node_modules/
			},
			{
				test: /\.(css|scss)$/,
				use: [ {
					loader: MiniCssExtractPlugin.loader
				},
				'css-loader',
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
				} ]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					reuseExistingChunk: true
				},
				editorStyles: {
					name: 'vendor',
					test: /editor\.scss$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
		}),
		new MiniCssExtractPlugin({
			filename: './build/style.css',
			chunkFilename: './build/edit-blocks.css'
		})
	]
};
