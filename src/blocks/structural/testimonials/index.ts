
/**
  * Internal dependencies
  */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { testimonialsIcon as icon } from '../../../helpers/icons.js';
import edit from './edit';
import save from './save';

registerBlockType( 'themeisle-blocks/testimonials', {
	title: __( 'Testimonials' ),
	description: __( 'Display kudos from customers and clients and display them on your website.' ),
	icon,
	attributes: {},
	category: 'themeisle-blocks',
	keywords: [
		'testimonials',
		'quotes',
		'business'
	],
	edit,
	save
});

