/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { InnerBlocks } = wp.editor;

/**
 * Internal dependencies
 */
import { pricingIcon } from '../../../helpers/icons.js';

registerBlockType( 'themeisle-blocks/pricing', {
	title: __( 'Pricing' ),
	description: __( 'Pricing tables are a critical part in showcasing your services, prices and overall offerings.' ),
	icon: pricingIcon,
	category: 'themeisle-blocks',
	keywords: [
		'pricing',
		'table',
		'money'
	],

	edit: props => {
		const TEMPLATE =  [
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Basic' ),
				align: 'center',
				tag: 'h5'
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( '$9.99' ),
				align: 'center',
				tag: 'h3',
				fontSize: 36,
				fontFamily: 'Roboto Slab',
				fontVariant: 'normal'
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Per Month' ),
				align: 'center',
				tag: 'p',
				fontSize: 12,
				marginBottom: 0
			} ],
			[ 'core/separator', {} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'First Feature' ),
				align: 'center',
				tag: 'p',
				fontSize: 12,
				marginBottom: 0
			} ],
			[ 'core/separator', {} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Second Feature' ),
				align: 'center',
				tag: 'p',
				fontSize: 12,
				marginBottom: 0
			} ],
			[ 'core/separator', {} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Last Feature' ),
				align: 'center',
				tag: 'p',
				fontSize: 12,
				marginBottom: 0
			} ],
			[ 'core/separator', {} ],
			[ 'themeisle-blocks/button-group', {
				align: 'center',
				buttons: 1,
				data: [ {
					text: __( 'Buy Now' ),
					newTab: false,
					color: '#ffffff',
					background: '#32373c',
					hoverColor: '#ffffff',
					hoverBackground: '#444a50',
					borderSize: 0,
					borderRadius: 3,
					boxShadow: false,
					boxShadowColorOpacity: 50,
					boxShadowBlur: 5,
					boxShadowSpread: 1,
					boxShadowHorizontal: 0,
					boxShadowVertical: 0,
					hoverBoxShadowColorOpacity: 50,
					hoverBoxShadowBlur: 5,
					hoverBoxShadowSpread: 1,
					hoverBoxShadowHorizontal: 0,
					hoverBoxShadowVertical: 0,
					iconType: 'none',
					paddingTopBottom: 12,
					paddingLeftRight: 24
				} ]
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
