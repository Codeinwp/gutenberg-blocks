/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InnerBlocks } = wp.blockEditor;

const TEMPLATE =  [
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'Basic' ),
		align: 'center',
		tag: 'h3',
		fontSize: 24
	}],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( '$9.99' ),
		align: 'center',
		tag: 'h4',
		fontSize: 36,
		fontFamily: 'Roboto Slab',
		fontVariant: 'normal'
	}],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'Per Month' ),
		align: 'center',
		tag: 'p',
		fontSize: 12,
		marginBottom: 0
	}],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'First Feature' ),
		align: 'center',
		tag: 'p',
		fontSize: 12,
		marginBottom: 0
	}],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'Second Feature' ),
		align: 'center',
		tag: 'p',
		fontSize: 12,
		marginBottom: 0
	}],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'Last Feature' ),
		align: 'center',
		tag: 'p',
		fontSize: 12,
		marginBottom: 0
	}],
	[ 'themeisle-blocks/button-group', {
		align: 'center',
		buttons: 1,
		data: [{
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
		}]
	}]
];

const Edit = ({ className }) => {
	return (
		<div className={ className } >
			<InnerBlocks
				template={ TEMPLATE }
			/>
		</div>
	);
};

export default Edit;
