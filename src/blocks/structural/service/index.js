/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { InnerBlocks } = wp.editor;

/**
 * Internal dependencies
 */
import { servicesIcon } from '../../../helpers/icons.js';

registerBlockType( 'themeisle-blocks/service', {
	title: __( 'Service' ),
	description: __( 'Use this Service block to showcase services your website offers.' ),
	icon: servicesIcon,
	category: 'themeisle-blocks',
	keywords: [
		'services',
		'icon',
		'features'
	],

	edit: props => {
		const TEMPLATE =  [
			[ 'themeisle-blocks/font-awesome-icons', {
				fontSize: 62,
				prefix: 'fab',
				icon: 'angellist'
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Basic' ),
				align: 'center',
				tag: 'h4',
				marginBottom: 20
			} ],
			[ 'themeisle-blocks/advanced-heading', {
				content: __( 'Lorem ipsum dolor sit amet elit do, consectetur adipiscing, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.' ),
				align: 'center',
				color: '#999999',
				tag: 'p',
				fontSize: 14,
				marginBottom: 20
			} ],
			[ 'themeisle-blocks/button-group', {
				align: 'center',
				buttons: 1,
				data: [ {
					text: __( 'Know More' ),
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
