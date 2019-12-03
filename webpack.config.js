const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const glob = require( 'glob' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
	mode: NODE_ENV,
	entry: {
		blocks: [
			'./src/index.js',
			'./src/plugins/registerPlugin.js',
			...glob.sync( './src/blocks/**/index.js' )
		],
		maps: [
			...glob.sync( './src/frontend/google-map/index.js' )
		],
		slider: [
			...glob.sync( './src/frontend/slider/index.js' )
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js',
		chunkFilename: 'chunk-[name].js',
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
							'@babel/plugin-syntax-dynamic-import',
							[
								'@babel/plugin-transform-react-jsx', {
									pragma: 'wp.element.createElement',
									pragmaFrag: 'wp.element.Fragment'
								}
							]
						]
					}
				},
				'eslint-loader' ]
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
			filename: 'style.css',
			chunkFilename: 'edit-blocks.css'
		}),
		new CleanWebpackPlugin()
	]
};
