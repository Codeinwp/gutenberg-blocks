/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

/**
 * Internal dependencies
 */
import Separators from '../components/separators/index.js';

const Save = ({
	attributes,
	className
}) => {
	const Tag = attributes.columnsHTMLTag;

	let background, overlayBackground, borderStyle, borderRadiusStyle, boxShadowStyle;

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

		background = {
			background: `${ attributes.backgroundGradientType }-gradient( ${ direction }, ${ attributes.backgroundGradientFirstColor || 'rgba( 0, 0, 0, 0 )' } ${ attributes.backgroundGradientFirstLocation }%, ${ attributes.backgroundGradientSecondColor || 'rgba( 0, 0, 0, 0 )' } ${ attributes.backgroundGradientSecondLocation }% )`
		};
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
		...background,
		...borderStyle,
		...borderRadiusStyle,
		...boxShadowStyle,
		justifyContent: attributes.horizontalAlign
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
		mixBlendMode: attributes.backgroundOverlayBlend
	};

	let innerStyle = {};

	if ( attributes.columnsWidth ) {
		innerStyle = {
			maxWidth: attributes.columnsWidth + 'px'
		};
	}

	const desktopLayout = attributes.hide ? '' : `has-desktop-${ attributes.layout }-layout`;
	const tabletLayout = attributes.hideTablet ? '' : `has-tablet-${ attributes.layoutTablet }-layout`;
	const mobileLayout = attributes.hideMobile ? '' : `has-mobile-${ attributes.layoutMobile }-layout`;

	const classes = classnames(
		className,
		`has-${ attributes.columns }-columns`,
		desktopLayout,
		tabletLayout,
		mobileLayout,
		{ 'hide-in-desktop': attributes.hide },
		{ 'hide-in-tablet': attributes.hideTablet },
		{ 'hide-in-mobile': attributes.hideMobile },
		`has-${ attributes.columnsGap }-gap`,
		`has-vertical-${ attributes.verticalAlign }`
	);

	return (
		<Tag
			className={ classes }
			id={ attributes.id }
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
				style={ attributes.dividerTopType }
				fill={ attributes.dividerTopColor }
				invert={ attributes.dividerTopInvert }
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
				style={ attributes.dividerBottomType }
				fill={ attributes.dividerBottomColor }
				invert={ attributes.dividerBottomInvert }
			/>
		</Tag>
	);
};

export default Save;
