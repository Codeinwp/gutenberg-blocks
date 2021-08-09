/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

import { mapIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/form-input', {
	title: __( 'Form Input', 'otter-blocks' ),
	description: __( 'Display a contact form for your clients.', 'otter-blocks' ),
	icon,
	parent: [ 'themeisle-blocks/form' ],
	category: 'themeisle-blocks',
	keywords: [
		'business',
		'form',
		'contact',
		'email'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ]
	},
	edit,
	save
});
