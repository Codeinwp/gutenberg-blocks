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
import './style.scss';
import edit from './edit.js';
import save from './save.js';
import attributes from './attributes.js';

registerBlockType( 'themeisle-blocks/tabs-item', {
	title: __( 'Tab Item' ),
	description: __( 'Add a tab to your component.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'media',
		'tab',
		'item'
	],
	attributes,
	supports: {
		align: [ 'left', 'center', 'right' ]
	},
	parent: [ 'themeisle-blocks/tabs' ],
	edit,
	save
});

