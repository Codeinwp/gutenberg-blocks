/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { InnerBlocks } = wp.editor;

/**
 * Internal dependencies
 */
import { testimonialsIcon } from '../../../helpers/icons.js';

registerBlockType( 'themeisle-blocks/testimonials', {
	title: __( 'Testimonials' ),
	description: __( 'Display kudos from customers and clients and display them on your website.' ),
	icon: testimonialsIcon,
	category: 'themeisle-blocks',
	keywords: [
		'testimonials',
		'quotes',
		'business'
	],

	edit: props => {
		const TEMPLATE =  [
			[ 'core/image', {
				align: 'center'
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'John Doe' ),
				align: 'center',
				fontSize: 24,
				tag: 'h3',
				marginTop: 25,
				marginBottom: 10,
				marginTopTablet: 25,
				marginTopMobile: 25
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Jedi Master' ),
				align: 'center',
				fontSize: 14,
				tag: 'h6',
				marginTop: 10,
				marginBottom: 10
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( '"What is the point of being alive if you don’t at least try to do something remarkable?"' ),
				align: 'center',
				color: '#999999',
				tag: 'p',
				fontSize: 14,
				marginTop: 10,
				marginBottom: 20
			} ]
		];

		return [
			<div className={ props.className } >
				<InnerBlocks
					template={ TEMPLATE }
				/>
			</div>
		];
	},

	save: props => {
		return (
			<div className={ props.className } >
				<InnerBlocks.Content/>
			</div>
		);
	}
});
