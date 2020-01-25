/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { columnIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import deprecated from './deprecated.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/advanced-column', {
	title: __( 'Section Column' ),
	description: __( 'A single column within a Section block.' ),
	parent: [ 'themeisle-blocks/advanced-columns' ],
	icon,
	category: 'themeisle-blocks',
	attributes,
	deprecated,
	supports: {
		inserter: false,
		reusable: false,
		html: false
	},
	edit,
	save
});
