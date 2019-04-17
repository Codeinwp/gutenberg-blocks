/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies
 */
const { times } = lodash;

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	BaseControl,
	Button,
	ButtonGroup,
	Dashicon,
	Icon,
	IconButton,
	PanelBody,
	Tooltip,
	ToggleControl,
	RangeControl,
	ResizableBox,
	SelectControl
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const {
	withDispatch,
	withSelect
} = wp.data;

const {
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	MediaPlaceholder
} = wp.editor;

const { Fragment } = wp.element;

const { withViewportMatch } = wp.viewport;

/**
 * Internal dependencies
 */
import {
	columnsIcon,
	topIcon,
	middleIcon,
	bottomIcon
} from '../../helpers/icons.js';

import layouts from './layouts.js';

import LayoutControl from './layout-control/index.js';

import SizeControl from '../../components/size-control/index.js';

import ResponsiveControl from '../../components/responsive-control/index.js';

import BackgroundControl from './background-control/index.js';

import ControlPanelControl from '../../components/control-panel-control/index.js';

import Separators from './separators/index.js';

import Inboarding from './inboarding/index.js';

import deprecated from './deprecated.js';

registerBlockType( 'themeisle-blocks/advanced-columns', {
	title: __( 'Section' ),
	description: __( 'Add a Section block that displays content in multiple columns, then add whatever content blocks you’d like.' ),
	icon: columnsIcon,
	category: 'themeisle-blocks',
	keywords: [
		'advanced columns',
		'layout',
		'grid'
	],
	attributes: {
		id: {
			type: 'string'
		},
		columns: {
			type: 'number'
		},
		layout: {
			type: 'string'
		},
		layoutTablet: {
			type: 'string',
			default: 'equal'
		},
		layoutMobile: {
			type: 'string',
			default: 'equal'
		},
		columnsGap: {
			type: 'string',
			default: 'default'
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
			default: 20
		},
		paddingTablet: {
			type: 'number',
			default: 20
		},
		paddingMobile: {
			type: 'number',
			default: 20
		},
		paddingTop: {
			type: 'number',
			default: 20
		},
		paddingTopTablet: {
			type: 'number',
			default: 20
		},
		paddingTopMobile: {
			type: 'number',
			default: 20
		},
		paddingRight: {
			type: 'number',
			default: 20
		},
		paddingRightTablet: {
			type: 'number',
			default: 20
		},
		paddingRightMobile: {
			type: 'number',
			default: 20
		},
		paddingBottom: {
			type: 'number',
			default: 20
		},
		paddingBottomTablet: {
			type: 'number',
			default: 20
		},
		paddingBottomMobile: {
			type: 'number',
			default: 20
		},
		paddingLeft: {
			type: 'number',
			default: 20
		},
		paddingLeftTablet: {
			type: 'number',
			default: 20
		},
		paddingLeftMobile: {
			type: 'number',
			default: 20
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
			default: 20
		},
		marginTablet: {
			type: 'number',
			default: 20
		},
		marginMobile: {
			type: 'number',
			default: 20
		},
		marginTop: {
			type: 'number',
			default: 20
		},
		marginTopTablet: {
			type: 'number',
			default: 20
		},
		marginTopMobile: {
			type: 'number',
			default: 20
		},
		marginBottom: {
			type: 'number',
			default: 20
		},
		marginBottomTablet: {
			type: 'number',
			default: 20
		},
		marginBottomMobile: {
			type: 'number',
			default: 20
		},
		columnsWidth: {
			type: 'number'
		},
		horizontalAlign: {
			type: 'string',
			default: 'unset'
		},
		columnsHeight: {
			type: 'string',
			default: 'auto'
		},
		columnsHeightCustom: {
			type: 'number'
		},
		columnsHeightCustomTablet: {
			type: 'number'
		},
		columnsHeightCustomMobile: {
			type: 'number'
		},
		verticalAlign: {
			type: 'string',
			default: 'unset'
		},
		backgroundType: {
			type: 'string',
			default: 'color'
		},
		backgroundColor: {
			type: 'string'
		},
		backgroundImageID: {
			type: 'number'
		},
		backgroundImageURL: {
			type: 'string'
		},
		backgroundAttachment: {
			type: 'string',
			default: 'scroll'
		},
		backgroundPosition: {
			type: 'string',
			default: 'top left'
		},
		backgroundRepeat: {
			type: 'string',
			default: 'repeat'
		},
		backgroundSize: {
			type: 'string',
			default: 'auto'
		},
		backgroundGradientFirstColor: {
			type: 'string',
			default: '#36d1dc'
		},
		backgroundGradientFirstLocation: {
			type: 'number',
			default: 0
		},
		backgroundGradientSecondColor: {
			type: 'string',
			default: '#5b86e5'
		},
		backgroundGradientSecondLocation: {
			type: 'number',
			default: 100
		},
		backgroundGradientType: {
			type: 'string',
			default: 'linear'
		},
		backgroundGradientAngle: {
			type: 'number',
			default: 90
		},
		backgroundGradientPosition: {
			type: 'string',
			default: 'center center'
		},
		backgroundOverlayOpacity: {
			type: 'number',
			default: 50
		},
		backgroundOverlayType: {
			type: 'string',
			default: 'color'
		},
		backgroundOverlayColor: {
			type: 'string'
		},
		backgroundOverlayImageID: {
			type: 'number'
		},
		backgroundOverlayImageURL: {
			type: 'string'
		},
		backgroundOverlayAttachment: {
			type: 'string',
			default: 'scroll'
		},
		backgroundOverlayPosition: {
			type: 'string',
			default: 'top left'
		},
		backgroundOverlayRepeat: {
			type: 'string',
			default: 'repeat'
		},
		backgroundOverlaySize: {
			type: 'string',
			default: 'auto'
		},
		backgroundOverlayGradientFirstColor: {
			type: 'string',
			default: '#36d1dc'
		},
		backgroundOverlayGradientFirstLocation: {
			type: 'number',
			default: 0
		},
		backgroundOverlayGradientSecondColor: {
			type: 'string',
			default: '#5b86e5'
		},
		backgroundOverlayGradientSecondLocation: {
			type: 'number',
			default: 100
		},
		backgroundOverlayGradientType: {
			type: 'string',
			default: 'linear'
		},
		backgroundOverlayGradientAngle: {
			type: 'number',
			default: 90
		},
		backgroundOverlayGradientPosition: {
			type: 'string',
			default: 'center center'
		},
		backgroundOverlayFilterBlur: {
			type: 'number',
			default: 0
		},
		backgroundOverlayFilterBrightness: {
			type: 'number',
			default: 10
		},
		backgroundOverlayFilterContrast: {
			type: 'number',
			default: 10
		},
		backgroundOverlayFilterGrayscale: {
			type: 'number',
			default: 0
		},
		backgroundOverlayFilterHue: {
			type: 'number',
			default: 0
		},
		backgroundOverlayFilterSaturate: {
			type: 'number',
			default: 10
		},
		backgroundOverlayBlend: {
			type: 'string',
			default: 'normal'
		},
		borderType: {
			type: 'string',
			default: 'linked'
		},
		border: {
			type: 'number',
			default: 0
		},
		borderTop: {
			type: 'number',
			default: 0
		},
		borderRight: {
			type: 'number',
			default: 0
		},
		borderBottom: {
			type: 'number',
			default: 0
		},
		borderLeft: {
			type: 'number',
			default: 0
		},
		borderColor: {
			type: 'string',
			default: '#000000'
		},
		borderRadiusType: {
			type: 'string',
			default: 'linked'
		},
		borderRadius: {
			type: 'number',
			default: 0
		},
		borderRadiusTop: {
			type: 'number',
			default: 0
		},
		borderRadiusRight: {
			type: 'number',
			default: 0
		},
		borderRadiusBottom: {
			type: 'number',
			default: 0
		},
		borderRadiusLeft: {
			type: 'number',
			default: 0
		},
		boxShadow: {
			type: 'boolean',
			default: false
		},
		boxShadowColor: {
			type: 'string',
			default: '#000000'
		},
		boxShadowColorOpacity: {
			type: 'number',
			default: 50
		},
		boxShadowBlur: {
			type: 'number',
			default: 5
		},
		boxShadowSpread: {
			type: 'number',
			default: 0
		},
		boxShadowHorizontal: {
			type: 'number',
			default: 0
		},
		boxShadowVertical: {
			type: 'number',
			default: 0
		},
		dividerTopType: {
			type: 'string',
			default: 'none'
		},
		dividerTopColor: {
			type: 'string',
			default: '#000000'
		},
		dividerTopWidth: {
			type: 'number',
			default: 100
		},
		dividerTopWidthTablet: {
			type: 'number',
			default: 100
		},
		dividerTopWidthMobile: {
			type: 'number',
			default: 100
		},
		dividerTopHeight: {
			type: 'number',
			default: 100
		},
		dividerTopHeightTablet: {
			type: 'number',
			default: 100
		},
		dividerTopHeightMobile: {
			type: 'number',
			default: 100
		},
		dividerTopInvert: {
			type: 'boolean',
			default: false
		},
		dividerBottomType: {
			type: 'string',
			default: 'none'
		},
		dividerBottomColor: {
			type: 'string',
			default: '#000000'
		},
		dividerBottomWidth: {
			type: 'number',
			default: 100
		},
		dividerBottomWidthTablet: {
			type: 'number',
			default: 100
		},
		dividerBottomWidthMobile: {
			type: 'number',
			default: 100
		},
		dividerBottomHeight: {
			type: 'number',
			default: 100
		},
		dividerBottomHeightTablet: {
			type: 'number',
			default: 100
		},
		dividerBottomHeightMobile: {
			type: 'number',
			default: 100
		},
		dividerBottomInvert: {
			type: 'boolean',
			default: false
		},
		hide: {
			type: 'boolean',
			default: false
		},
		hideTablet: {
			type: 'boolean',
			default: false
		},
		hideMobile: {
			type: 'boolean',
			default: false
		},
		columnsHTMLTag: {
			type: 'string',
			default: 'div'
		}
	},

	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},

	deprecated: deprecated,

	edit: compose([

		withDispatch( ( dispatch ) => {
			const { updateBlockAttributes } = dispatch( 'core/editor' );

			return {
				updateBlockAttributes
			};
		}),

		withSelect( ( select, props ) => {
			const { clientId } = props;
			const { getBlock } = select( 'core/editor' );
			const sectionBlock = getBlock( clientId );

			return {
				sectionBlock,
				props
			};
		}),

		withState({
			tab: 'layout',
			columnsViewType: 'desktop',
			paddingViewType: 'desktop',
			marginViewType: 'desktop',
			heightViewType: 'desktop',
			dividerViewType: 'top',
			dividerWidthViewType: 'desktop',
			dividerHeightViewType: 'desktop'
		}),

		withViewportMatch({
			isLarger: '>= large',
			isLarge: '<= large',
			isSmall: '>= small',
			isSmaller: '<= small'
		})

	])( ({
		tab,
		columnsViewType,
		paddingViewType,
		marginViewType,
		heightViewType,
		dividerViewType,
		dividerWidthViewType,
		dividerHeightViewType,
		setState,
		isLarger,
		isLarge,
		isSmall,
		isSmaller,
		props,
		sectionBlock,
		updateBlockAttributes
	}) => {
		const {
			id,
			columns,
			layout,
			layoutTablet,
			layoutMobile,
			columnsGap,
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
			marginBottomMobile,
			columnsWidth,
			columnsHeight,
			columnsHeightCustom,
			columnsHeightCustomTablet,
			columnsHeightCustomMobile,
			horizontalAlign,
			verticalAlign,
			backgroundType,
			backgroundColor,
			backgroundImageID,
			backgroundImageURL,
			backgroundAttachment,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundGradientFirstColor,
			backgroundGradientFirstLocation,
			backgroundGradientSecondColor,
			backgroundGradientSecondLocation,
			backgroundGradientType,
			backgroundGradientAngle,
			backgroundGradientPosition,
			backgroundOverlayOpacity,
			backgroundOverlayType,
			backgroundOverlayColor,
			backgroundOverlayImageID,
			backgroundOverlayImageURL,
			backgroundOverlayAttachment,
			backgroundOverlayPosition,
			backgroundOverlayRepeat,
			backgroundOverlaySize,
			backgroundOverlayGradientFirstColor,
			backgroundOverlayGradientFirstLocation,
			backgroundOverlayGradientSecondColor,
			backgroundOverlayGradientSecondLocation,
			backgroundOverlayGradientType,
			backgroundOverlayGradientAngle,
			backgroundOverlayGradientPosition,
			backgroundOverlayFilterBlur,
			backgroundOverlayFilterBrightness,
			backgroundOverlayFilterContrast,
			backgroundOverlayFilterGrayscale,
			backgroundOverlayFilterHue,
			backgroundOverlayFilterSaturate,
			backgroundOverlayBlend,
			borderType,
			border,
			borderTop,
			borderRight,
			borderBottom,
			borderLeft,
			borderColor,
			borderRadiusType,
			borderRadius,
			borderRadiusTop,
			borderRadiusRight,
			borderRadiusBottom,
			borderRadiusLeft,
			boxShadow,
			boxShadowColor,
			boxShadowColorOpacity,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowHorizontal,
			boxShadowVertical,
			dividerTopType,
			dividerTopColor,
			dividerTopWidth,
			dividerTopWidthTablet,
			dividerTopWidthMobile,
			dividerTopHeight,
			dividerTopHeightTablet,
			dividerTopHeightMobile,
			dividerTopInvert,
			dividerBottomType,
			dividerBottomColor,
			dividerBottomWidth,
			dividerBottomWidthTablet,
			dividerBottomWidthMobile,
			dividerBottomHeight,
			dividerBottomHeightTablet,
			dividerBottomHeightMobile,
			dividerBottomInvert,
			hide,
			hideTablet,
			hideMobile,
			columnsHTMLTag
		} = props.attributes;

		if ( id === undefined || id.substr( id.length - 8 ) !== props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-advanced-columns-${ props.clientId.substr( 0, 8 ) }`;
			props.setAttributes({ id: instanceId });
		}

		const isDesktop = ( isLarger && ! isLarge && isSmall && ! isSmaller );

		const isTablet = ( ! isLarger && ! isLarge && isSmall && ! isSmaller );

		const isMobile = ( ! isLarger && ! isLarge && ! isSmall && ! isSmaller );

		const Tag = columnsHTMLTag;

		let stylesheet, background, overlayBackground, borderStyle, borderRadiusStyle, boxShadowStyle;

		if ( isDesktop ) {
			stylesheet = {
				paddingRight: 'linked' === paddingType ? `${ padding }px` : `${ paddingRight }px`,
				paddingLeft: 'linked' === paddingType ? `${ padding }px` : `${ paddingLeft }px`,
				marginTop: 'linked' === marginType ? `${ margin }px` : `${ marginTop }px`,
				marginBottom: 'linked' === marginType ? `${ margin }px` : `${ marginBottom }px`,
				minHeight: 'custom' === columnsHeight ? `${ columnsHeightCustom }px` : columnsHeight
			};
		}

		if ( isTablet ) {
			stylesheet = {
				paddingRight: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingRightTablet }px`,
				paddingLeft: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingLeftTablet }px`,
				marginTop: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginTopTablet }px`,
				marginBottom: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginBottomTablet }px`,
				minHeight: 'custom' === columnsHeight ? `${ columnsHeightCustomTablet }px` : columnsHeight
			};
		}

		if ( isMobile ) {
			stylesheet = {
				paddingRight: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingRightMobile }px`,
				paddingLeft: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingLeftMobile }px`,
				marginTop: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginTopMobile }px`,
				marginBottom: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginBottomMobile }px`,
				minHeight: 'custom' === columnsHeight ? `${ columnsHeightCustomMobile }px` : columnsHeight
			};
		}

		if ( 'color' === backgroundType ) {
			background = {
				background: backgroundColor
			};
		}

		if ( 'image' === backgroundType ) {
			background = {
				backgroundImage: `url( '${ backgroundImageURL }' )`,
				backgroundAttachment,
				backgroundPosition,
				backgroundRepeat,
				backgroundSize
			};
		}

		if ( 'gradient' === backgroundType ) {
			let direction;

			if ( 'linear' === backgroundGradientType ) {
				direction = `${ backgroundGradientAngle }deg`;
			} else {
				direction = `at ${ backgroundGradientPosition }`;
			}

			if ( backgroundGradientFirstColor || backgroundGradientSecondColor ) {
				background = {
					background: `${ backgroundGradientType }-gradient( ${ direction }, ${ backgroundGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundGradientFirstLocation }%, ${ backgroundGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundGradientSecondLocation }% )`
				};
			}
		}

		if ( 'linked' === borderType ) {
			borderStyle = {
				borderWidth: `${ border }px`,
				borderStyle: 'solid',
				borderColor: borderColor
			};
		}

		if ( 'unlinked' === borderType ) {
			borderStyle = {
				borderTopWidth: `${ borderTop }px`,
				borderRightWidth: `${ borderRight }px`,
				borderBottomWidth: `${ borderBottom }px`,
				borderLeftWidth: `${ borderLeft }px`,
				borderStyle: 'solid',
				borderColor: borderColor
			};
		}

		if ( 'linked' === borderRadiusType ) {
			borderRadiusStyle = {
				borderRadius: `${ borderRadius }px`
			};
		}

		if ( 'unlinked' === borderRadiusType ) {
			borderRadiusStyle = {
				borderTopLeftRadius: `${ borderRadiusTop }px`,
				borderTopRightRadius: `${ borderRadiusRight }px`,
				borderBottomRightRadius: `${ borderRadiusBottom }px`,
				borderBottomLeftRadius: `${ borderRadiusLeft }px`
			};
		}

		if ( true === boxShadow ) {
			boxShadowStyle = {
				boxShadow: `${ boxShadowHorizontal }px ${ boxShadowVertical }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${  hexToRgba( ( boxShadowColor ? boxShadowColor : '#000000' ), boxShadowColorOpacity ) }`
			};
		}

		const style = {
			...stylesheet,
			...background,
			...borderStyle,
			...borderRadiusStyle,
			...boxShadowStyle,
			alignItems: horizontalAlign,
			justifyContent: verticalAlign
		};

		if ( 'color' === backgroundOverlayType ) {
			overlayBackground = {
				background: backgroundOverlayColor,
				opacity: backgroundOverlayOpacity / 100
			};
		}

		if ( 'image' === backgroundOverlayType ) {
			overlayBackground = {
				backgroundImage: `url( '${ backgroundOverlayImageURL }' )`,
				backgroundAttachment: backgroundOverlayAttachment,
				backgroundPosition: backgroundOverlayPosition,
				backgroundRepeat: backgroundOverlayRepeat,
				backgroundSize: backgroundOverlaySize,
				opacity: backgroundOverlayOpacity / 100
			};
		}

		if ( 'gradient' === backgroundOverlayType ) {
			let direction;

			if ( 'linear' === backgroundOverlayGradientType ) {
				direction = `${ backgroundOverlayGradientAngle }deg`;
			} else {
				direction = `at ${ backgroundOverlayGradientPosition }`;
			}

			overlayBackground = {
				background: `${ backgroundOverlayGradientType }-gradient( ${ direction }, ${ backgroundOverlayGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundOverlayGradientFirstLocation }%, ${ backgroundOverlayGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundOverlayGradientSecondLocation }% )`,
				opacity: backgroundOverlayOpacity / 100
			};
		}

		const overlayStyle = {
			...overlayBackground,
			mixBlendMode: backgroundOverlayBlend,
			filter: `blur( ${ backgroundOverlayFilterBlur / 10 }px ) brightness( ${ backgroundOverlayFilterBrightness / 10 } ) contrast( ${ backgroundOverlayFilterContrast / 10 } ) grayscale( ${ backgroundOverlayFilterGrayscale / 100 } ) hue-rotate( ${ backgroundOverlayFilterHue }deg ) saturate( ${ backgroundOverlayFilterSaturate / 10 } )`
		};

		let innerStyle = {};

		if ( columnsWidth ) {
			innerStyle = {
				maxWidth: columnsWidth + 'px'
			};
		}

		const classes = classnames(
			props.className,
			`has-${ columns }-columns`,
			`has-desktop-${ layout }-layout`,
			`has-tablet-${ layoutTablet }-layout`,
			`has-mobile-${ layoutMobile }-layout`,
			`has-${ columnsGap }-gap`
		);

		const ALLOWED_BLOCKS = [ 'themeisle-blocks/advanced-columns' ];

		const changeColumnsViewType = value => {
			setState({ columnsViewType: value });
		};

		const changePaddingViewType = value => {
			setState({ paddingViewType: value });
		};

		const changeMarginViewType = value => {
			setState({ marginViewType: value });
		};

		const changeHeightViewType = value => {
			setState({ heightViewType: value });
		};

		const changeDividerViewType = value => {
			setState({ dividerViewType: value });
		};

		const changeDividerWidthViewType = value => {
			setState({ dividerWidthViewType: value });
		};

		const changeDividerHeightViewType = value => {
			setState({ dividerHeightViewType: value });
		};

		const updateColumnsWidth = ( columns, layout ) => {
			( sectionBlock.innerBlocks ).map( ( innerBlock, i ) => {
				updateBlockAttributes( innerBlock.clientId, {
					columnWidth: parseFloat( layouts[columns][layout][i])
				});
			});
		};

		const setupColumns = ( columns, layout ) => {
			if ( 1 >= columns ) {
				props.setAttributes({
					columns,
					layout,
					layoutTablet: 'equal',
					layoutMobile: 'equal'
				});
			} else {
				props.setAttributes({
					columns,
					layout,
					layoutTablet: 'equal',
					layoutMobile: 'collapsedRows'
				});
			}
		};

		const changeColumns = value => {
			if ( 6 >= value ) {
				props.setAttributes({
					columns: value,
					layout: 'equal',
					layoutTablet: 'equal',
					layoutMobile: 'collapsedRows'
				});
				updateColumnsWidth( value, 'equal' );
			}

			if ( 6 < value ) {
				props.setAttributes({
					columns: 6,
					layout: 'equal',
					layoutTablet: 'equal',
					layoutMobile: 'collapsedRows'
				});
				updateColumnsWidth( 6, 'equal' );
			}

			if ( 1 >= value ) {
				props.setAttributes({
					columns: 1,
					layout: 'equal',
					layoutTablet: 'equal',
					layoutMobile: 'equal'
				});
				updateColumnsWidth( 1, 'equal' );
			}
		};

		const changeLayout = value => {
			if ( 'desktop' === columnsViewType ) {
				props.setAttributes({ layout: value });
				updateColumnsWidth( columns, value );
			}
			if ( 'tablet' === columnsViewType ) {
				props.setAttributes({ layoutTablet: value });
			}
			if ( 'mobile' === columnsViewType ) {
				props.setAttributes({ layoutMobile: value });
			}
		};

		const changeColumnsGap = value => {
			props.setAttributes({ columnsGap: value });
		};

		const getPadding = type => {
			let value;

			if ( 'top' == type ) {
				if ( isDesktop ) {
					value = 'linked' === paddingType ? padding : paddingTop;
				}

				if ( isTablet ) {
					value = 'linked' === paddingTypeTablet ? paddingTablet : paddingTopTablet;
				}

				if ( isMobile ) {
					value = 'linked' === paddingTypeMobile ? paddingMobile : paddingTopMobile;
				}
			}

			if ( 'bottom' == type ) {
				if ( isDesktop ) {
					value = 'linked' === paddingType ? padding : paddingBottom;
				}

				if ( isTablet ) {
					value = 'linked' === paddingTypeTablet ? paddingTablet : paddingBottomTablet;
				}

				if ( isMobile ) {
					value = 'linked' === paddingTypeMobile ? paddingMobile : paddingBottomMobile;
				}
			}

			return value;
		};

		const setPadding = ( type, delta ) => {
			if ( 'top' == type ) {
				if ( isDesktop ) {
					props.setAttributes({
						paddingType: 'unlinked',
						paddingTop: parseInt( ( 'linked' === paddingType ? padding : paddingTop ) + delta.height, 10 )
					});
				}

				if ( isTablet ) {
					props.setAttributes({
						paddingTypeTablet: 'unlinked',
						paddingTopTablet: parseInt( ( 'linked' === paddingTypeTablet ? paddingTablet : paddingTopTablet ) + delta.height, 10 )
					});
				}

				if ( isMobile ) {
					props.setAttributes({
						paddingTypeMobile: 'unlinked',
						paddingTopMobile: parseInt( ( 'linked' === paddingTypeMobile ? paddingMobile : paddingTopMobile ) + delta.height, 10 )
					});
				}
			}

			if ( 'bottom' == type ) {
				if ( isDesktop ) {
					props.setAttributes({
						paddingType: 'unlinked',
						paddingBottom: parseInt( ( 'linked' === paddingType ? padding : paddingBottom ) + delta.height, 10 )
					});
				}

				if ( isTablet ) {
					props.setAttributes({
						paddingTypeTablet: 'unlinked',
						paddingBottomTablet: parseInt( ( 'linked' === paddingTypeTablet ? paddingTablet : paddingBottomTablet ) + delta.height, 10 )
					});
				}

				if ( isMobile ) {
					props.setAttributes({
						paddingTypeMobile: 'unlinked',
						paddingBottomMobile: parseInt( ( 'linked' === paddingTypeMobile ? paddingMobile : paddingBottomMobile ) + delta.height, 10 )
					});
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

		const changePadding = value => {
			if ( 'desktop' === paddingViewType ) {
				props.setAttributes({ padding: value });
			}
			if ( 'tablet' === paddingViewType ) {
				props.setAttributes({ paddingTablet: value });
			}
			if ( 'mobile' === paddingViewType ) {
				props.setAttributes({ paddingMobile: value });
			}
		};

		const changePaddingTop = value => {
			if ( 'desktop' === paddingViewType ) {
				props.setAttributes({ paddingTop: value });
			}
			if ( 'tablet' === paddingViewType ) {
				props.setAttributes({ paddingTopTablet: value });
			}
			if ( 'mobile' === paddingViewType ) {
				props.setAttributes({ paddingTopMobile: value });
			}
		};

		const changePaddingRight = value => {
			if ( 'desktop' === paddingViewType ) {
				props.setAttributes({ paddingRight: value });
			}
			if ( 'tablet' === paddingViewType ) {
				props.setAttributes({ paddingRightTablet: value });
			}
			if ( 'mobile' === paddingViewType ) {
				props.setAttributes({ paddingRightMobile: value });
			}
		};

		const changePaddingBottom = value => {
			if ( 'desktop' === paddingViewType ) {
				props.setAttributes({ paddingBottom: value });
			}
			if ( 'tablet' === paddingViewType ) {
				props.setAttributes({ paddingBottomTablet: value });
			}
			if ( 'mobile' === paddingViewType ) {
				props.setAttributes({ paddingBottomMobile: value });
			}
		};

		const changePaddingLeft = value => {
			if ( 'desktop' === paddingViewType ) {
				props.setAttributes({ paddingLeft: value });
			}
			if ( 'tablet' === paddingViewType ) {
				props.setAttributes({ paddingLeftTablet: value });
			}
			if ( 'mobile' === paddingViewType ) {
				props.setAttributes({ paddingLeftMobile: value });
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

		const changeMargin = value => {
			if ( 'desktop' === marginViewType ) {
				props.setAttributes({ margin: value });
			}
			if ( 'tablet' === marginViewType ) {
				props.setAttributes({ marginTablet: value });
			}
			if ( 'mobile' === marginViewType ) {
				props.setAttributes({ marginMobile: value });
			}
		};

		const changeMarginTop = value => {
			if ( 'desktop' === marginViewType ) {
				props.setAttributes({ marginTop: value });
			}
			if ( 'tablet' === marginViewType ) {
				props.setAttributes({ marginTopTablet: value });
			}
			if ( 'mobile' === marginViewType ) {
				props.setAttributes({ marginTopMobile: value });
			}
		};

		const changeMarginBottom = value => {
			if ( 'desktop' === marginViewType ) {
				props.setAttributes({ marginBottom: value });
			}
			if ( 'tablet' === marginViewType ) {
				props.setAttributes({ marginBottomTablet: value });
			}
			if ( 'mobile' === marginViewType ) {
				props.setAttributes({ marginBottomMobile: value });
			}
		};

		const changeColumnsWidth = value => {
			if ( ( 0 <= value && 1200 >= value ) || undefined === value ) {
				props.setAttributes({ columnsWidth: value });
			}
		};

		const changeColumnsHeight = value => {
			props.setAttributes({ columnsHeight: value });
		};

		let getColumnsHeightCustom = () => {
			let value;

			if ( 'desktop' === heightViewType ) {
				value = columnsHeightCustom;
			}

			if ( 'tablet' === heightViewType ) {
				value = columnsHeightCustomTablet;
			}

			if ( 'mobile' === heightViewType ) {
				value = columnsHeightCustomMobile;
			}

			return value;
		};

		getColumnsHeightCustom = getColumnsHeightCustom();

		const changeColumnsHeightCustom = value => {
			if ( 'desktop' === heightViewType ) {
				props.setAttributes({ columnsHeightCustom: value });
			}
			if ( 'tablet' === heightViewType ) {
				props.setAttributes({ columnsHeightCustomTablet: value });
			}
			if ( 'mobile' === heightViewType ) {
				props.setAttributes({ columnsHeightCustomMobile: value });
			}
		};

		const changeHorizontalAlign = value => {
			if ( horizontalAlign === value ) {
				return props.setAttributes({ horizontalAlign: 'unset' });
			}
			props.setAttributes({ horizontalAlign: value });
		};

		const changeVerticalAlign = value => {
			if ( verticalAlign === value ) {
				return props.setAttributes({ verticalAlign: 'unset' });
			}
			props.setAttributes({ verticalAlign: value });
		};

		const changeBackgroundType = value => {
			props.setAttributes({ backgroundType: value });
		};

		const changeBackgroundColor = value => {
			props.setAttributes({ backgroundColor: value });
		};

		const changeBackgroundImage = value => {
			props.setAttributes({
				backgroundImageID: value.id,
				backgroundImageURL: value.url
			});
		};

		const removeBackgroundImage = () => {
			props.setAttributes({
				backgroundImageID: '',
				backgroundImageURL: ''
			});
		};

		const changeBackgroundAttachment = value => {
			props.setAttributes({ backgroundAttachment: value });
		};

		const changeBackgroundPosition = value => {
			props.setAttributes({ backgroundPosition: value });
		};

		const changeBackgroundRepeat = value => {
			props.setAttributes({ backgroundRepeat: value });
		};

		const changeBackgroundSize = value => {
			props.setAttributes({ backgroundSize: value });
		};

		const changeBackgroundGradientFirstColor = value => {
			props.setAttributes({ backgroundGradientFirstColor: value });
		};

		const changeBackgroundGradientFirstLocation = value => {
			props.setAttributes({ backgroundGradientFirstLocation: value });
		};

		const changeBackgroundGradientSecondColor = value => {
			props.setAttributes({ backgroundGradientSecondColor: value });
		};

		const changeBackgroundGradientSecondLocation = value => {
			props.setAttributes({ backgroundGradientSecondLocation: value });
		};

		const changeBackgroundGradientType = value => {
			props.setAttributes({ backgroundGradientType: value });
		};

		const changeBackgroundGradientAngle = value => {
			props.setAttributes({ backgroundGradientAngle: value });
		};

		const changeBackgroundGradientPosition = value => {
			props.setAttributes({ backgroundGradientPosition: value });
		};

		const changeBackgroundOverlayOpacity = value => {
			props.setAttributes({ backgroundOverlayOpacity: value });
		};

		const changeBackgroundOverlayType = value => {
			props.setAttributes({ backgroundOverlayType: value });
		};

		const changeBackgroundOverlayColor = value => {
			props.setAttributes({ backgroundOverlayColor: value });
		};

		const changeBackgroundOverlayImage = value => {
			props.setAttributes({
				backgroundOverlayImageID: value.id,
				backgroundOverlayImageURL: value.url
			});
		};

		const removeBackgroundOverlayImage = () => {
			props.setAttributes({
				backgroundOverlayImageID: '',
				backgroundOverlayImageURL: ''
			});
		};

		const changeBackgroundOverlayAttachment = value => {
			props.setAttributes({ backgroundOverlayAttachment: value });
		};

		const changeBackgroundOverlayPosition = value => {
			props.setAttributes({ backgroundOverlayPosition: value });
		};

		const changeBackgroundOverlayRepeat = value => {
			props.setAttributes({ backgroundOverlayRepeat: value });
		};

		const changeBackgroundOverlaySize = value => {
			props.setAttributes({ backgroundOverlaySize: value });
		};

		const changeBackgroundOverlayGradientFirstColor = value => {
			props.setAttributes({ backgroundOverlayGradientFirstColor: value });
		};

		const changeBackgroundOverlayGradientFirstLocation = value => {
			props.setAttributes({ backgroundOverlayGradientFirstLocation: value });
		};

		const changeBackgroundOverlayGradientSecondColor = value => {
			props.setAttributes({ backgroundOverlayGradientSecondColor: value });
		};

		const changeBackgroundOverlayGradientSecondLocation = value => {
			props.setAttributes({ backgroundOverlayGradientSecondLocation: value });
		};

		const changeBackgroundOverlayGradientType = value => {
			props.setAttributes({ backgroundOverlayGradientType: value });
		};

		const changeBackgroundOverlayGradientAngle = value => {
			props.setAttributes({ backgroundOverlayGradientAngle: value });
		};

		const changeBackgroundOverlayGradientPosition = value => {
			props.setAttributes({ backgroundOverlayGradientPosition: value });
		};

		const changebackgroundOverlayFilterBlur = value => {
			props.setAttributes({ backgroundOverlayFilterBlur: value });
		};

		const changebackgroundOverlayFilterBrightness = value => {
			props.setAttributes({ backgroundOverlayFilterBrightness: value });
		};

		const changebackgroundOverlayFilterContrast = value => {
			props.setAttributes({ backgroundOverlayFilterContrast: value });
		};

		const changebackgroundOverlayFilterGrayscale = value => {
			props.setAttributes({ backgroundOverlayFilterGrayscale: value });
		};

		const changebackgroundOverlayFilterHue = value => {
			props.setAttributes({ backgroundOverlayFilterHue: value });
		};

		const changebackgroundOverlayFilterSaturate = value => {
			props.setAttributes({ backgroundOverlayFilterSaturate: value });
		};

		const changebackgroundOverlayBlend = value => {
			props.setAttributes({ backgroundOverlayBlend: value });
		};

		const changeBorderType = value => {
			props.setAttributes({ borderType: value });
		};

		const changeBorder = value => {
			props.setAttributes({ border: value });
		};

		const changeBorderTop = value => {
			props.setAttributes({ borderTop: value });
		};

		const changeBorderRight = value => {
			props.setAttributes({ borderRight: value });
		};

		const changeBorderBottom = value => {
			props.setAttributes({ borderBottom: value });
		};

		const changeBorderLeft = value => {
			props.setAttributes({ borderLeft: value });
		};

		const changeBorderColor = value => {
			props.setAttributes({ borderColor: value });
		};

		const changeBorderRadiusType = value => {
			props.setAttributes({ borderRadiusType: value });
		};

		const changeBorderRadius = value => {
			props.setAttributes({ borderRadius: value });
		};

		const changeBorderRadiusTop = value => {
			props.setAttributes({ borderRadiusTop: value });
		};

		const changeBorderRadiusRight = value => {
			props.setAttributes({ borderRadiusRight: value });
		};

		const changeBorderRadiusBottom = value => {
			props.setAttributes({ borderRadiusBottom: value });
		};

		const changeBorderRadiusLeft = value => {
			props.setAttributes({ borderRadiusLeft: value });
		};

		const changeBoxShadow = () => {
			props.setAttributes({ boxShadow: ! boxShadow });
		};

		const changeBoxShadowColor = value => {
			props.setAttributes({ boxShadowColor: value });
		};

		const changeBoxShadowColorOpacity = value => {
			props.setAttributes({ boxShadowColorOpacity: value });
		};

		const changeBoxShadowBlur = value => {
			props.setAttributes({ boxShadowBlur: value });
		};

		const changeBoxShadowSpread = value => {
			props.setAttributes({ boxShadowSpread: value });
		};

		const changeBoxShadowHorizontal = value => {
			props.setAttributes({ boxShadowHorizontal: value });
		};

		const changeBoxShadowVertical = value => {
			props.setAttributes({ boxShadowVertical: value });
		};

		let getDividerType = () => {
			let value;

			if ( 'top' == dividerViewType ) {
				value = dividerTopType;
			}

			if ( 'bottom' == dividerViewType ) {
				value = dividerBottomType;
			}

			return value;
		};

		getDividerType = getDividerType();

		const changeDividerColor = value => {
			if ( 'top' == dividerViewType ) {
				props.setAttributes({ dividerTopColor: value });
			}
			if ( 'bottom' == dividerViewType ) {
				props.setAttributes({ dividerBottomColor: value });
			}
		};

		let getDividerColor = () => {
			let value;

			if ( 'top' == dividerViewType ) {
				value = dividerTopColor;
			}

			if ( 'bottom' == dividerViewType ) {
				value = dividerBottomColor;
			}

			return value;
		};

		getDividerColor = getDividerColor();

		const changeDividerType = value => {
			if ( 'top' == dividerViewType ) {
				props.setAttributes({ dividerTopType: value });
			}

			if ( 'bottom' == dividerViewType ) {
				props.setAttributes({ dividerBottomType: value });
			}
		};

		let getDividerInvert = () => {
			let value;

			if ( 'top' == dividerViewType ) {
				value = dividerTopInvert;
			}

			if ( 'bottom' == dividerViewType ) {
				value = dividerBottomInvert;
			}

			return value;
		};

		getDividerInvert = getDividerInvert();

		const changeDividerInvert = () => {
			if ( 'top' == dividerViewType ) {
				props.setAttributes({ dividerTopInvert: ! dividerTopInvert });
			}

			if ( 'bottom' == dividerViewType ) {
				props.setAttributes({ dividerBottomInvert: ! dividerBottomInvert });
			}
		};

		let getDividerWidth = () => {
			let value;

			if ( 'top' == dividerViewType ) {
				if ( 'desktop' == dividerWidthViewType ) {
					value = dividerTopWidth;
				}

				if ( 'tablet' == dividerWidthViewType ) {
					value = dividerTopWidthTablet;
				}

				if ( 'mobile' == dividerWidthViewType ) {
					value = dividerTopWidthMobile;
				}
			}

			if ( 'bottom' == dividerViewType ) {
				if ( 'desktop' == dividerWidthViewType ) {
					value = dividerBottomWidth;
				}

				if ( 'tablet' == dividerWidthViewType ) {
					value = dividerBottomWidthTablet;
				}

				if ( 'mobile' == dividerWidthViewType ) {
					value = dividerBottomWidthMobile;
				}
			}

			return value;
		};

		getDividerWidth = getDividerWidth();

		let getDividerTopWidth = () => {
			let value;

			if ( isDesktop ) {
				value = dividerTopWidth;
			}

			if ( isTablet ) {
				value = dividerTopWidthTablet;
			}

			if ( isMobile ) {
				value = dividerTopWidthMobile;
			}

			return value;
		};

		getDividerTopWidth = getDividerTopWidth();

		let getDividerBottomWidth = () => {
			let value;

			if ( isDesktop ) {
				value = dividerBottomWidth;
			}

			if ( isTablet ) {
				value = dividerBottomWidthTablet;
			}

			if ( isMobile ) {
				value = dividerBottomWidthMobile;
			}

			return value;
		};

		getDividerBottomWidth = getDividerBottomWidth();

		const changeDividerWidth = value => {
			if ( 'top' == dividerViewType ) {
				if ( 'desktop' == dividerWidthViewType ) {
					props.setAttributes({ dividerTopWidth: value });
				}

				if ( 'tablet' == dividerWidthViewType ) {
					props.setAttributes({ dividerTopWidthTablet: value });
				}

				if ( 'mobile' == dividerWidthViewType ) {
					props.setAttributes({ dividerTopWidthMobile: value });
				}
			}

			if ( 'bottom' == dividerViewType ) {
				if ( 'desktop' == dividerWidthViewType ) {
					props.setAttributes({ dividerBottomWidth: value });
				}

				if ( 'tablet' == dividerWidthViewType ) {
					props.setAttributes({ dividerBottomWidthTablet: value });
				}

				if ( 'mobile' == dividerWidthViewType ) {
					props.setAttributes({ dividerBottomWidthMobile: value });
				}
			}
		};

		let getDividerHeight = () => {
			let value;

			if ( 'top' == dividerViewType ) {
				if ( 'desktop' == dividerHeightViewType ) {
					value = dividerTopHeight;
				}

				if ( 'tablet' == dividerHeightViewType ) {
					value = dividerTopHeightTablet;
				}

				if ( 'mobile' == dividerHeightViewType ) {
					value = dividerTopHeightMobile;
				}
			}

			if ( 'bottom' == dividerViewType ) {
				if ( 'desktop' == dividerHeightViewType ) {
					value = dividerBottomHeight;
				}

				if ( 'tablet' == dividerHeightViewType ) {
					value = dividerBottomHeightTablet;
				}

				if ( 'mobile' == dividerHeightViewType ) {
					value = dividerBottomHeightMobile;
				}
			}

			return value;
		};

		getDividerHeight = getDividerHeight();

		let getDividerTopHeight = () => {
			let value;

			if ( isDesktop ) {
				value = dividerTopHeight;
			}

			if ( isTablet ) {
				value = dividerTopHeightTablet;
			}

			if ( isMobile ) {
				value = dividerTopHeightMobile;
			}

			return value;
		};

		getDividerTopHeight = getDividerTopHeight();

		let getDividerBottomHeight = () => {
			let value;

			if ( isDesktop ) {
				value = dividerBottomHeight;
			}

			if ( isTablet ) {
				value = dividerBottomHeightTablet;
			}

			if ( isMobile ) {
				value = dividerBottomHeightMobile;
			}

			return value;
		};

		getDividerBottomHeight = getDividerBottomHeight();

		const changeDividerHeight = value => {
			if ( 'top' == dividerViewType ) {
				if ( 'desktop' == dividerHeightViewType ) {
					props.setAttributes({ dividerTopHeight: value });
				}

				if ( 'tablet' == dividerHeightViewType ) {
					props.setAttributes({ dividerTopHeightTablet: value });
				}

				if ( 'mobile' == dividerHeightViewType ) {
					props.setAttributes({ dividerTopHeightMobile: value });
				}
			}

			if ( 'bottom' == dividerViewType ) {
				if ( 'desktop' == dividerHeightViewType ) {
					props.setAttributes({ dividerBottomHeight: value });
				}

				if ( 'tablet' == dividerHeightViewType ) {
					props.setAttributes({ dividerBottomHeightTablet: value });
				}

				if ( 'mobile' == dividerHeightViewType ) {
					props.setAttributes({ dividerBottomHeightMobile: value });
				}
			}
		};

		const changeHideStatus = ( value, type ) => {
			if ( 'desktop' === type ) {
				props.setAttributes({ hide: value });
			}
			if ( 'tablet' === type ) {
				props.setAttributes({ hideTablet: value });
			}
			if ( 'mobile' === type ) {
				props.setAttributes({ hideMobile: value });
			}
		};

		const changeColumnsHTMLTag = value => {
			props.setAttributes({ columnsHTMLTag: value });
		};

		const getColumnsTemplate = columns => {
			return times( columns, i => [ 'themeisle-blocks/advanced-column', { columnWidth: parseFloat( layouts[columns][layout][i]) } ]);
		};

		if ( ! columns ) {
			return (
				<Inboarding clientId={ props.clientId } setupColumns={ setupColumns } />
			);
		}

		return (
			<Fragment>
				<InspectorControls className="wp-block-themeisle-blocks-advanced-columns-inspector">
					<PanelBody className="wp-block-themeisle-blocks-advanced-columns-header-panel">
						<Button
							className={ classnames(
								'header-tab',
								{ 'is-selected': 'layout' === tab }
							) }
							onClick={ () => setState({ tab: 'layout' }) }
						>
							<span
							>
								<Dashicon icon="editor-table"/>
								{ __( 'Layout' ) }
							</span>
						</Button>

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

					{ 'layout' === tab && (

						<Fragment>
							<PanelBody
								title={ __( 'Columns & Layout' ) }
							>
								<RangeControl
									label={ __( 'Columns' ) }
									value={ columns }
									onChange={ changeColumns }
									min={ 1 }
									max={ 6 }
								/>

								<LayoutControl
									label={ __( 'Layout' ) }
									columns={ columns }
									changeViewType={ changeColumnsViewType }
									onClick={ changeLayout }
									layout={ layout }
									layoutTablet={ layoutTablet }
									layoutMobile={ layoutMobile }
									view={ columnsViewType }
								/>

								<SelectControl
									label={ __( 'Columns Gap' ) }
									value={ columnsGap }
									options={ [
										{ label: 'Default (10px)', value: 'default' },
										{ label: 'No Gap', value: 'nogap' },
										{ label: 'Narrow (5px)', value: 'narrow' },
										{ label: 'Extended (15px)', value: 'extended' },
										{ label: 'Wide (20px)', value: 'wide' },
										{ label: 'Wider (30px)', value: 'wider' }
									] }
									onChange={ changeColumnsGap }
								/>
							</PanelBody>

							<PanelBody
								title={ __( 'Padding & Margin' ) }
								initialOpen={ false }
							>
								<SizeControl
									label={ __( 'Padding Control' ) }
									minus={ false }
									responsive={ true }
									changeViewType={ changePaddingViewType }
									changeType={ changePaddingType }
									changeValue={ changePadding }
									view={ paddingViewType }
									typeDesktop={ paddingType }
									typeTablet={ paddingTypeTablet }
									typeMobile={ paddingTypeMobile }
									valueDesktop={ padding }
									valueTablet={ paddingTablet }
									valueMobile={ paddingMobile }
								>
									<RangeControl
										label={ __( 'Padding Top' ) }
										beforeIcon="arrow-up"
										value={
											( 'desktop' === paddingViewType ) && paddingTop ||
											( 'tablet' === paddingViewType ) && paddingTopTablet ||
											( 'mobile' === paddingViewType ) && paddingTopMobile
										}
										onChange={ changePaddingTop }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Padding Right' ) }
										beforeIcon="arrow-right"
										value={
											( 'desktop' === paddingViewType ) && paddingRight ||
											( 'tablet' === paddingViewType ) && paddingRightTablet ||
											( 'mobile' === paddingViewType ) && paddingRightMobile
										}
										onChange={ changePaddingRight }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Padding Bottom' ) }
										beforeIcon="arrow-down"
										value={
											( 'desktop' === paddingViewType ) && paddingBottom ||
											( 'tablet' === paddingViewType ) && paddingBottomTablet ||
											( 'mobile' === paddingViewType ) && paddingBottomMobile
										}
										onChange={ changePaddingBottom }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Padding Left' ) }
										beforeIcon="arrow-left"
										value={
											( 'desktop' === paddingViewType ) && paddingLeft ||
											( 'tablet' === paddingViewType ) && paddingLeftTablet ||
											( 'mobile' === paddingViewType ) && paddingLeftMobile
										}
										onChange={ changePaddingLeft }
										min={ 0 }
										max={ 500 }
									/>
								</SizeControl>

								<SizeControl
									label={ __( 'Margin Control' ) }
									minus={ true }
									responsive={ true }
									changeViewType={ changeMarginViewType }
									changeType={ changeMarginType }
									changeValue={ changeMargin }
									view={ marginViewType }
									typeDesktop={ marginType }
									typeTablet={ marginTypeTablet }
									typeMobile={ marginTypeMobile }
									valueDesktop={ margin }
									valueTablet={ marginTablet }
									valueMobile={ marginMobile }
								>
									<RangeControl
										label={ __( 'Margin Top' ) }
										beforeIcon="arrow-up"
										value={
											( 'desktop' === marginViewType ) && marginTop ||
											( 'tablet' === marginViewType ) && marginTopTablet ||
											( 'mobile' === marginViewType ) && marginTopMobile
										}
										onChange={ changeMarginTop }
										min={ -500 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Margin Bottom' ) }
										beforeIcon="arrow-down"
										value={
											( 'desktop' === marginViewType ) && marginBottom ||
											( 'tablet' === marginViewType ) && marginBottomTablet ||
											( 'mobile' === marginViewType ) && marginBottomMobile
										}
										onChange={ changeMarginBottom }
										min={ -500 }
										max={ 500 }
									/>
								</SizeControl>
							</PanelBody>

							<PanelBody
								title={ __( 'Section Structure' ) }
								initialOpen={ false }
							>
								<RangeControl
									label={ __( 'Maximum Content Width' ) }
									value={ columnsWidth || '' }
									onChange={ changeColumnsWidth }
									min={ 0 }
									max={ 1200 }
								/>

								{ columnsWidth && (
									<BaseControl
										label={ 'Horizontal Align' }
									>
										<ButtonGroup className="icon-buttom-group">
											<Tooltip text={ __( 'Left' ) } >
												<IconButton
													icon="editor-alignleft"
													className="is-button is-large"
													isPrimary={ 'flex-start' === horizontalAlign }
													onClick={ () => changeHorizontalAlign( 'flex-start' ) }
												/>
											</Tooltip>

											<Tooltip text={ __( 'Center' ) } >
												<IconButton
													icon="editor-aligncenter"
													className="is-button is-large"
													isPrimary={ 'center' === horizontalAlign }
													onClick={ () => changeHorizontalAlign( 'center' ) }
												/>
											</Tooltip>

											<Tooltip text={ __( 'Right' ) } >
												<IconButton
													icon="editor-alignright"
													className="is-button is-large"
													isPrimary={ 'flex-end' === horizontalAlign }
													onClick={ () => changeHorizontalAlign( 'flex-end' ) }
												/>
											</Tooltip>
										</ButtonGroup>
									</BaseControl>
								) }

								<SelectControl
									label={ __( 'Minimum Height' ) }
									value={ columnsHeight }
									options={ [
										{ label: 'Default', value: 'auto' },
										{ label: 'Fit to Screen', value: '100vh' },
										{ label: 'Custom', value: 'custom' }
									] }
									onChange={ changeColumnsHeight }
								/>

								{ 'custom' === columnsHeight && (
									<ResponsiveControl
										label={ 'Custom Height' }
										view={ heightViewType }
										changeViewType={ changeHeightViewType }
									>
										<RangeControl
											value={ getColumnsHeightCustom || '' }
											onChange={ changeColumnsHeightCustom }
											min={ 0 }
											max={ 1000 }
										/>
									</ResponsiveControl>
								) }

								{ 'auto' !== columnsHeight && (
									<BaseControl
										label={ 'Vertical Align' }
									>
										<ButtonGroup className="icon-buttom-group">
											<Tooltip text={ __( 'Top' ) } >
												<Button
													className="components-icon-button is-button is-large"
													isPrimary={ 'flex-start' === verticalAlign }
													onClick={ () => changeVerticalAlign( 'flex-start' ) }
												>
													<Icon
														icon={ topIcon }
														size={ 20 }
													/>
												</Button>
											</Tooltip>

											<Tooltip text={ __( 'Middle' ) } >
												<Button
													className="components-icon-button is-button is-large"
													isPrimary={ 'center' === verticalAlign }
													onClick={ () => changeVerticalAlign( 'center' ) }
												>
													<Icon
														icon={ middleIcon }
														size={ 20 }
													/>
												</Button>
											</Tooltip>

											<Tooltip text={ __( 'Bottom' ) } >
												<Button
													className="components-icon-button is-button is-large"
													isPrimary={ 'flex-end' === verticalAlign }
													onClick={ () => changeVerticalAlign( 'flex-end' ) }
												>
													<Icon
														icon={ bottomIcon }
														size={ 20 }
													/>
												</Button>
											</Tooltip>
										</ButtonGroup>
									</BaseControl>
								) }
							</PanelBody>
						</Fragment>

					) || 'style' === tab && (

						<Fragment>
							<PanelBody
								title={ __( 'Background Settings' ) }
								className="wp-block-themeisle-image-container"
							>
								<BackgroundControl
									label={ __( 'Background Type' ) }
									backgroundType={ backgroundType }
									changeBackgroundType={ changeBackgroundType }
								/>

								{ 'color' === backgroundType && (

									<Fragment>
										<p>{ __( 'Background Color' ) }</p>

										<ColorPalette
											label={ 'Background Color' }
											value={ backgroundColor }
											onChange={ changeBackgroundColor }
										/>
									</Fragment>

								) || 'image' === backgroundType && (
									backgroundImageURL ?

										<Fragment>
											<div className="image-body">
												<div className="image-container">
													<div
														className="image-holder"
														style={ {
															backgroundImage: `url('${ backgroundImageURL }')`
														} }
													></div>

													<div
														className="image-delete"
														onClick={ removeBackgroundImage }
													>
														<Dashicon icon="trash" />
														<span>{ __( 'Remove Image' ) }</span>
													</div>
												</div>
											</div>

											<Button
												isDefault
												className="image-delete-button"
												onClick={ removeBackgroundImage }
											>
												{ __( 'Change or Remove Image' ) }
											</Button>

											<ControlPanelControl
												label={ 'Background Settings' }
											>

												<SelectControl
													label={ __( 'Background Attachment' ) }
													value={ backgroundAttachment }
													options={ [
														{ label: 'Scroll', value: 'scroll' },
														{ label: 'Fixed', value: 'fixed' },
														{ label: 'Local', value: 'local' }
													] }
													onChange={ changeBackgroundAttachment }
												/>

												<SelectControl
													label={ __( 'Background Position' ) }
													value={ backgroundPosition }
													options={ [
														{ label: 'Default', value: 'top left' },
														{ label: 'Top Left', value: 'top left' },
														{ label: 'Top Center', value: 'top center' },
														{ label: 'Top Right', value: 'top right' },
														{ label: 'Center Left', value: 'center left' },
														{ label: 'Center Center', value: 'center center' },
														{ label: 'Center Right', value: 'center right' },
														{ label: 'Bottom Left', value: 'bottom left' },
														{ label: 'Bottom Center', value: 'bottom center' },
														{ label: 'Bottom Right', value: 'bottom right' }
													] }
													onChange={ changeBackgroundPosition }
												/>

												<SelectControl
													label={ __( 'Background Repeat' ) }
													value={ backgroundRepeat }
													options={ [
														{ label: 'Repeat', value: 'repeat' },
														{ label: 'No-repeat', value: 'no-repeat' }
													] }
													onChange={ changeBackgroundRepeat }
												/>

												<SelectControl
													label={ __( 'Background Size' ) }
													value={ backgroundSize }
													options={ [
														{ label: 'Auto', value: 'auto' },
														{ label: 'Cover', value: 'cover' },
														{ label: 'Contain', value: 'contain' }
													] }
													onChange={ changeBackgroundSize }
												/>

											</ControlPanelControl>
										</Fragment> :

										<MediaPlaceholder
											icon="format-image"
											labels={ {
												title: __( 'Background Image' ),
												name: __( 'an image' )
											} }
											value={ backgroundImageID }
											onSelect={ changeBackgroundImage }
											accept="image/*"
											allowedTypes={ [ 'image' ] }
										/>

								) || 'gradient' === backgroundType && (
									<Fragment>
										<p>{ __( 'First Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											value={ backgroundGradientFirstColor }
											onChange={ changeBackgroundGradientFirstColor }
										/>

										<RangeControl
											label={ __( 'Location' ) }
											value={ backgroundGradientFirstLocation }
											onChange={ changeBackgroundGradientFirstLocation }
											min={ 0 }
											max={ 100 }
										/>

										<p>{ __( 'Second Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											value={ backgroundGradientSecondColor }
											onChange={ changeBackgroundGradientSecondColor }
										/>

										<RangeControl
											label={ __( 'Location' ) }
											value={ backgroundGradientSecondLocation }
											onChange={ changeBackgroundGradientSecondLocation }
											min={ 0 }
											max={ 100 }
										/>

										<SelectControl
											label={ __( 'Type' ) }
											value={ backgroundGradientType }
											options={ [
												{ label: 'Linear', value: 'linear' },
												{ label: 'Radial', value: 'radial' }
											] }
											onChange={ changeBackgroundGradientType }
										/>

										{ 'linear' === backgroundGradientType ?
											<RangeControl
												label={ __( 'Angle' ) }
												value={ backgroundGradientAngle }
												onChange={ changeBackgroundGradientAngle }
												min={ 0 }
												max={ 360 }
											/>	:
											<SelectControl
												label={ __( 'Position' ) }
												value={ backgroundGradientPosition }
												options={ [
													{ label: 'Top Left', value: 'top left' },
													{ label: 'Top Center', value: 'top center' },
													{ label: 'Top Right', value: 'top right' },
													{ label: 'Center Left', value: 'center left' },
													{ label: 'Center Center', value: 'center center' },
													{ label: 'Center Right', value: 'center right' },
													{ label: 'Bottom Left', value: 'bottom left' },
													{ label: 'Bottom Center', value: 'bottom center' },
													{ label: 'Bottom Right', value: 'bottom right' }
												] }
												onChange={ changeBackgroundGradientPosition }
											/>
										}
									</Fragment>
								) }
							</PanelBody>

							<PanelBody
								title={ __( 'Background Overlay' ) }
								className="wp-block-themeisle-image-container"
								initialOpen={ false }
							>
								<BackgroundControl
									label={ __( 'Overlay Type' ) }
									backgroundType={ backgroundOverlayType }
									changeBackgroundType={ changeBackgroundOverlayType }
								/>

								<RangeControl
									label={ __( 'Overlay Opacity' ) }
									value={ backgroundOverlayOpacity }
									onChange={ changeBackgroundOverlayOpacity }
									min={ 0 }
									max={ 100 }
								/>

								{ 'color' === backgroundOverlayType && (

									<Fragment>
										<p>{ __( 'Overlay Color' ) }</p>

										<ColorPalette
											label={ 'Overlay Color' }
											value={ backgroundOverlayColor }
											onChange={ changeBackgroundOverlayColor }
										/>
									</Fragment>

								) || 'image' === backgroundOverlayType && (
									backgroundOverlayImageURL ?

										<Fragment>
											<div className="image-body">
												<div className="image-container">
													<div
														className="image-holder"
														style={ {
															backgroundImage: `url('${ backgroundOverlayImageURL }')`
														} }
													></div>

													<div
														className="image-delete"
														onClick={ removeBackgroundOverlayImage }
													>
														<Dashicon icon="trash" />
														<span>{ __( 'Remove Image' ) }</span>
													</div>
												</div>
											</div>

											<Button
												isDefault
												className="image-delete-button"
												onClick={ removeBackgroundOverlayImage }
											>
												{ __( 'Change or Remove Image' ) }
											</Button>

											<ControlPanelControl
												label={ 'Background Settings' }
											>

												<SelectControl
													label={ __( 'Background Attachment' ) }
													value={ backgroundOverlayAttachment }
													options={ [
														{ label: 'Scroll', value: 'scroll' },
														{ label: 'Fixed', value: 'fixed' },
														{ label: 'Local', value: 'local' }
													] }
													onChange={ changeBackgroundOverlayAttachment }
												/>

												<SelectControl
													label={ __( 'Background Position' ) }
													value={ backgroundOverlayPosition }
													options={ [
														{ label: 'Default', value: 'top left' },
														{ label: 'Top Left', value: 'top left' },
														{ label: 'Top Center', value: 'top center' },
														{ label: 'Top Right', value: 'top right' },
														{ label: 'Center Left', value: 'center left' },
														{ label: 'Center Center', value: 'center center' },
														{ label: 'Center Right', value: 'center right' },
														{ label: 'Bottom Left', value: 'bottom left' },
														{ label: 'Bottom Center', value: 'bottom center' },
														{ label: 'Bottom Right', value: 'bottom right' }
													] }
													onChange={ changeBackgroundOverlayPosition }
												/>

												<SelectControl
													label={ __( 'Background Repeat' ) }
													value={ backgroundOverlayRepeat }
													options={ [
														{ label: 'Repeat', value: 'repeat' },
														{ label: 'No-repeat', value: 'no-repeat' }
													] }
													onChange={ changeBackgroundOverlayRepeat }
												/>

												<SelectControl
													label={ __( 'Background Size' ) }
													value={ backgroundOverlaySize }
													options={ [
														{ label: 'Auto', value: 'auto' },
														{ label: 'Cover', value: 'cover' },
														{ label: 'Contain', value: 'contain' }
													] }
													onChange={ changeBackgroundOverlaySize }
												/>

											</ControlPanelControl>
										</Fragment> :

										<MediaPlaceholder
											icon="format-image"
											labels={ {
												title: __( 'Background Image' ),
												name: __( 'an image' )
											} }
											value={ backgroundOverlayImageID }
											onSelect={ changeBackgroundOverlayImage }
											accept="image/*"
											allowedTypes={ [ 'image' ] }
										/>

								) || 'gradient' === backgroundOverlayType && (
									<Fragment>
										<p>{ __( 'First Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											value={ backgroundOverlayGradientFirstColor }
											onChange={ changeBackgroundOverlayGradientFirstColor }
										/>

										<RangeControl
											label={ __( 'Location' ) }
											value={ backgroundOverlayGradientFirstLocation }
											onChange={ changeBackgroundOverlayGradientFirstLocation }
											min={ 0 }
											max={ 100 }
										/>

										<p>{ __( 'Second Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											value={ backgroundOverlayGradientSecondColor }
											onChange={ changeBackgroundOverlayGradientSecondColor }
										/>

										<RangeControl
											label={ __( 'Location' ) }
											value={ backgroundOverlayGradientSecondLocation }
											onChange={ changeBackgroundOverlayGradientSecondLocation }
											min={ 0 }
											max={ 100 }
										/>

										<SelectControl
											label={ __( 'Type' ) }
											value={ backgroundOverlayGradientType }
											options={ [
												{ label: 'Linear', value: 'linear' },
												{ label: 'Radial', value: 'radial' }
											] }
											onChange={ changeBackgroundOverlayGradientType }
										/>

										{ 'linear' === backgroundOverlayGradientType ?
											<RangeControl
												label={ __( 'Angle' ) }
												value={ backgroundOverlayGradientAngle }
												onChange={ changeBackgroundOverlayGradientAngle }
												min={ 0 }
												max={ 360 }
											/>	:
											<SelectControl
												label={ __( 'Position' ) }
												value={ backgroundOverlayGradientPosition }
												options={ [
													{ label: 'Top Left', value: 'top left' },
													{ label: 'Top Center', value: 'top center' },
													{ label: 'Top Right', value: 'top right' },
													{ label: 'Center Left', value: 'center left' },
													{ label: 'Center Center', value: 'center center' },
													{ label: 'Center Right', value: 'center right' },
													{ label: 'Bottom Left', value: 'bottom left' },
													{ label: 'Bottom Center', value: 'bottom center' },
													{ label: 'Bottom Right', value: 'bottom right' }
												] }
												onChange={ changeBackgroundOverlayGradientPosition }
											/>
										}
									</Fragment>
								) }

								<ControlPanelControl
									label={ 'CSS Filters' }
								>

									<RangeControl
										label={ __( 'Blur' ) }
										value={ backgroundOverlayFilterBlur }
										onChange={ changebackgroundOverlayFilterBlur }
										min={ 0 }
										max={ 100 }
									/>

									<RangeControl
										label={ __( 'Brightness' ) }
										value={ backgroundOverlayFilterBrightness }
										onChange={ changebackgroundOverlayFilterBrightness }
										min={ 0 }
										max={ 100 }
									/>

									<RangeControl
										label={ __( 'Contrast' ) }
										value={ backgroundOverlayFilterContrast }
										onChange={ changebackgroundOverlayFilterContrast }
										min={ 0 }
										max={ 100 }
									/>

									<RangeControl
										label={ __( 'Grayscale' ) }
										value={ backgroundOverlayFilterGrayscale }
										onChange={ changebackgroundOverlayFilterGrayscale }
										min={ 0 }
										max={ 100 }
									/>

									<RangeControl
										label={ __( 'Hue' ) }
										value={ backgroundOverlayFilterHue }
										onChange={ changebackgroundOverlayFilterHue }
										min={ 0 }
										max={ 360 }
									/>

									<RangeControl
										label={ __( 'Saturation' ) }
										value={ backgroundOverlayFilterSaturate }
										onChange={ changebackgroundOverlayFilterSaturate }
										min={ 0 }
										max={ 100 }
									/>

								</ControlPanelControl>

								<SelectControl
									label={ __( 'Blend Mode' ) }
									value={ backgroundOverlayBlend }
									options={ [
										{ label: 'Normal', value: 'normal' },
										{ label: 'Multiply', value: 'multiply' },
										{ label: 'Screen', value: 'screen' },
										{ label: 'Overlay', value: 'overlay' },
										{ label: 'Darken', value: 'darken' },
										{ label: 'Lighten', value: 'lighten' },
										{ label: 'Color Dodge', value: 'color-dodge' },
										{ label: 'Color Burn', value: 'color-burn' },
										{ label: 'Hard Light', value: 'hard-light' },
										{ label: 'Soft Light', value: 'soft-light' },
										{ label: 'Difference', value: 'difference' },
										{ label: 'Exclusion', value: 'exclusion' },
										{ label: 'Hue', value: 'hue' },
										{ label: 'Saturation', value: 'saturation' },
										{ label: 'Color', value: 'color' },
										{ label: 'Luminosity', value: 'luminosity' }
									] }
									onChange={ changebackgroundOverlayBlend }
								/>
							</PanelBody>

							<PanelBody
								title={ __( 'Border' ) }
								className="wp-block-themeisle-border-container"
								initialOpen={ false }
							>
								<SizeControl
									label={ __( 'Border Width' ) }
									minus={ false }
									responsive={ false }
									changeType={ changeBorderType }
									changeValue={ changeBorder }
									sizeValue={ border }
									sizeType={ borderType }
								>
									<RangeControl
										label={ __( 'Border Top' ) }
										beforeIcon="arrow-up"
										value={ borderTop }
										onChange={ changeBorderTop }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Border Right' ) }
										beforeIcon="arrow-right"
										value={ borderRight }
										onChange={ changeBorderRight }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Border Bottom' ) }
										beforeIcon="arrow-down"
										value={ borderBottom }
										onChange={ changeBorderBottom }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Border Left' ) }
										beforeIcon="arrow-left"
										value={ borderLeft }
										onChange={ changeBorderLeft }
										min={ 0 }
										max={ 500 }
									/>
								</SizeControl>

								<Fragment>
									<p>{ __( 'Border Color' ) }</p>

									<ColorPalette
										label={ 'Border Color' }
										value={ borderColor }
										onChange={ changeBorderColor }
									/>
								</Fragment>

								<SizeControl
									label={ __( 'Border Radius' ) }
									minus={ false }
									responsive={ false }
									changeType={ changeBorderRadiusType }
									changeValue={ changeBorderRadius }
									sizeValue={ borderRadius }
									sizeType={ borderRadiusType }
								>
									<RangeControl
										label={ __( 'Radius Top Left' ) }
										beforeIcon="arrow-up"
										value={ borderRadiusTop }
										onChange={ changeBorderRadiusTop }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Radius Top Right' ) }
										beforeIcon="arrow-right"
										value={ borderRadiusRight }
										onChange={ changeBorderRadiusRight }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Radius Bottom Right' ) }
										beforeIcon="arrow-down"
										value={ borderRadiusBottom }
										onChange={ changeBorderRadiusBottom }
										min={ 0 }
										max={ 500 }
									/>

									<RangeControl
										label={ __( 'Radius Bottom Left' ) }
										beforeIcon="arrow-left"
										value={ borderRadiusLeft }
										onChange={ changeBorderRadiusLeft }
										min={ 0 }
										max={ 500 }
									/>
								</SizeControl>

								<ToggleControl
									label={ 'Box Shadow' }
									checked={ boxShadow }
									onChange={ changeBoxShadow }
								/>

								{ boxShadow && (
									<Fragment>

										<Fragment>
											<p>{ __( 'Shadow Color' ) }</p>

											<ColorPalette
												label={ 'Shadow Color' }
												value={ boxShadowColor }
												onChange={ changeBoxShadowColor }
											/>
										</Fragment>

										<ControlPanelControl
											label={ 'Border Shadow' }
										>

											<RangeControl
												label={ __( 'Opacity' ) }
												value={ boxShadowColorOpacity }
												onChange={ changeBoxShadowColorOpacity }
												min={ 0 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Blur' ) }
												value={ boxShadowBlur }
												onChange={ changeBoxShadowBlur }
												min={ 0 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Spread' ) }
												value={ boxShadowSpread }
												onChange={ changeBoxShadowSpread }
												min={ -100 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Horizontal' ) }
												value={ boxShadowHorizontal }
												onChange={ changeBoxShadowHorizontal }
												min={ -100 }
												max={ 100 }
											/>

											<RangeControl
												label={ __( 'Vertical' ) }
												value={ boxShadowVertical }
												onChange={ changeBoxShadowVertical }
												min={ -100 }
												max={ 100 }
											/>

										</ControlPanelControl>
									</Fragment>
								) }
							</PanelBody>

							<PanelBody
								title={ __( 'Shape Divider' ) }
								initialOpen={ false }
								className="wp-block-themeisle-shape-divider"
							>
								<ButtonGroup>
									<Button
										className="is-button"
										isPrimary={ 'top' === dividerViewType }
										onClick={ () => changeDividerViewType( 'top' ) }
									>
										{ __( 'Top' ) }
									</Button>

									<Button
										className="is-button"
										isPrimary={ 'bottom' === dividerViewType }
										onClick={ () => changeDividerViewType( 'bottom' ) }
									>
										{ __( 'Bottom' ) }
									</Button>
								</ButtonGroup>

								<SelectControl
									label={ __( 'Type' ) }
									value={ getDividerType }
									options={ [
										{ label: 'None', value: 'none' },
										{ label: 'Triangle', value: 'bigTriangle' },
										{ label: 'Right Curve', value: 'rightCurve' },
										{ label: 'Curve', value: 'curve' },
										{ label: 'Slant', value: 'slant' },
										{ label: 'Cloud', value: 'cloud' }
									] }
									onChange={ changeDividerType }
								/>

								{ 'none' !== getDividerType && (
									<Fragment>
										<Fragment>
											<p>{ __( 'Color' ) }</p>

											<ColorPalette
												label={ __( 'Color' ) }
												value={ getDividerColor }
												onChange={ changeDividerColor }
											/>
										</Fragment>

										<ResponsiveControl
											label={ 'Width' }
											view={ dividerWidthViewType }
											changeViewType={ changeDividerWidthViewType }
										>
											<RangeControl
												value={ getDividerWidth }
												onChange={ changeDividerWidth }
												min={ 0 }
												max={ 500 }
											/>
										</ResponsiveControl>

										<ResponsiveControl
											label={ 'Height' }
											view={ dividerHeightViewType }
											changeViewType={ changeDividerHeightViewType }
										>
											<RangeControl
												value={ getDividerHeight }
												onChange={ changeDividerHeight }
												min={ 0 }
												max={ 500 }
											/>
										</ResponsiveControl>

										{ ( 'curve' !== getDividerType && 'cloud' !== getDividerType ) && (
											<ToggleControl
												label={ 'Invert Shape Divider' }
												checked={ getDividerInvert }
												onChange={ changeDividerInvert }
											/>
										) }
									</Fragment>
								) }
							</PanelBody>
						</Fragment>

					) || 'advanced' === tab && (

						<Fragment>
							<PanelBody
								title={ __( 'Section Visibility' ) }
							>
								<ToggleControl
									label={ 'Hide this section in Desktop devices?' }
									checked={ hide }
									onChange={ e => changeHideStatus( e, 'desktop' ) }
								/>

								<ToggleControl
									label={ 'Hide this section in Tablet devices?' }
									checked={ hideTablet }
									onChange={ e => changeHideStatus( e, 'tablet' ) }
								/>

								<ToggleControl
									label={ 'Hide this section in Mobile devices?' }
									checked={ hideMobile }
									onChange={ e => changeHideStatus( e, 'mobile' ) }
								/>
							</PanelBody>

							<PanelBody
								title={ __( 'Section Settings' ) }
								initialOpen={ false }
							>

								<SelectControl
									label={ __( 'HTML Tag' ) }
									value={ columnsHTMLTag }
									options={ [
										{ label: 'Default', value: 'div' },
										{ label: 'div', value: 'div' },
										{ label: 'section', value: 'section' },
										{ label: 'header', value: 'header' },
										{ label: 'footer', value: 'footer' },
										{ label: 'article', value: 'article' },
										{ label: 'main', value: 'main' }
									] }
									onChange={ changeColumnsHTMLTag }
								/>

							</PanelBody>
						</Fragment>

					) }
				</InspectorControls>

				<Tag className={ classes } style={ style }>
					<div
						className="wp-themeisle-block-overlay"
						style={ overlayStyle }
					>
					</div>

					<ResizableBox
						className="block-library-spacer__resize-container wp-themeisle-block-advanced-columns-resize-container"
						size={ {
							height: getPadding( 'top' )
						} }
						minHeight="0"
						maxHeight="500"
						enable={ {
							top: false,
							right: false,
							bottom: true,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false
						} }
						onResize={ ( event, direction, elt, delta ) => {
							const el = document.getElementById( 'paddingTop' );
							el.innerHTML = `${ getPadding( 'top' ) + delta.height }px`;
						} }
						onResizeStop={ ( event, direction, elt, delta ) => {
							setPadding( 'top', delta );
							props.toggleSelection( true );
						} }
						onResizeStart={ () => {
							props.toggleSelection( false );
						} }
					>
						<div className="block-space-size">
							<span id="paddingTop">{ `${ getPadding( 'top' ) }px` }</span>
						</div>
					</ResizableBox>

					<Separators
						type="top"
						style={ dividerTopType }
						fill={ dividerTopColor }
						invert={ dividerTopInvert }
						width={ getDividerTopWidth }
						height={ getDividerTopHeight }
					/>

					<div
						className="innerblocks-wrap"
						style={ innerStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ getColumnsTemplate( columns ) }
							templateLock="all"
						/>
					</div>

					<Separators
						type="bottom"
						style={ dividerBottomType }
						fill={ dividerBottomColor }
						invert={ dividerBottomInvert }
						width={ getDividerBottomWidth }
						height={ getDividerBottomHeight }
					/>

					<ResizableBox
						className="block-library-spacer__resize-container wp-themeisle-block-advanced-columns-resize-container"
						size={ {
							height: getPadding( 'bottom' )
						} }
						minHeight="0"
						maxHeight="500"
						enable={ {
							top: false,
							right: false,
							bottom: true,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false
						} }
						onResize={ ( event, direction, elt, delta ) => {
							const el = document.getElementById( 'paddingBottom' );
							el.innerHTML = `${ getPadding( 'bottom' ) + delta.height }px`;
						} }
						onResizeStop={ ( event, direction, elt, delta ) => {
							setPadding( 'bottom', delta );
							props.toggleSelection( true );
						} }
						onResizeStart={ () => {
							props.toggleSelection( false );
						} }
					>
						<div className="block-space-size">
							<span id="paddingBottom">{ `${ getPadding( 'bottom' ) }px` }</span>
						</div>
					</ResizableBox>
				</Tag>
			</Fragment>
		);
	}),

	save: props => {
		const {
			id,
			columns,
			layout,
			layoutTablet,
			layoutMobile,
			columnsGap,
			columnsWidth,
			horizontalAlign,
			verticalAlign,
			backgroundType,
			backgroundColor,
			backgroundImageURL,
			backgroundAttachment,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundGradientFirstColor,
			backgroundGradientFirstLocation,
			backgroundGradientSecondColor,
			backgroundGradientSecondLocation,
			backgroundGradientType,
			backgroundGradientAngle,
			backgroundGradientPosition,
			backgroundOverlayOpacity,
			backgroundOverlayType,
			backgroundOverlayColor,
			backgroundOverlayImageURL,
			backgroundOverlayAttachment,
			backgroundOverlayPosition,
			backgroundOverlayRepeat,
			backgroundOverlaySize,
			backgroundOverlayGradientFirstColor,
			backgroundOverlayGradientFirstLocation,
			backgroundOverlayGradientSecondColor,
			backgroundOverlayGradientSecondLocation,
			backgroundOverlayGradientType,
			backgroundOverlayGradientAngle,
			backgroundOverlayGradientPosition,
			backgroundOverlayBlend,
			borderType,
			border,
			borderTop,
			borderRight,
			borderBottom,
			borderLeft,
			borderColor,
			borderRadiusType,
			borderRadius,
			borderRadiusTop,
			borderRadiusRight,
			borderRadiusBottom,
			borderRadiusLeft,
			boxShadow,
			boxShadowColor,
			boxShadowColorOpacity,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowHorizontal,
			boxShadowVertical,
			dividerTopType,
			dividerTopColor,
			dividerTopInvert,
			dividerBottomType,
			dividerBottomColor,
			dividerBottomInvert,
			hide,
			hideTablet,
			hideMobile,
			columnsHTMLTag
		} = props.attributes;

		const Tag = columnsHTMLTag;

		let background, overlayBackground, borderStyle, borderRadiusStyle, boxShadowStyle;

		if ( 'color' === backgroundType ) {
			background = {
				background: backgroundColor
			};
		}

		if ( 'image' === backgroundType ) {
			background = {
				backgroundImage: `url( '${ backgroundImageURL }' )`,
				backgroundAttachment,
				backgroundPosition,
				backgroundRepeat,
				backgroundSize
			};
		}

		if ( 'gradient' === backgroundType ) {
			let direction;

			if ( 'linear' === backgroundGradientType ) {
				direction = `${ backgroundGradientAngle }deg`;
			} else {
				direction = `at ${ backgroundGradientPosition }`;
			}

			background = {
				background: `${ backgroundGradientType }-gradient( ${ direction }, ${ backgroundGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundGradientFirstLocation }%, ${ backgroundGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundGradientSecondLocation }% )`
			};
		}

		if ( 'linked' === borderType ) {
			borderStyle = {
				borderWidth: `${ border }px`,
				borderStyle: 'solid',
				borderColor: borderColor
			};
		}

		if ( 'unlinked' === borderType ) {
			borderStyle = {
				borderTopWidth: `${ borderTop }px`,
				borderRightWidth: `${ borderRight }px`,
				borderBottomWidth: `${ borderBottom }px`,
				borderLeftWidth: `${ borderLeft }px`,
				borderStyle: 'solid',
				borderColor: borderColor
			};
		}

		if ( 'linked' === borderRadiusType ) {
			borderRadiusStyle = {
				borderRadius: `${ borderRadius }px`
			};
		}

		if ( 'unlinked' === borderRadiusType ) {
			borderRadiusStyle = {
				borderTopLeftRadius: `${ borderRadiusTop }px`,
				borderTopRightRadius: `${ borderRadiusRight }px`,
				borderBottomRightRadius: `${ borderRadiusBottom }px`,
				borderBottomLeftRadius: `${ borderRadiusLeft }px`
			};
		}

		if ( true === boxShadow ) {
			boxShadowStyle = {
				boxShadow: `${ boxShadowHorizontal }px ${ boxShadowVertical }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${  hexToRgba( ( boxShadowColor ? boxShadowColor : '#000000' ), boxShadowColorOpacity ) }`
			};
		}

		const style = {
			...background,
			...borderStyle,
			...borderRadiusStyle,
			...boxShadowStyle,
			justifyContent: horizontalAlign
		};

		if ( 'color' === backgroundOverlayType ) {
			overlayBackground = {
				background: backgroundOverlayColor,
				opacity: backgroundOverlayOpacity / 100
			};
		}

		if ( 'image' === backgroundOverlayType ) {
			overlayBackground = {
				backgroundImage: `url( '${ backgroundOverlayImageURL }' )`,
				backgroundAttachment: backgroundOverlayAttachment,
				backgroundPosition: backgroundOverlayPosition,
				backgroundRepeat: backgroundOverlayRepeat,
				backgroundSize: backgroundOverlaySize,
				opacity: backgroundOverlayOpacity / 100
			};
		}

		if ( 'gradient' === backgroundOverlayType ) {
			let direction;

			if ( 'linear' === backgroundOverlayGradientType ) {
				direction = `${ backgroundOverlayGradientAngle }deg`;
			} else {
				direction = `at ${ backgroundOverlayGradientPosition }`;
			}

			overlayBackground = {
				background: `${ backgroundOverlayGradientType }-gradient( ${ direction }, ${ backgroundOverlayGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundOverlayGradientFirstLocation }%, ${ backgroundOverlayGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ backgroundOverlayGradientSecondLocation }% )`,
				opacity: backgroundOverlayOpacity / 100
			};
		}

		const overlayStyle = {
			...overlayBackground,
			mixBlendMode: backgroundOverlayBlend
		};

		let innerStyle = {};

		if ( columnsWidth ) {
			innerStyle = {
				maxWidth: columnsWidth + 'px'
			};
		}

		const desktopLayout = hide ? '' : `has-desktop-${ layout }-layout`;
		const tabletLayout = hideTablet ? '' : `has-tablet-${ layoutTablet }-layout`;
		const mobileLayout = hideMobile ? '' : `has-mobile-${ layoutMobile }-layout`;

		const classes = classnames(
			props.className,
			`has-${ columns }-columns`,
			desktopLayout,
			tabletLayout,
			mobileLayout,
			{ 'hide-in-desktop': hide },
			{ 'hide-in-tablet': hideTablet },
			{ 'hide-in-mobile': hideMobile },
			`has-${ columnsGap }-gap`,
			`has-vertical-${ verticalAlign }`
		);

		return (
			<Tag
				className={ classes }
				id={ id }
				style={ style }
			>
				<div
					className="wp-themeisle-block-overlay"
					style={ overlayStyle }
				>
				</div>

				<Separators
					type="top"
					front={ true }
					style={ dividerTopType }
					fill={ dividerTopColor }
					invert={ dividerTopInvert }
				/>

				<div
					className="innerblocks-wrap"
					style={ innerStyle }
				>
					<InnerBlocks.Content />
				</div>

				<Separators
					type="bottom"
					front={ true }
					style={ dividerBottomType }
					fill={ dividerBottomColor }
					invert={ dividerBottomInvert }
				/>
			</Tag>
		);
	}
});
