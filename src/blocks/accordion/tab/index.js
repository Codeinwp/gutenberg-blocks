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


//import save from './save.js';

registerBlockType( 'themeisle-blocks/accordion-tab', {
	title: __( 'Accordion Tab' ),
	description: __( 'Prompt visitors to take action with a tab.' ),
	parent: [ 'themeisle-blocks/accordion' ],
	icon,
	category: 'themeisle-blocks',
	keywords: [
		__( 'tab' ),
		__( 'accordion' ),
		__( 'text' )
	],
	attributes,
	supports: {
		reusable: false
	},
	edit,
	save
});
