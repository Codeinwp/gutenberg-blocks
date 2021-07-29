const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const glob = require( 'glob' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
	stats: 'minimal',
	mode: NODE_ENV,
	entry: {
		blocks: [
			'./src/index.js',
			'./src/plugins/registerPlugin.js',
			...glob.sync( './src/blocks/**/index.js' )
		],
		'leaflet-map': './src/frontend/leaflet-map/index.js',
		maps: './src/frontend/google-map/index.js',
		slider: './src/frontend/slider/index.js',
		'progress-bar': './src/frontend/progress-bar/index.js',
		'circle-counter': './src/frontend/circle-counter/index.js',
		lottie: './src/frontend/lottie/index.js',
		tabs: './src/frontend/tabs/index.js',
		masonry: './src/frontend/masonry/index.js',
		countdown: './src/frontend/countdown/index.js'
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'lodash': 'lodash',
		'moment': 'moment',
		'@wordpress/api-fetch': 'wp.apiFetch',
		'@wordpress/blocks': 'wp.blocks',
		'@wordpress/block-editor': 'wp.blockEditor',
		'@wordpress/components': 'wp.components',
		'@wordpress/compose': 'wp.compose',
		'@wordpress/data': 'wp.data',
		'@wordpress/dom-ready': 'wp.domReady',
		'@wordpress/edit-post': 'wp.editPost',
		'@wordpress/editor': 'wp.editor',
		'@wordpress/element': 'wp.element',
		'@wordpress/hooks': 'wp.hooks',
		'@wordpress/i18n': 'wp.i18n',
		'@wordpress/keycodes': 'wp.keycodes',
		'@wordpress/old-editor': 'wp.oldEditor',
		'@wordpress/plugins': 'wp.plugins',
		'@wordpress/primitives': 'wp.primitives',
		'@wordpress/rich-text': 'wp.richText',
		'@wordpress/server-side-render': 'wp.serverSideRender',
		'regenerator-runtime/runtime.js': 'window.regeneratorRuntime'
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
						presets: [
							[
								'@babel/preset-env', {
									useBuiltIns: 'entry',
									corejs: '3.14'
								}
							],
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
				},
				{
					loader: 'eslint-loader',
					options: {
						fix: true
					}
				} ]
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
			filename: 'style.css',
			chunkFilename: 'editor.css'
		}),
		new CleanWebpackPlugin()
	]
};
