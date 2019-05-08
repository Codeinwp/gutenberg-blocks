/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';
import GoogleFontLoader from 'react-google-font-loader';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	createBlock,
	registerBlockType
} = wp.blocks;

const {
	Button,
	Dashicon,
	Dropdown,
	DropdownMenu,
	IconButton,
	PanelBody,
	RangeControl,
	SVG,
	ToggleControl,
	Toolbar
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const { withSelect } = wp.data;

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText
} = wp.editor;

const { Fragment } = wp.element;

const { withViewportMatch } = wp.viewport;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import './registerHeadingHighlight.js';

import { headingIcon } from '../../helpers/icons.js';

import GoogleFontsControl from '../../components/google-fonts-control/index.js';

import ControlPanelControl from '../../components/control-panel-control/index.js';

import ResponsiveControl from '../../components/responsive-control/index.js';

import SizingControl from '../../components/sizing-control/index.js';

registerBlockType( 'themeisle-blocks/advanced-heading', {
	title: __( 'Advanced Heading' ),
	description: __( 'Advanced Heading gives a spin to editor\'s Heading block with much needed customization options.' ),
	icon: headingIcon,
	category: 'themeisle-blocks',
	keywords: [
		__( 'heading' ),
		__( 'title' ),
		__( 'advanced heading' )
	],
	attributes: {
		id: {
			type: 'string'
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'h1,h2,h3,h4,h5,h6,div,p,span',
			default: ''
		},
		tag: {
			default: 'h2',
			type: 'string'
		},
		align: {
			type: 'string'
		},
		alignTablet: {
			type: 'string'
		},
		alignMobile: {
			type: 'string'
		},
		headingColor: {
			type: 'string',
			default: '#000000'
		},
		highlightColor: {
			type: 'string'
		},
		highlightBackground: {
			type: 'string'
		},
		fontSize: {
			type: 'number'
		},
		fontSizeTablet: {
			type: 'number'
		},
		fontSizeMobile: {
			type: 'number'
		},
		fontFamily: {
			type: 'string'
		},
		fontVariant: {
			type: 'string'
		},
		fontStyle: {
			type: 'string',
			default: 'normal'
		},
		textTransform: {
			type: 'string',
			default: 'none'
		},
		lineHeight: {
			type: 'number'
		},
		letterSpacing: {
			type: 'number'
		},
		textShadow: {
			type: 'boolean',
			default: false
		},
		textShadowColor: {
			type: 'string',
			default: '#000000'
		},
		textShadowColorOpacity: {
			type: 'number',
			default: 50
		},
		textShadowBlur: {
			type: 'number',
			default: 5
		},
		textShadowHorizontal: {
			type: 'number',
			default: 0
		},
		textShadowVertical: {
			type: 'number',
			default: 0
		},
		paddingType: {
			type: 'string',
			default: 'linked'
		},
		paddingTypeTablet: {
			type: 'string',
			default: 'linked'
		},
		paddingTypeMobile: {
			type: 'string',
			default: 'linked'
		},
		padding: {
			type: 'number',
			default: 0
		},
		paddingTablet: {
			type: 'number',
			default: 0
		},
		paddingMobile: {
			type: 'number',
			default: 0
		},
		paddingTop: {
			type: 'number',
			default: 0
		},
		paddingTopTablet: {
			type: 'number',
			default: 0
		},
		paddingTopMobile: {
			type: 'number',
			default: 0
		},
		paddingRight: {
			type: 'number',
			default: 0
		},
		paddingRightTablet: {
			type: 'number',
			default: 0
		},
		paddingRightMobile: {
			type: 'number',
			default: 0
		},
		paddingBottom: {
			type: 'number',
			default: 0
		},
		paddingBottomTablet: {
			type: 'number',
			default: 0
		},
		paddingBottomMobile: {
			type: 'number',
			default: 0
		},
		paddingLeft: {
			type: 'number',
			default: 0
		},
		paddingLeftTablet: {
			type: 'number',
			default: 0
		},
		paddingLeftMobile: {
			type: 'number',
			default: 0
		},
		marginType: {
			type: 'string',
			default: 'unlinked'
		},
		marginTypeTablet: {
			type: 'string',
			default: 'unlinked'
		},
		marginTypeMobile: {
			type: 'string',
			default: 'unlinked'
		},
		margin: {
			type: 'number',
			default: 0
		},
		marginTablet: {
			type: 'number',
			default: 0
		},
		marginMobile: {
			type: 'number',
			default: 0
		},
		marginTop: {
			type: 'number',
			default: 0
		},
		marginTopTablet: {
			type: 'number',
			default: 0
		},
		marginTopMobile: {
			type: 'number',
			default: 0
		},
		marginBottom: {
			type: 'number',
			default: 25
		},
		marginBottomTablet: {
			type: 'number',
			default: 25
		},
		marginBottomMobile: {
			type: 'number',
			default: 20
		}
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ({ content }) => {
					return createBlock( 'themeisle-blocks/advanced-heading', {
						content
					});
				}
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ({ content }) => {
					return createBlock( 'themeisle-blocks/advanced-heading', {
						content
					});
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ({ content }) => {
					return createBlock( 'core/paragraph', {
						content
					});
				}
			}
		]
	},

	edit: compose([

		withSelect( ( select, props ) => {
			return {
				props
			};
		}),

		withState({
			tab: 'style',
			fontSizeViewType: 'desktop',
			alignmentViewType: 'desktop',
			paddingViewType: 'desktop',
			marginViewType: 'desktop'
		}),

		withViewportMatch({
			isLarger: '>= large',
			isLarge: '<= large',
			isSmall: '>= small',
			isSmaller: '<= small'
		})

	])( ({
		tab,
		fontSizeViewType,
		alignmentViewType,
		paddingViewType,
		marginViewType,
		setState,
		isLarger,
		isLarge,
		isSmall,
		isSmaller,
		props
	}) => {

		const {
			id,
			content,
			tag,
			align,
			alignTablet,
			alignMobile,
			headingColor,
			highlightColor,
			highlightBackground,
			fontSize,
			fontSizeTablet,
			fontSizeMobile,
			fontFamily,
			fontVariant,
			fontStyle,
			textTransform,
			lineHeight,
			letterSpacing,
			textShadow,
			textShadowColor,
			textShadowColorOpacity,
			textShadowBlur,
			textShadowHorizontal,
			textShadowVertical,
			paddingType,
			paddingTypeTablet,
			paddingTypeMobile,
			padding,
			paddingTablet,
			paddingMobile,
			paddingTop,
			paddingTopTablet,
			paddingTopMobile,
			paddingRight,
			paddingRightTablet,
			paddingRightMobile,
			paddingBottom,
			paddingBottomTablet,
			paddingBottomMobile,
			paddingLeft,
			paddingLeftTablet,
			paddingLeftMobile,
			marginType,
			marginTypeTablet,
			marginTypeMobile,
			margin,
			marginTablet,
			marginMobile,
			marginTop,
			marginTopTablet,
			marginTopMobile,
			marginBottom,
			marginBottomTablet,
			marginBottomMobile
		} = props.attributes;

		if ( id === undefined || id.substr( id.length - 8 ) !== props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-advanced-heading-${ props.clientId.substr( 0, 8 ) }`;
			props.setAttributes({ id: instanceId });
		}

		const isDesktop = ( isLarger && ! isLarge && isSmall && ! isSmaller );

		const isTablet = ( ! isLarger && ! isLarge && isSmall && ! isSmaller );

		const isMobile = ( ! isLarger && ! isLarge && ! isSmall && ! isSmaller );

		const changeFontSizeViewType = value => {
			setState({ fontSizeViewType: value });
		};

		const changeAlignmentViewType = value => {
			setState({ alignmentViewType: value });
		};

		const changePaddingViewType = value => {
			setState({ paddingViewType: value });
		};

		const changeMarginViewType = value => {
			setState({ marginViewType: value });
		};

		const changeContent = value => {
			props.setAttributes({ content: value });
		};

		const changeTag = value => {
			props.setAttributes({ tag: value });
		};

		const getTagIcon = value => {
			if ( 'h1' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">H1</text></SVG>;
			}

			if ( 'h2' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">H2</text></SVG>;
			}

			if ( 'h3' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">H3</text></SVG>;
			}

			if ( 'h4' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">H4</text></SVG>;
			}

			if ( 'h5' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">H5</text></SVG>;
			}

			if ( 'h6' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">H6</text></SVG>;
			}

			if ( 'div' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">DIV</text></SVG>;
			}

			if ( 'p' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text x="0" y="15">P</text></SVG>;
			}

			if ( 'span' === value ) {
				return <SVG style={ { width: '25px', height: '20px' } }><text style={ { fontSize: '12px' } } x="0" y="15">SPAN</text></SVG>;
			}
		};

		const changeHeadingColor = value => {
			props.setAttributes({ headingColor: value });
		};

		const changeHighlightColor = value => {
			props.setAttributes({ highlightColor: value });
		};

		const changeHighlightBackground = value => {
			props.setAttributes({ highlightBackground: value });
		};

		const changeFontSize = value => {
			if ( 'desktop' === fontSizeViewType ) {
				props.setAttributes({ fontSize: value });
			}
			if ( 'tablet' === fontSizeViewType ) {
				props.setAttributes({ fontSizeTablet: value });
			}
			if ( 'mobile' === fontSizeViewType ) {
				props.setAttributes({ fontSizeMobile: value });
			}
		};

		let getFontSize = () => {
			let value;

			if ( 'desktop' === fontSizeViewType ) {
				value = fontSize;
			}

			if ( 'tablet' === fontSizeViewType ) {
				value = fontSizeTablet;
			}

			if ( 'mobile' === fontSizeViewType ) {
				value = fontSizeMobile;
			}

			return value;
		};

		getFontSize = getFontSize();

		const changeAlignment = value => {
			if ( 'desktop' === alignmentViewType ) {
				props.setAttributes({ align: value });
			}
			if ( 'tablet' === alignmentViewType ) {
				props.setAttributes({ alignTablet: value });
			}
			if ( 'mobile' === alignmentViewType ) {
				props.setAttributes({ alignMobile: value });
			}
		};

		let getAlignment = () => {
			let value;

			if ( 'desktop' === alignmentViewType ) {
				value = align;
			}

			if ( 'tablet' === alignmentViewType ) {
				value = alignTablet;
			}

			if ( 'mobile' === alignmentViewType ) {
				value = alignMobile;
			}

			return value;
		};

		getAlignment = getAlignment();

		const changeFontFamily = value => {
			props.setAttributes({
				fontFamily: value,
				fontVariant: 'normal',
				fontStyle: 'normal'
			});
		};

		const changeFontVariant = value => {
			props.setAttributes({ fontVariant: value });
		};

		const changeFontStyle = value => {
			props.setAttributes({ fontStyle: value });
		};

		const changeTextTransform = value => {
			props.setAttributes({ textTransform: value });
		};

		const changeLineHeight = value => {
			props.setAttributes({ lineHeight: value });
		};

		const changeLetterSpacing = value => {
			props.setAttributes({ letterSpacing: value });
		};

		const changeTextShadowColor = value => {
			props.setAttributes({ textShadowColor: value });
		};

		const changeTextShadow = value => {
			props.setAttributes({ textShadow: value });
		};

		const changeTextShadowColorOpacity = value => {
			props.setAttributes({ textShadowColorOpacity: value });
		};

		const changeTextShadowBlur = value => {
			props.setAttributes({ textShadowBlur: value });
		};

		const changeTextShadowHorizontal = value => {
			props.setAttributes({ textShadowHorizontal: value });
		};

		const changeTextShadowVertical = value => {
			props.setAttributes({ textShadowVertical: value });
		};

		const getPadding = type => {
			let value;

			if ( 'top' == type ) {
				if ( 'desktop' === paddingViewType ) {
					value = 'linked' === paddingType ? padding : paddingTop;
				}

				if ( 'tablet' === paddingViewType ) {
					value = 'linked' === paddingTypeTablet ? paddingTablet : paddingTopTablet;
				}

				if ( 'mobile' === paddingViewType ) {
					value = 'linked' === paddingTypeMobile ? paddingMobile : paddingTopMobile;
				}
			}

			if ( 'right' == type ) {
				if ( 'desktop' === paddingViewType ) {
					value = 'linked' === paddingType ? padding : paddingRight;
				}

				if ( 'tablet' === paddingViewType ) {
					value = 'linked' === paddingTypeTablet ? paddingTablet : paddingRightTablet;
				}

				if ( 'mobile' === paddingViewType ) {
					value = 'linked' === paddingTypeMobile ? paddingMobile : paddingRightMobile;
				}
			}

			if ( 'bottom' == type ) {
				if ( 'desktop' === paddingViewType ) {
					value = 'linked' === paddingType ? padding : paddingBottom;
				}

				if ( 'tablet' === paddingViewType ) {
					value = 'linked' === paddingTypeTablet ? paddingTablet : paddingBottomTablet;
				}

				if ( 'mobile' === paddingViewType ) {
					value = 'linked' === paddingTypeMobile ? paddingMobile : paddingBottomMobile;
				}
			}

			if ( 'left' == type ) {
				if ( 'desktop' === paddingViewType ) {
					value = 'linked' === paddingType ? padding : paddingLeft;
				}

				if ( 'tablet' === paddingViewType ) {
					value = 'linked' === paddingTypeTablet ? paddingTablet : paddingLeftTablet;
				}

				if ( 'mobile' === paddingViewType ) {
					value = 'linked' === paddingTypeMobile ? paddingMobile : paddingLeftMobile;
				}
			}

			return value;
		};

		const desktopPaddingType = {
			top: 'paddingTop',
			right: 'paddingRight',
			bottom: 'paddingBottom',
			left: 'paddingLeft'
		};

		const tabletPaddingType = {
			top: 'paddingTopTablet',
			right: 'paddingRightTablet',
			bottom: 'paddingBottomTablet',
			left: 'paddingLeftTablet'
		};

		const mobilePaddingType = {
			top: 'paddingTopMobile',
			right: 'paddingRightMobile',
			bottom: 'paddingBottomMobile',
			left: 'paddingLeftMobile'
		};

		const changePadding = ( type, value ) => {
			if ( 'desktop' === paddingViewType ) {
				if ( 'linked' === paddingType ) {
					props.setAttributes({ padding: value });
				} else {
					props.setAttributes({ [desktopPaddingType[type]]: value });
				}
			}

			if ( 'tablet' === paddingViewType ) {
				if ( 'linked' === paddingTypeTablet ) {
					props.setAttributes({ paddingTablet: value });
				} else {
					props.setAttributes({ [tabletPaddingType[type]]: value });
				}
			}

			if ( 'mobile' === paddingViewType ) {
				if ( 'linked' === paddingTypeMobile ) {
					props.setAttributes({ paddingMobile: value });
				} else {
					props.setAttributes({ [mobilePaddingType[type]]: value });
				}
			}
		};

		const changePaddingType = value => {
			if ( 'desktop' === paddingViewType ) {
				props.setAttributes({ paddingType: value });
			}
			if ( 'tablet' === paddingViewType ) {
				props.setAttributes({ paddingTypeTablet: value });
			}
			if ( 'mobile' === paddingViewType ) {
				props.setAttributes({ paddingTypeMobile: value });
			}
		};

		let getPaddingType = () => {
			let value;

			if ( 'desktop' === paddingViewType ) {
				value = paddingType;
			}
			if ( 'tablet' === paddingViewType ) {
				value = paddingTypeTablet;
			}
			if ( 'mobile' === paddingViewType ) {
				value = paddingTypeMobile;
			}

			return value;
		};

		getPaddingType = getPaddingType();

		const getMargin = type => {
			let value;

			if ( 'top' == type ) {
				if ( 'desktop' === marginViewType ) {
					value = 'linked' === marginType ? margin : marginTop;
				}

				if ( 'tablet' === marginViewType ) {
					value = 'linked' === marginTypeTablet ? marginTablet : marginTopTablet;
				}

				if ( 'mobile' === marginViewType ) {
					value = 'linked' === marginTypeMobile ? marginMobile : marginTopMobile;
				}
			}

			if ( 'bottom' == type ) {
				if ( 'desktop' === marginViewType ) {
					value = 'linked' === marginType ? margin : marginBottom;
				}

				if ( 'tablet' === marginViewType ) {
					value = 'linked' === marginTypeTablet ? marginTablet : marginBottomTablet;
				}

				if ( 'mobile' === marginViewType ) {
					value = 'linked' === marginTypeMobile ? marginMobile : marginBottomMobile;
				}
			}

			return value;
		};

		const desktopMarginType = {
			top: 'marginTop',
			bottom: 'marginBottom'
		};

		const tabletMarginType = {
			top: 'marginTopTablet',
			bottom: 'marginBottomTablet'
		};

		const mobileMarginType = {
			top: 'marginTopMobile',
			bottom: 'marginBottomMobile'
		};

		const changeMargin = ( type, value ) => {
			if ( 'desktop' === marginViewType ) {
				if ( 'linked' === marginType ) {
					props.setAttributes({ margin: value });
				} else {
					props.setAttributes({ [desktopMarginType[type]]: value });
				}
			}

			if ( 'tablet' === marginViewType ) {
				if ( 'linked' === marginTypeTablet ) {
					props.setAttributes({ marginTablet: value });
				} else {
					props.setAttributes({ [tabletMarginType[type]]: value });
				}
			}

			if ( 'mobile' === marginViewType ) {
				if ( 'linked' === marginTypeMobile ) {
					props.setAttributes({ marginMobile: value });
				} else {
					props.setAttributes({ [mobileMarginType[type]]: value });
				}
			}
		};

		const changeMarginType = value => {
			if ( 'desktop' === marginViewType ) {
				props.setAttributes({ marginType: value });
			}
			if ( 'tablet' === marginViewType ) {
				props.setAttributes({ marginTypeTablet: value });
			}
			if ( 'mobile' === marginViewType ) {
				props.setAttributes({ marginTypeMobile: value });
			}
		};

		let getMarginType = () => {
			let value;

			if ( 'desktop' === marginViewType ) {
				value = marginType;
			}
			if ( 'tablet' === marginViewType ) {
				value = marginTypeTablet;
			}
			if ( 'mobile' === marginViewType ) {
				value = marginTypeMobile;
			}

			return value;
		};

		getMarginType = getMarginType();

		let fontSizeStyle, stylesheet, textShadowStyle;

		if ( isDesktop ) {
			fontSizeStyle = {
				fontSize: `${ fontSize }px`
			};

			stylesheet = {
				textAlign: align,
				paddingTop: 'linked' === paddingType ? `${ padding }px` : `${ paddingTop }px`,
				paddingRight: 'linked' === paddingType ? `${ padding }px` : `${ paddingRight }px`,
				paddingBottom: 'linked' === paddingType ? `${ padding }px` : `${ paddingBottom }px`,
				paddingLeft: 'linked' === paddingType ? `${ padding }px` : `${ paddingLeft }px`,
				marginTop: 'linked' === marginType ? `${ margin }px` : `${ marginTop }px`,
				marginBottom: 'linked' === marginType ? `${ margin }px` : `${ marginBottom }px`
			};
		}

		if ( isTablet ) {
			fontSizeStyle = {
				fontSize: `${ fontSizeTablet }px`
			};

			stylesheet = {
				textAlign: alignTablet,
				paddingTop: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingTopTablet }px`,
				paddingRight: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingRightTablet }px`,
				paddingBottom: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingBottomTablet }px`,
				paddingLeft: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingLeftTablet }px`,
				marginTop: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginTopTablet }px`,
				marginBottom: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginBottomTablet }px`
			};
		}

		if ( isMobile ) {
			fontSizeStyle = {
				fontSize: `${ fontSizeMobile }px`
			};

			stylesheet = {
				textAlign: alignMobile,
				paddingTop: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingTopMobile }px`,
				paddingRight: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingRightMobile }px`,
				paddingBottom: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingBottomMobile }px`,
				paddingLeft: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingLeftMobile }px`,
				marginTop: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginTopMobile }px`,
				marginBottom: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginBottomMobile }px`
			};
		}

		if ( textShadow ) {
			textShadowStyle = {
				textShadow: `${ textShadowHorizontal }px ${ textShadowVertical }px ${ textShadowBlur }px ${  hexToRgba( ( textShadowColor ? textShadowColor : '#000000' ), textShadowColorOpacity ) }`
			};
		}

		const style = {
			color: headingColor,
			...fontSizeStyle,
			fontFamily: fontFamily ? fontFamily : 'inherit',
			fontWeight: 'regular' === fontVariant ? 'normal' : fontVariant,
			fontStyle: fontStyle,
			textTransform: textTransform,
			lineHeight: lineHeight && `${ lineHeight }px`,
			letterSpacing: letterSpacing && `${ letterSpacing }px`,
			...stylesheet,
			...textShadowStyle
		};

		return (
			<Fragment>
				<style>
					{ `.${ id } mark {
						color: ${ highlightColor };
						background: ${ highlightBackground };
					}` }
				</style>

				{ fontFamily && (
					<GoogleFontLoader fonts={ [ {
						font: fontFamily,
						weights: fontVariant && [ `${fontVariant + ( 'italic' === fontStyle ? ':i' : '' ) }` ]
					} ] } />
				) }

				<BlockControls>
					<DropdownMenu
						icon={ getTagIcon( tag ) }
						label={ __( 'Select tag' ) }
						className="components-toolbar"
						controls={ [
							{
								title: __( 'Heading 1' ),
								icon: getTagIcon( 'h1' ),
								onClick: () => changeTag( 'h1' )
							},
							{
								title: __( 'Heading 2' ),
								icon: getTagIcon( 'h2' ),
								onClick: () => changeTag( 'h2' )
							},
							{
								title: __( 'Heading 3' ),
								icon: getTagIcon( 'h3' ),
								onClick: () => changeTag( 'h3' )
							},
							{
								title: __( 'Heading 4' ),
								icon: getTagIcon( 'h4' ),
								onClick: () => changeTag( 'h4' )
							},
							{
								title: __( 'Heading 5' ),
								icon: getTagIcon( 'h5' ),
								onClick: () => changeTag( 'h5' )
							},
							{
								title: __( 'Heading 6' ),
								icon: getTagIcon( 'h6' ),
								onClick: () => changeTag( 'h6' )
							},
							{
								title: __( 'Division' ),
								icon: getTagIcon( 'div' ),
								onClick: () => changeTag( 'div' )
							},
							{
								title: __( 'Paragraph' ),
								icon: getTagIcon( 'p' ),
								onClick: () => changeTag( 'p' )
							},
							{
								title: __( 'Span Tag' ),
								icon: getTagIcon( 'span' ),
								onClick: () => changeTag( 'span' )
							}
						] }
					/>

					<Toolbar
						className="wp-themesiel-blocks-advanced-heading-components-toolbar"
					>
						<Dropdown
							contentClassName="wp-themesiel-blocks-advanced-heading-popover-content"
							position="bottom center"
							renderToggle={ ({ isOpen, onToggle }) => (
								<IconButton
									className="components-dropdown-menu__toggle"
									icon={ 'editor-textcolor' }
									onClick={ onToggle }
									aria-haspopup="true"
									aria-expanded={ isOpen }
									label={ __( 'Typography Settings' ) }
									tooltip={ __( 'Typography Settings' ) }
								>
									<span className="components-dropdown-menu__indicator" />
								</IconButton>
							) }
							renderContent={ () => (
								<Fragment>
									<GoogleFontsControl
										label={ __( 'Font Family' ) }
										value={ fontFamily }
										onChangeFontFamily={ changeFontFamily }
										isSelect={ true }
										valueVariant={ fontVariant }
										onChangeFontVariant={ changeFontVariant }
										valueStyle={ fontStyle }
										onChangeFontStyle={ changeFontStyle }
										valueTransform={ textTransform }
										onChangeTextTransform={ changeTextTransform }
									/>

									<RangeControl
										label={ __( 'Line Height' ) }
										value={ lineHeight }
										onChange={ changeLineHeight }
										min={ 0 }
										max={ 200 }
									/>

									<RangeControl
										label={ __( 'Letter Spacing' ) }
										value={ letterSpacing }
										onChange={ changeLetterSpacing }
										min={ -50 }
										max={ 100 }
									/>
								</Fragment>
							) }
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<PanelBody className="wp-block-themeisle-blocks-advanced-heading-header-panel">
						<Button
							className={ classnames(
								'header-tab',
								{ 'is-selected': 'style' === tab }
							) }
							onClick={ () => setState({ tab: 'style' }) }
						>
							<span
							>
								<Dashicon icon="admin-customizer"/>
								{ __( 'Style' ) }
							</span>
						</Button>

						<Button
							className={ classnames(
								'header-tab',
								{ 'is-selected': 'advanced' === tab }
							) }
							onClick={ () => setState({ tab: 'advanced' }) }
						>
							<span
							>
								<Dashicon icon="admin-generic"/>
								{ __( 'Advanced' ) }
							</span>
						</Button>
					</PanelBody>

					{ 'style' === tab && (

						<Fragment>
							<PanelBody
								title={ __( 'General Settings' ) }
							>
								<Fragment>
									<p>{ __( 'Heading Color' ) }</p>

									<ColorPalette
										label={ 'Heading Color' }
										value={ headingColor }
										onChange={ changeHeadingColor }
									/>
								</Fragment>

								<ResponsiveControl
									label={ 'Font Size' }
									view={ fontSizeViewType }
									changeViewType={ changeFontSizeViewType }
								>
									<RangeControl
										value={ getFontSize || '' }
										onChange={ changeFontSize }
										min={ 1 }
										max={ 500 }
									/>
								</ResponsiveControl>

								<ResponsiveControl
									label={ 'Alignment' }
									view={ alignmentViewType }
									changeViewType={ changeAlignmentViewType }
								>
									<AlignmentToolbar
										value={ getAlignment }
										onChange={ changeAlignment }
									/>
								</ResponsiveControl>
							</PanelBody>

							<PanelBody
								title={ __( 'Typography Settings' ) }
								initialOpen={ false }
							>
								<GoogleFontsControl
									label={ __( 'Font Family' ) }
									value={ fontFamily }
									onChangeFontFamily={ changeFontFamily }
									valueVariant={ fontVariant }
									onChangeFontVariant={ changeFontVariant }
									valueStyle={ fontStyle }
									onChangeFontStyle={ changeFontStyle }
									valueTransform={ textTransform }
									onChangeTextTransform={ changeTextTransform }
								/>

								<RangeControl
									label={ __( 'Line Height' ) }
									value={ lineHeight }
									onChange={ changeLineHeight }
									min={ 0 }
									max={ 200 }
								/>

								<RangeControl
									label={ __( 'Letter Spacing' ) }
									value={ letterSpacing }
									onChange={ changeLetterSpacing }
									min={ -50 }
									max={ 100 }
								/>

								<ToggleControl
									label={ 'Shadow Properties' }
									checked={ textShadow }
									onChange={ changeTextShadow }
								/>

								{ textShadow && (
									<Fragment>

										<Fragment>
											<p>{ __( 'Color' ) }</p>

											<ColorPalette
												label={ __( 'Color' ) }
												value={ textShadowColor }
												onChange={ changeTextShadowColor }
											/>
										</Fragment>

										<ControlPanelControl
											label={ 'Shadow Properties' }
										>
											<RangeControl
												label={ __( 'Opacity' ) }
												value={ textShadowColorOpacity }
												onChange={ changeTextShadowColorOpacity }
												min={ 0 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Blur' ) }
												value={ textShadowBlur }
												onChange={ changeTextShadowBlur }
												min={ 0 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Horizontal' ) }
												value={ textShadowHorizontal }
												onChange={ changeTextShadowHorizontal }
												min={ -100 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Vertical' ) }
												value={ textShadowVertical }
												onChange={ changeTextShadowVertical }
												min={ -100 }
												max={ 100 }
											/>
										</ControlPanelControl>

									</Fragment>
								) }
							</PanelBody>
						</Fragment>

					) || 'advanced' === tab && (

						<Fragment>
							<PanelBody
								title={ __( 'Highlight Color' ) }
							>
								<Fragment>
									<p>{ __( 'Highlight Color' ) }</p>

									<ColorPalette
										label={ 'Highlight Color' }
										value={ highlightColor }
										onChange={ changeHighlightColor }
									/>
								</Fragment>

								<Fragment>
									<p>{ __( 'Highlight Background' ) }</p>

									<ColorPalette
										label={ 'Highlight Background' }
										value={ highlightBackground }
										onChange={ changeHighlightBackground }
									/>
								</Fragment>
							</PanelBody>

							<PanelBody
								title={ __( 'Padding & Margin' ) }
								initialOpen={ false }
							>
								<ResponsiveControl
									label={ 'Padding' }
									view={ paddingViewType }
									changeViewType={ changePaddingViewType }
								>
									<SizingControl
										type={ getPaddingType }
										min={ 0 }
										max={ 500 }
										changeType={ changePaddingType }
										onChange={ changePadding }
										options={ [
											{
												label: __( 'Top' ),
												type: 'top',
												value: getPadding( 'top' )
											},
											{
												label: __( 'Right' ),
												type: 'right',
												value: getPadding( 'right' )
											},
											{
												label: __( 'Bottom' ),
												type: 'bottom',
												value: getPadding( 'bottom' )
											},
											{
												label: __( 'Left' ),
												type: 'left',
												value: getPadding( 'left' )
											}
										] }
									/>
								</ResponsiveControl>

								<ResponsiveControl
									label={ 'Margin' }
									view={ marginViewType }
									changeViewType={ changeMarginViewType }
								>
									<SizingControl
										type={ getMarginType }
										min={ -500 }
										max={ 500 }
										changeType={ changeMarginType }
										onChange={ changeMargin }
										options={ [
											{
												label: __( 'Top' ),
												type: 'top',
												value: getMargin( 'top' )
											},
											{
												label: __( 'Right' ),
												disabled: true
											},
											{
												label: __( 'Bottom' ),
												type: 'bottom',
												value: getMargin( 'bottom' )
											},
											{
												label: __( 'Left' ),
												disabled: true
											}
										] }
									/>
								</ResponsiveControl>
							</PanelBody>
						</Fragment>
					) }
				</InspectorControls>

				<RichText
					identifier="content"
					className={ classnames(
						id,
						props.className
					) }
					value={ content }
					placeholder={ __( 'Write heading…' ) }
					tagName={ tag }
					formattingControls={ [ 'bold', 'italic', 'link', 'strikethrough', 'mark' ] }
					onMerge={ props.mergeBlocks }
					unstableOnSplit={
						props.insertBlocksAfter ?
							( before, after, ...blocks ) => {
								props.setAttributes({ content: before });
								props.insertBlocksAfter([
									...blocks,
									createBlock( 'core/paragraph', { content: after })
								]);
							} :
							undefined
					}
					onRemove={ () => props.onReplace([]) }
					style={ style }
					onChange={ changeContent }
				/>
			</Fragment>
		);
	}),

	save: props => {

		const {
			id,
			content,
			tag,
			headingColor,
			fontFamily,
			fontVariant,
			fontStyle,
			textTransform,
			lineHeight,
			letterSpacing,
			textShadow,
			textShadowColor,
			textShadowColorOpacity,
			textShadowBlur,
			textShadowHorizontal,
			textShadowVertical
		} = props.attributes;

		let textShadowStyle;

		if ( textShadow ) {
			textShadowStyle = {
				textShadow: `${ textShadowHorizontal }px ${ textShadowVertical }px ${ textShadowBlur }px ${  hexToRgba( ( textShadowColor ? textShadowColor : '#000000' ), textShadowColorOpacity ) }`
			};
		}

		const style = {
			color: headingColor,
			fontFamily: fontFamily,
			fontWeight: 'regular' === fontVariant ? 'normal' : fontVariant,
			fontStyle: fontStyle,
			textTransform: textTransform,
			lineHeight: lineHeight && `${ lineHeight }px`,
			letterSpacing: letterSpacing && `${ letterSpacing }px`,
			...textShadowStyle
		};

		return (
			<RichText.Content
				tagName={ tag }
				value={ content }
				id={ id }
				className={ classnames(
					id,
					props.className
				) }
				style={ style }
			/>
		);
	}
});
