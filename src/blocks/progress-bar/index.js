/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { postsIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/progress-bar', {
	title: __( 'Progress bar' ),
	description: __( 'Display a progress bar in a beautiful layout.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'progress',
		'bar',
		'loaded'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	edit,
	save: () => null
});
