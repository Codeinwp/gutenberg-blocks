/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	let textShadowStyle;

	if ( attributes.textShadow ) {
		textShadowStyle = {
			textShadow: `${ attributes.textShadowHorizontal }px ${ attributes.textShadowVertical }px ${ attributes.textShadowBlur }px ${  hexToRgba( ( attributes.textShadowColor ? attributes.textShadowColor : '#000000' ), attributes.textShadowColorOpacity ) }`
		};
	}

	const style = {
		color: attributes.headingColor,
		fontFamily: attributes.fontFamily,
		fontWeight: 'regular' === attributes.fontVariant ? 'normal' : attributes.fontVariant,
		fontStyle: attributes.fontStyle,
		textTransform: attributes.textTransform,
		lineHeight: attributes.lineHeight && `${ attributes.lineHeight }px`,
		letterSpacing: attributes.letterSpacing && `${ attributes.letterSpacing }px`,
		...textShadowStyle
	};

	return (
		<RichText.Content
			tagName={ attributes.tag }
			value={ attributes.content }
			id={ attributes.id }
			className={ classnames(
				attributes.id,
				className
			) }
			style={ style }
		/>
	);
};

export default Save;
