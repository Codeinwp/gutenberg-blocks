/**
 * External dependencies
 */
import Editor from './Editor.js';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';

registerBlockType( 'themeisle-blocks/chart-pie', {
	title: __( 'Pie Chart' ),
	description: __( 'Display a beautiful Pie Chart on your blog post with Pie Chart block.' ),
	icon: 'chart-pie',
	category: 'themeisle-blocks',
	keywords: [
		__( 'pie' ),
		__( 'chart' ),
		__( 'orbitfox' )
	],
	attributes: {
		data: {
			type: 'string',
			default: '[["Label","Data"],["Dogs",40],["Cats",30],["Racoons",20],["Monkeys",10]]'
		},
		options: {
			type: 'object',
			default: {
				title: 'Animals',
				is3D: true
			}
		},
		id: {
			type: 'string',
			default: ''
		}
	},

	supports: {
		inserter: false
	},

	edit: Editor,

	save: () => {
		return null;
	}
});
