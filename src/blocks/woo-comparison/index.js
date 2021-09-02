/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
// import './editor.scss';
// import './style.scss';
import { faIcon as icon } from '../../helpers/icons.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/woo-comparison', {
	title: __( 'WooCommerce Comparison Table', 'otter-blocks' ),
	description: __( 'A way to compare different WooCommerce products made on the website.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'woocommerce',
		'comparison',
		'table'
	],
	supports: {
		html: false
	},
	edit,
	save: () => null
});
