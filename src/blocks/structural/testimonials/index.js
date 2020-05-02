/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { testimonialsIcon as icon } from '../../../helpers/icons.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/testimonials', {
	title: __( 'Testimonials' ),
	description: __( 'Display kudos from customers and clients and display them on your website.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'testimonials',
		'quotes',
		'business'
	],
	example: {
		innerBlocks: [
			{
				name: 'core/image',
				attributes: {
					align: 'center',
					url: 'http://0.gravatar.com/avatar/f02ef38abde91cdf5ea67cbb04dab1d9?s=120&d=wavatar&f=y&r=g'
				}
			},
			{
				name: 'themeisle-blocks/advanced-heading',
				attributes: {
					content: __( 'John Doe' ),
					align: 'center',
					fontSize: 24,
					tag: 'h3',
					marginTop: 25,
					marginBottom: 10,
					marginTopTablet: 25,
					marginTopMobile: 25
				}
			},
			{
				name: 'themeisle-blocks/advanced-heading',
				attributes: {
					content: __( 'Jedi Master' ),
					align: 'center',
					fontSize: 14,
					tag: 'h4',
					marginTop: 10,
					marginBottom: 10
				}
			},
			{
				name: 'themeisle-blocks/advanced-heading',
				attributes: {
					content: __( '"What is the point of being alive if you don’t at least try to do something remarkable?"' ),
					align: 'center',
					color: '#999999',
					tag: 'p',
					fontSize: 14,
					marginTop: 10,
					marginBottom: 20
				}
			}
		]
	},
	edit,
	save
});
