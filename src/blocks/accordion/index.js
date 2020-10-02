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
import { authorIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';


registerBlockType( 'themeisle-blocks/accordion', {
	title: __( 'Accordion' ),
	description: __( 'Accordion block for beautiful UI.' ),
	icon,
	attributes,
	category: 'themeisle-blocks',
	keywords: [
		__( 'tabs' ),
		__( 'accordion' ),
		__( 'text' )
	],
	supports: {
		html: true
	},
	edit,
	save
});
