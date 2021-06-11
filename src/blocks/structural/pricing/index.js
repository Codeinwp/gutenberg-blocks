/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { pricingIcon as icon } from '../../../helpers/icons.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/pricing', {
	title: __( 'Pricing', 'otter-blocks' ),
	description: __( 'Pricing tables are a critical part in showcasing your services, prices and overall offerings.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'pricing',
		'table',
		'money'
	],
	edit,
	save
});
