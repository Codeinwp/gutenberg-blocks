/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { buttonsIcon as icon } from '../../helpers/icons.js';
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
		__( 'buttons' ),
		__( 'button group' ),
		__( 'advanced buttons' )
	],
	attributes,
	example: {},
	deprecated,
	edit,
	save
});
