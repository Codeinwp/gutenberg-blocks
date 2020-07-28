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

//import { mapIcon as icon } from '../../helpers/icons.js';  todo: find an icon
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/open-street-map', {
	title: __( 'Open Street Map' ),
	description: __( ' Display Open Street Map on your website with Open Street Map Block' ),
	category: 'themeisle-blocks',
	keywords: [
		'map',
		'open street',
		''
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	edit,
	save: () => null
});
