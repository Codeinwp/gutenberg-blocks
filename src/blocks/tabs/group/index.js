/**
 * External dependencies
 */
import { video as icon } from '@wordpress/icons';

/**
  * WordPress dependencies
  */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
  * Internal dependencies
  */
import './editor.scss';
import edit from './edit.js';
import save from './save.js';
import attributes from './attributes.js';

registerBlockType( 'themeisle-blocks/tabs', {
	title: __( 'Tabs' ),
	description: __( 'Add tabs to your page.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'media',
		'tabs',
		'select'
	],
	attributes,
	supports: {
		align: [ 'left', 'center', 'right' ]
	},
	edit,
	save
});

