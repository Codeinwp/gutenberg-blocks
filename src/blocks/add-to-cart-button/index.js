/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import { store as icon } from '@wordpress/icons';

/**
  * Internal dependencies
  */
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/add-to-cart-button', {
	title: __( 'Add to Cart Button', 'otter-blocks' ),
	description: __( 'Display an Add to Cart button for your WooCommerce products.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'woocommerce',
		'add to cart',
		'products'
	],
	attributes,
	edit,
	save: () => null
});
