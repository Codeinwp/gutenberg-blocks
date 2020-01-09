/**
 * External dependencies
 */
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	const Tag = attributes.columnsHTMLTag;

	let background, borderStyle, borderRadiusStyle, boxShadowStyle;

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
		...boxShadowStyle
	};

	return (
		<Tag
			className={ className }
			id={ attributes.id }
			style={ style }
		>
			<InnerBlocks.Content />
		</Tag>
	);
};

export default Save;
