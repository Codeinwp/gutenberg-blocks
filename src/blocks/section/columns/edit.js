/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies
 */
const { times } = lodash;

const { compose } = wp.compose;

const {
	withDispatch,
	withSelect
} = wp.data;

const {
	__experimentalBlockNavigationList,
	InnerBlocks
} = wp.blockEditor;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

const { withViewportMatch } = wp.viewport;

/**
 * Internal dependencies
 */
import layouts from '../layouts.js';
import Inspector from './inspector.js';
import BlockNavigatorControl from '../../../components/block-navigator-control/index.js';
import Separators from '../components/separators/index.js';
import Onboarding from '../components/onboarding/index.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	name,
	updateBlockAttributes,
	sectionBlock,
	isLarger,
	isLarge,
	isSmall,
	isSmaller
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-advanced-columns-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				attrs = { ...window.themeisleGutenberg.globalDefaults[ name ] };
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-advanced-columns-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
		}
	};

	const [ dividerViewType, setDividerViewType ] = useState( 'top' );

	const isDesktop = ( isLarger && ! isLarge && isSmall && ! isSmaller );

	const isTablet = ( ! isLarger && ! isLarge && isSmall && ! isSmaller );

	const isMobile = ( ! isLarger && ! isLarge && ! isSmall && ! isSmaller );

	const Tag = attributes.columnsHTMLTag;

	let stylesheet, background, overlayBackground, borderStyle, borderRadiusStyle, boxShadowStyle;

	if ( isDesktop ) {
		stylesheet = {
			paddingRight: 'linked' === attributes.paddingType ? `${ attributes.padding }px` : `${ attributes.paddingRight }px`,
			paddingLeft: 'linked' === attributes.paddingType ? `${ attributes.padding }px` : `${ attributes.paddingLeft }px`,
			marginTop: 'linked' === attributes.marginType ? `${ attributes.margin }px` : `${ attributes.marginTop }px`,
			marginBottom: 'linked' === attributes.marginType ? `${ attributes.margin }px` : `${ attributes.marginBottom }px`,
			minHeight: 'custom' === attributes.columnsHeight ? `${ attributes.columnsHeightCustom }px` : attributes.columnsHeight
		};
	}

	if ( isTablet ) {
		stylesheet = {
			paddingRight: 'linked' === attributes.paddingTypeTablet ? `${ attributes.paddingTablet }px` : `${ attributes.paddingRightTablet }px`,
			paddingLeft: 'linked' === attributes.paddingTypeTablet ? `${ attributes.paddingTablet }px` : `${ attributes.paddingLeftTablet }px`,
			marginTop: 'linked' === attributes.marginTypeTablet ? `${ attributes.marginTablet }px` : `${ attributes.marginTopTablet }px`,
			marginBottom: 'linked' === attributes.marginTypeTablet ? `${ attributes.marginTablet }px` : `${ attributes.marginBottomTablet }px`,
			minHeight: 'custom' === attributes.columnsHeight ? `${ attributes.columnsHeightCustomTablet }px` : attributes.columnsHeight
		};
	}

	if ( isMobile ) {
		stylesheet = {
			paddingRight: 'linked' === attributes.paddingTypeMobile ? `${ attributes.paddingMobile }px` : `${ attributes.paddingRightMobile }px`,
			paddingLeft: 'linked' === attributes.paddingTypeMobile ? `${ attributes.paddingMobile }px` : `${ attributes.paddingLeftMobile }px`,
			marginTop: 'linked' === attributes.marginTypeMobile ? `${ attributes.marginMobile }px` : `${ attributes.marginTopMobile }px`,
			marginBottom: 'linked' === attributes.marginTypeMobile ? `${ attributes.marginMobile }px` : `${ attributes.marginBottomMobile }px`,
			minHeight: 'custom' === attributes.columnsHeight ? `${ attributes.columnsHeightCustomMobile }px` : attributes.columnsHeight
		};
	}

	if ( 'color' === attributes.backgroundType ) {
		background = {
			background: attributes.backgroundColor
		};
	}

	if ( 'image' === attributes.backgroundType ) {
		background = {
			backgroundImage: `url( '${ attributes.backgroundImageURL }' )`,
			backgroundAttachment: attributes.backgroundAttachment,
			backgroundPosition: attributes.backgroundPosition,
			backgroundRepeat: attributes.backgroundRepeat,
			backgroundSize: attributes.backgroundSize
		};
	}

	if ( 'gradient' === attributes.backgroundType ) {
		let direction;

		if ( 'linear' === attributes.backgroundGradientType ) {
			direction = `${ attributes.backgroundGradientAngle }deg`;
		} else {
			direction = `at ${ attributes.backgroundGradientPosition }`;
		}

		if ( attributes.backgroundGradientFirstColor || attributes.backgroundGradientSecondColor ) {
			background = {
				background: `${ attributes.backgroundGradientType }-gradient( ${ direction }, ${ attributes.backgroundGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ attributes.backgroundGradientFirstLocation }%, ${ attributes.backgroundGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ attributes.backgroundGradientSecondLocation }% )`
			};
		}
	}

	if ( 'linked' === attributes.borderType ) {
		borderStyle = {
			borderWidth: `${ attributes.border }px`,
			borderStyle: 'solid',
			borderColor: attributes.borderColor
		};
	}

	if ( 'unlinked' === attributes.borderType ) {
		borderStyle = {
			borderTopWidth: `${ attributes.borderTop }px`,
			borderRightWidth: `${ attributes.borderRight }px`,
			borderBottomWidth: `${ attributes.borderBottom }px`,
			borderLeftWidth: `${ attributes.borderLeft }px`,
			borderStyle: 'solid',
			borderColor: attributes.borderColor
		};
	}

	if ( 'linked' === attributes.borderRadiusType ) {
		borderRadiusStyle = {
			borderRadius: `${ attributes.borderRadius }px`
		};
	}

	if ( 'unlinked' === attributes.borderRadiusType ) {
		borderRadiusStyle = {
			borderTopLeftRadius: `${ attributes.borderRadiusTop }px`,
			borderTopRightRadius: `${ attributes.borderRadiusRight }px`,
			borderBottomRightRadius: `${ attributes.borderRadiusBottom }px`,
			borderBottomLeftRadius: `${ attributes.borderRadiusLeft }px`
		};
	}

	if ( true === attributes.boxShadow ) {
		boxShadowStyle = {
			boxShadow: `${ attributes.boxShadowHorizontal }px ${ attributes.boxShadowVertical }px ${ attributes.boxShadowBlur }px ${ attributes.boxShadowSpread }px ${  hexToRgba( ( attributes.boxShadowColor ? attributes.boxShadowColor : '#000000' ), attributes.boxShadowColorOpacity ) }`
		};
	}

	const style = {
		...stylesheet,
		...background,
		...borderStyle,
		...borderRadiusStyle,
		...boxShadowStyle,
		alignItems: attributes.horizontalAlign,
		justifyContent: attributes.verticalAlign
	};

	if ( 'color' === attributes.backgroundOverlayType ) {
		overlayBackground = {
			background: attributes.backgroundOverlayColor,
			opacity: attributes.backgroundOverlayOpacity / 100
		};
	}

	if ( 'image' === attributes.backgroundOverlayType ) {
		overlayBackground = {
			backgroundImage: `url( '${ attributes.backgroundOverlayImageURL }' )`,
			backgroundAttachment: attributes.backgroundOverlayAttachment,
			backgroundPosition: attributes.backgroundOverlayPosition,
			backgroundRepeat: attributes.backgroundOverlayRepeat,
			backgroundSize: attributes.backgroundOverlaySize,
			opacity: attributes.backgroundOverlayOpacity / 100
		};
	}

	if ( 'gradient' === attributes.backgroundOverlayType ) {
		let direction;

		if ( 'linear' === attributes.backgroundOverlayGradientType ) {
			direction = `${ attributes.backgroundOverlayGradientAngle }deg`;
		} else {
			direction = `at ${ attributes.backgroundOverlayGradientPosition }`;
		}

		overlayBackground = {
			background: `${ attributes.backgroundOverlayGradientType }-gradient( ${ direction }, ${ attributes.backgroundOverlayGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ attributes.backgroundOverlayGradientFirstLocation }%, ${ attributes.backgroundOverlayGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ attributes.backgroundOverlayGradientSecondLocation }% )`,
			opacity: attributes.backgroundOverlayOpacity / 100
		};
	}

	const overlayStyle = {
		...overlayBackground,
		mixBlendMode: attributes.backgroundOverlayBlend,
		filter: `blur( ${ attributes.backgroundOverlayFilterBlur / 10 }px ) brightness( ${ attributes.backgroundOverlayFilterBrightness / 10 } ) contrast( ${ attributes.backgroundOverlayFilterContrast / 10 } ) grayscale( ${ attributes.backgroundOverlayFilterGrayscale / 100 } ) hue-rotate( ${ attributes.backgroundOverlayFilterHue }deg ) saturate( ${ attributes.backgroundOverlayFilterSaturate / 10 } )`
	};

	let innerStyle = {};

	if ( attributes.columnsWidth ) {
		innerStyle = {
			maxWidth: attributes.columnsWidth + 'px'
		};
	}

	const classes = classnames(
		className,
		`has-${ attributes.columns }-columns`,
		`has-desktop-${ attributes.layout }-layout`,
		`has-tablet-${ attributes.layoutTablet }-layout`,
		`has-mobile-${ attributes.layoutMobile }-layout`,
		`has-${ attributes.columnsGap }-gap`
	);

	const updateColumnsWidth = ( columns, layout ) => {
		( sectionBlock.innerBlocks ).map( ( innerBlock, i ) => {
			updateBlockAttributes( innerBlock.clientId, {
				columnWidth: layouts[columns][layout][i]
			});
		});
	};

	const setupColumns = ( columns, layout ) => {
		if ( 1 >= columns ) {
			setAttributes({
				columns,
				layout,
				layoutTablet: 'equal',
				layoutMobile: 'equal'
			});
		} else {
			setAttributes({
				columns,
				layout,
				layoutTablet: 'equal',
				layoutMobile: 'collapsedRows'
			});
		}
	};

	const getPaddingBasedOnScreen = type => {
		let value;

		if ( 'top' == type ) {
			if ( isDesktop ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingTop;
			}

			if ( isTablet ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingTopTablet;
			}

			if ( isMobile ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingTopMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( isDesktop ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingBottom;
			}

			if ( isTablet ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingBottomTablet;
			}

			if ( isMobile ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingBottomMobile;
			}
		}

		return value;
	};

	let getDividerTopWidth = () => {
		let value;

		if ( isDesktop ) {
			value = attributes.dividerTopWidth;
		}

		if ( isTablet ) {
			value = attributes.dividerTopWidthTablet;
		}

		if ( isMobile ) {
			value = attributes.dividerTopWidthMobile;
		}

		return value;
	};

	getDividerTopWidth = getDividerTopWidth();

	let getDividerBottomWidth = () => {
		let value;

		if ( isDesktop ) {
			value = attributes.dividerBottomWidth;
		}

		if ( isTablet ) {
			value = attributes.dividerBottomWidthTablet;
		}

		if ( isMobile ) {
			value = attributes.dividerBottomWidthMobile;
		}

		return value;
	};

	getDividerBottomWidth = getDividerBottomWidth();

	let getDividerTopHeight = () => {
		let value;

		if ( isDesktop ) {
			value = attributes.dividerTopHeight;
		}

		if ( isTablet ) {
			value = attributes.dividerTopHeightTablet;
		}

		if ( isMobile ) {
			value = attributes.dividerTopHeightMobile;
		}

		return value;
	};

	getDividerTopHeight = getDividerTopHeight();

	let getDividerBottomHeight = () => {
		let value;

		if ( isDesktop ) {
			value = attributes.dividerBottomHeight;
		}

		if ( isTablet ) {
			value = attributes.dividerBottomHeightTablet;
		}

		if ( isMobile ) {
			value = attributes.dividerBottomHeightMobile;
		}

		return value;
	};

	getDividerBottomHeight = getDividerBottomHeight();

	const getColumnsTemplate = columns => {
		return times( columns, i => [ 'themeisle-blocks/advanced-column', { columnWidth: layouts[columns][attributes.layout][i] } ]);
	};

	if ( ! attributes.columns ) {
		return (
			<Onboarding
				clientId={ clientId }
				setupColumns={ setupColumns }
			/>
		);
	}

	return (
		<Fragment>
			{ __experimentalBlockNavigationList && <BlockNavigatorControl clientId={ clientId } /> }

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				updateColumnsWidth={ updateColumnsWidth }
				dividerViewType={ dividerViewType }
				setDividerViewType={ setDividerViewType }
			/>

			<Tag
				className={ classes }
				id={ attributes.id }
				style={ style }
			>
				<div
					className="wp-block-themeisle-blocks-advanced-columns-overlay"
					style={ overlayStyle }
				>
				</div>

				<div
					className="wp-themeisle-block-advanced-columns-padding-container"
					style={{
						height: `${ getPaddingBasedOnScreen( 'top' ) }px`
					}}
				>
					<div className="block-space-size">
						<span id="paddingTop">{ `${ getPaddingBasedOnScreen( 'top' ) }px` }</span>
					</div>
				</div>

				<Separators
					type="top"
					style={ attributes.dividerTopType }
					fill={ attributes.dividerTopColor }
					invert={ attributes.dividerTopInvert }
					width={ getDividerTopWidth }
					height={ getDividerTopHeight }
				/>

				<div
					className="innerblocks-wrap"
					style={ innerStyle }
				>
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/advanced-columns' ] }
						template={ getColumnsTemplate( attributes.columns ) }
						templateLock="all"
					/>
				</div>

				<Separators
					type="bottom"
					style={ attributes.dividerBottomType }
					fill={ attributes.dividerBottomColor }
					invert={ attributes.dividerBottomInvert }
					width={ getDividerBottomWidth }
					height={ getDividerBottomHeight }
				/>

				<div
					className="wp-themeisle-block-advanced-columns-padding-container"
					style={{
						height: `${ getPaddingBasedOnScreen( 'bottom' ) }px`
					}}
				>
					<div className="block-space-size">
						<span id="paddingBottom">{ `${ getPaddingBasedOnScreen( 'bottom' ) }px` }</span>
					</div>
				</div>
			</Tag>
		</Fragment>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );

		return {
			updateBlockAttributes
		};
	}),

	withSelect( ( select, props ) => {
		const { clientId } = props;
		const { getBlock } = select( 'core/block-editor' );
		const sectionBlock = getBlock( clientId );

		return {
			sectionBlock
		};
	}),

	withViewportMatch({
		isLarger: '>= large',
		isLarge: '<= large',
		isSmall: '>= small',
		isSmaller: '<= small'
	})

)( Edit );
