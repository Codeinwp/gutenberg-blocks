/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
//import './style.scss';
import './editor.scss';

import { lMapIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/map', {
	title: __( 'Map' ),
	description: __( ' Display maps on your website with Maps Block' ),
	category: 'themeisle-blocks',
	keywords: [
		'map',
		'leaflet',
		'open street'
	],
	icon,
	attributes,
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	edit,
	save: () => null
});
