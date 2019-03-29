/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	Button,
	Dashicon,
	PanelBody,
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
import { columnIcon } from '../../helpers/icons.js';

import layouts from './layouts.js';

import SizeControl from '../../components/size-control/index.js';

import BackgroundControl from './background-control/index.js';

import ControlPanelControl from '../../components/control-panel-control/index.js';

registerBlockType( 'themeisle-blocks/advanced-column', {
	title: __( 'Section Column' ),
	description: __( 'A single column within a Section block.' ),
	parent: [ 'themeisle-blocks/advanced-columns' ],
	icon: columnIcon,
	category: 'themeisle-blocks',
	attributes: {
		id: {
			type: 'string'
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
		marginRight: {
			type: 'number',
			default: 0
		},
		marginRightTablet: {
			type: 'number',
			default: 0
		},
		marginRightMobile: {
			type: 'number',
			default: 0
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
		marginLeft: {
			type: 'number',
			default: 0
		},
		marginLeftTablet: {
			type: 'number',
			default: 0
		},
		marginLeftMobile: {
			type: 'number',
			default: 0
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
		columnsHTMLTag: {
			type: 'string',
			default: 'div'
		},
		columnWidth: {
			type: 'string'
		}
	},

	supports: {
		inserter: false,
		reusable: false,
		html: false
	},

	edit: compose([

		withDispatch( ( dispatch ) => {
			const { updateBlockAttributes } = dispatch( 'core/editor' );

			return {
				updateBlockAttributes
			};
		}),

		withSelect( ( select, props ) => {
			const { clientId } = props;
			const {
				getAdjacentBlockClientId,
				getBlock,
				getBlockRootClientId
			} = select( 'core/editor' );
			const adjacentBlockClientId = getAdjacentBlockClientId( clientId );
			const adjacentBlock = getBlock( adjacentBlockClientId );
			const parentClientId = getBlockRootClientId( clientId );
			const parentBlock = getBlock( parentClientId );

			return {
				adjacentBlockClientId,
				adjacentBlock,
				parentClientId,
				parentBlock,
				props
			};
		}),

		withState({
			tab: 'layout',
			paddingViewType: 'desktop',
			marginViewType: 'desktop',
			currentWidth: 0,
			nextWidth: 0
		}),

		withViewportMatch({
			isLarger: '>= large',
			isLarge: '<= large',
			isSmall: '>= small',
			isSmaller: '<= small'
		})

	])( ({
		tab,
		paddingViewType,
		marginViewType,
		currentWidth,
		nextWidth,
		setState,
		isLarger,
		isLarge,
		isSmall,
		isSmaller,
		props,
		adjacentBlockClientId,
		adjacentBlock,
		parentClientId,
		parentBlock,
		updateBlockAttributes
	}) => {
		const {
			id,
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
			marginRight,
			marginRightTablet,
			marginRightMobile,
			marginBottom,
			marginBottomTablet,
			marginBottomMobile,
			marginLeft,
			marginLeftTablet,
			marginLeftMobile,
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
			columnsHTMLTag,
			columnWidth
		} = props.attributes;

		if ( id === undefined || id.substr( id.length - 8 ) !== props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-advanced-column-${ props.clientId.substr( 0, 8 ) }`;
			props.setAttributes({ id: instanceId });
		}

		const isDesktop = ( isLarger && ! isLarge && isSmall && ! isSmaller );

		const isTablet = ( ! isLarger && ! isLarge && isSmall && ! isSmaller );

		const isMobile = ( ! isLarger && ! isLarge && ! isSmall && ! isSmaller );

		if ( columnWidth === undefined ) {
			( parentBlock.innerBlocks ).map( ( innerBlock, i ) => {
				if ( props.clientId === innerBlock.clientId ) {
					const columns = parentBlock.attributes.columns;
					const layout = parentBlock.attributes.layout;
					updateBlockAttributes( props.clientId, {
						columnWidth: parseFloat( layouts[columns][layout][i])
					});
				}
			});
		}

		const columnContainer = document.getElementById( `block-${ props.clientId }` );

		if ( null !== columnContainer ) {
			if ( isDesktop ) {
				columnContainer.style.flexBasis = `${ columnWidth }%`;
			} else {
				columnContainer.style.flexBasis = '';
			}
		}

		const Tag = columnsHTMLTag;

		let stylesheet, background, borderStyle, borderRadiusStyle, boxShadowStyle;

		if ( isDesktop ) {
			stylesheet = {
				paddingTop: 'linked' === paddingType ? `${ padding }px` : `${ paddingTop }px`,
				paddingRight: 'linked' === paddingType ? `${ padding }px` : `${ paddingRight }px`,
				paddingBottom: 'linked' === paddingType ? `${ padding }px` : `${ paddingBottom }px`,
				paddingLeft: 'linked' === paddingType ? `${ padding }px` : `${ paddingLeft }px`,
				marginTop: 'linked' === marginType ? `${ margin }px` : `${ marginTop }px`,
				marginRight: 'linked' === marginType ? `${ margin }px` : `${ marginRight }px`,
				marginBottom: 'linked' === marginType ? `${ margin }px` : `${ marginBottom }px`,
				marginLeft: 'linked' === marginType ? `${ margin }px` : `${ marginLeft }px`
			};
		}

		if ( isTablet ) {
			stylesheet = {
				paddingTop: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingTopTablet }px`,
				paddingRight: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingRightTablet }px`,
				paddingBottom: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingBottomTablet }px`,
				paddingLeft: 'linked' === paddingTypeTablet ? `${ paddingTablet }px` : `${ paddingLeftTablet }px`,
				marginTop: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginTopTablet }px`,
				marginRight: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginRightTablet }px`,
				marginBottom: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginBottomTablet }px`,
				marginLeft: 'linked' === marginTypeTablet ? `${ marginTablet }px` : `${ marginLeftTablet }px`
			};
		}

		if ( isMobile ) {
			stylesheet = {
				paddingTop: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingTopMobile }px`,
				paddingRight: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingRightMobile }px`,
				paddingBottom: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingBottomMobile }px`,
				paddingLeft: 'linked' === paddingTypeMobile ? `${ paddingMobile }px` : `${ paddingLeftMobile }px`,
				marginTop: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginTopMobile }px`,
				marginRight: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginRightMobile }px`,
				marginBottom: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginBottomMobile }px`,
				marginLeft: 'linked' === marginTypeMobile ? `${ marginMobile }px` : `${ marginLeftMobile }px`
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
			...boxShadowStyle
		};

		const changePaddingViewType = value => {
			setState({ paddingViewType: value });
		};

		const changeMarginViewType = value => {
			setState({ marginViewType: value });
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

		const changeMarginRight = value => {
			if ( 'desktop' === marginViewType ) {
				props.setAttributes({ marginRight: value });
			}
			if ( 'tablet' === marginViewType ) {
				props.setAttributes({ marginRightTablet: value });
			}
			if ( 'mobile' === marginViewType ) {
				props.setAttributes({ marginRightMobile: value });
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

		const changeMarginLeft = value => {
			if ( 'desktop' === marginViewType ) {
				props.setAttributes({ marginLeft: value });
			}
			if ( 'tablet' === marginViewType ) {
				props.setAttributes({ marginLeftTablet: value });
			}
			if ( 'mobile' === marginViewType ) {
				props.setAttributes({ marginLeftMobile: value });
			}
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

		const changeColumnsHTMLTag = value => {
			props.setAttributes({ columnsHTMLTag: value });
		};

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
								title={ __( 'Padding & Margin' ) }
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
										label={ __( 'Margin Right' ) }
										beforeIcon="arrow-right"
										value={
											( 'desktop' === marginViewType ) && marginRight ||
											( 'tablet' === marginViewType ) && marginRightTablet ||
											( 'mobile' === marginViewType ) && marginRightMobile
										}
										onChange={ changeMarginRight }
										min={ -1000 }
										max={ 1000 }
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

									<RangeControl
										label={ __( 'Margin Left' ) }
										beforeIcon="arrow-left"
										value={
											( 'desktop' === marginViewType ) && marginLeft ||
											( 'tablet' === marginViewType ) && marginLeftTablet ||
											( 'mobile' === marginViewType ) && marginLeftMobile
										}
										onChange={ changeMarginLeft }
										min={ -1000 }
										max={ 1000 }
									/>
								</SizeControl>
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
											label={ 'Shadow Properties' }
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
						</Fragment>
					) || 'advanced' === tab && (

						<PanelBody
							title={ __( 'Section Settings' ) }
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

					) }
				</InspectorControls>

				<ResizableBox
					className="block-library-spacer__resize-container wp-themeisle-block-advanced-column-resize-container"
					enable={ {
						right: adjacentBlockClientId ? true : false
					} }
					handleWrapperClass="wp-themeisle-block-advanced-column-resize-container-handle"
					onResizeStart={ ( event, direction, elt, delta ) => {
						const handle = document.querySelector( `#block-${ props.clientId } .wp-themeisle-block-advanced-column-resize-container-handle .components-resizable-box__handle` );
						const handleTooltipLeft = document.createElement( 'div' );
						const handleTooltipRight = document.createElement( 'div' );

						handleTooltipLeft.setAttribute( 'class', 'resizable-tooltip resizable-tooltip-left' );
						handleTooltipLeft.innerHTML = `${ parseFloat( columnWidth ).toFixed( 0 ) }%`;
						handle.appendChild( handleTooltipLeft );
						handleTooltipRight.setAttribute( 'class', 'resizable-tooltip resizable-tooltip-right' );
						handleTooltipRight.innerHTML = `${ parseFloat( adjacentBlock.attributes.columnWidth ).toFixed( 0 ) }%`;
						handle.appendChild( handleTooltipRight );

						setState({
							currentWidth: columnWidth,
							nextWidth: adjacentBlock.attributes.columnWidth
						});
						props.toggleSelection( false );
					} }
					onResize={ ( event, direction, elt, delta ) => {
						const parent = document.getElementById( `block-${ parentClientId }` );
						const parentWidth = parent.getBoundingClientRect().width;
						const changedWidth = ( delta.width / parentWidth ) * 100;
						const width = parseFloat( currentWidth ) + changedWidth;
						const nextColumnWidth = nextWidth - changedWidth;
						const handleTooltipLeft = document.querySelector( '.resizable-tooltip-left' );
						const handleTooltipRight = document.querySelector( '.resizable-tooltip-right' );

						if ( 10 <= width && 10 <= nextColumnWidth ) {
							handleTooltipLeft.innerHTML = `${ width.toFixed( 0 ) }%`;
							handleTooltipRight.innerHTML = `${ nextColumnWidth.toFixed( 0 ) }%`;

							props.setAttributes({ columnWidth: width.toFixed( 2 ) });
							updateBlockAttributes( adjacentBlockClientId, {
								columnWidth: nextColumnWidth.toFixed( 2 )
							});
						}

					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						const handleTooltipLeft = document.querySelector( '.resizable-tooltip-left' );
						const handleTooltipRight = document.querySelector( '.resizable-tooltip-right' );

						handleTooltipLeft.parentNode.removeChild( handleTooltipLeft );
						handleTooltipRight.parentNode.removeChild( handleTooltipRight );
						props.toggleSelection( true );
					} }
				>
					<Tag
						className={ props.className }
						id={ id }
						style={ style }
					>
						<InnerBlocks templateLock={ false } />
					</Tag>
				</ResizableBox>
			</Fragment>
		);
	}),

	save: props => {
		const {
			id,
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
			columnsHTMLTag
		} = props.attributes;

		const Tag = columnsHTMLTag;

		let background, borderStyle, borderRadiusStyle, boxShadowStyle;

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
			...boxShadowStyle
		};

		return (
			<Tag
				className={ props.className }
				id={ id }
				style={ style }
			>
				<InnerBlocks.Content />
			</Tag>
		);
	}
});
