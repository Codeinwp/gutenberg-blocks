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
import { mapIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/google-map', {
	title: __( 'Google Map' ),
	description: __( 'Display a Google Map on your website with Google Map block.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'map',
		'google',
		'orbitfox'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	edit,
	save: () => null
});
