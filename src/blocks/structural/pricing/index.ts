
/**
  * Internal dependencies
  */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { pricingIcon as icon } from '../../../helpers/icons.js';
import edit from './edit';
import save from './save';

registerBlockType( 'themeisle-blocks/pricing', {
	title: __( 'Pricing' ),
	description: __( 'Pricing tables are a critical part in showcasing your services, prices and overall offerings.' ),
	icon,
	attributes: {},
	category: 'themeisle-blocks',
	keywords: [
		'pricing',
		'table',
		'money'
	],
	edit,
	save
});

