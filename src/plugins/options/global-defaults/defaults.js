/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const defaultsAttrs = {
	'themeisle-blocks/advanced-heading': {
		tag: 'h2',
		headingColor: '#000000',
		fontStyle: 'normal',
		textTransform: 'none',
		paddingType: 'linked',
		paddingTypeTablet: 'linked',
		paddingTypeMobile: 'linked',
		padding: 0,
		paddingTablet: 0,
		paddingMobile: 0,
		paddingTop: 0,
		paddingTopTablet: 0,
		paddingTopMobile: 0,
		paddingRight: 0,
		paddingRightTablet: 0,
		paddingRightMobile: 0,
		paddingBottom: 0,
		paddingBottomTablet: 0,
		paddingBottomMobile: 0,
		paddingLeft: 0,
		paddingLeftTablet: 0,
		paddingLeftMobile: 0,
		marginType: 'unlinked',
		marginTypeTablet: 'unlinked',
		marginTypeMobile: 'unlinked',
		margin: 0,
		marginTablet: 0,
		marginMobile: 0,
		marginTop: 0,
		marginTopTablet: 0,
		marginTopMobile: 0,
		marginBottom: 25,
		marginBottomTablet: 25,
		marginBottomMobile: 20
	},
	'themeisle-blocks/button-group': {
		spacing: 20,
		collapse: 'collapse-none',
		fontSize: 18,
		fontStyle: 'normal',
		data: {
			color: '#ffffff',
			background: '#32373c',
			paddingTopBottom: 12,
			paddingLeftRight: 24
		}
	}
};

export default defaultsAttrs;
