/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { faIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/icon-list-item', {
	title: __( 'Icon List Item' ),
	description: __( 'Display an item for the icon list.' ),
	icon,
	attributes,
	category: 'themeisle-blocks',
	parent: [ 'themeisle-blocks/icon-list' ],
	keywords: [
		'item',
		'icon',
		'list'
	],
	merge( attributes, attributesToMerge ) {
		return {
			title: ( attributes.title || '' ) + ( attributesToMerge.title || '' )
		};
	},
	edit,
	save
});
