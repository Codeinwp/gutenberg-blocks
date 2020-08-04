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

import { leafletMapIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/leaflet-map', {
	title: __( 'Leaflet Map' ),
	description: __( ' Display Leaflet Maps on your website with Leaflet Maps Block' ),
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
