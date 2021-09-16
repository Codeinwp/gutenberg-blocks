/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { inputIcon as icon } from '../../../helpers/icons.js';

registerBlockType( 'themeisle-blocks/form-nonce', {
	title: __( 'Nonce Field', 'otter-blocks' ),
	description: __( 'Protect the form from CSRF.', 'otter-blocks' ),
	icon,
	parent: [ 'themeisle-blocks/form' ],
	category: 'themeisle-blocks',
	keywords: [
		'protection',
		'csrf',
		'field'
	],
	attributes: {},
	supports: {
		align: [ 'wide', 'full' ]
	},
	edit: () => null,
	save: () => null
});
