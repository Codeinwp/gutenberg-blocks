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
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/accordion-item', {
	title: __( 'Accordion Item' ),
	description: __( 'Vertically collapsing accordions perfect for displaying your FAQs.' ),
	parent: [ 'themeisle-blocks/accordion' ],
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'accordions',
		'collapse',
		'faq'
	],
	attributes,
	supports: {
		reusable: false
	},
	edit,
	save
});
