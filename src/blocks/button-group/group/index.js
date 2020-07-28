/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { buttonsIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import deprecated from './deprecated.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/button-group', {
	title: __( 'Button Group' ),
	description: __( 'Prompt visitors to take action with a button group.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		__( 'button' ),
		__( 'buttons' ),
		__( 'button group' )
	],
	attributes,
	deprecated,
	edit,
	save
});
