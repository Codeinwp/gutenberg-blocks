const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const glob = require( 'glob' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

module.exports = {
	stats: 'minimal',
	mode: NODE_ENV,
	entry: {
		blocks: [
			'./src/index.js',
			'./src/plugins/registerPlugin.js',
			...glob.sync( './src/blocks/**/index.js' )
		],
		'blocks-v2': [
			...glob.sync( './src/blocks/**/index.@(ts|tsx)' )
		],
		'leaflet-map': [
			...glob.sync( './src/frontend/leaflet-map/index.js' )
		],
		maps: [
			...glob.sync( './src/frontend/google-map/index.js' )
		],
		slider: [
			...glob.sync( './src/frontend/slider/index.js' )
		],
		'progress-bar': [
			...glob.sync( './src/frontend/progress-bar/index.js' )
		],
		'circle-counter': [
			...glob.sync( './src/frontend/circle-counter/index.js' )
		],
		lottie: [
			...glob.sync( './src/frontend/lottie/index.js' )
		]
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
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /.js?$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@emotion/babel-preset-css-prop'
						],
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
				}
				]
			},
			{
				test: /\.(css|scss)$/,
				use: [{
					loader: MiniCssExtractPlugin.loader
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								require( 'autoprefixer' )
							]
						}
					}
				},
				'sass-loader' ]
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
			filename: '[name]-style.css',
			chunkFilename: 'editor.css'
		}),
		new CleanWebpackPlugin(),
		new DependencyExtractionWebpackPlugin({
			combineAssets: true,
			combinedOutputFile: 'all-blocks.asset.php'
		})
	],
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json', '.scss' ]
	}
};
