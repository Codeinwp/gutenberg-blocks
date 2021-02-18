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
import transforms from './transforms.js';

registerBlockType( 'themeisle-blocks/leaflet-map', {
	title: __( 'Maps' ),
	description: __( 'Display Open Street Maps on your website with Map block.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'map',
		'opeenstreetmap',
		'orbitfox'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	transforms,
	edit,
	save: () => null
});
