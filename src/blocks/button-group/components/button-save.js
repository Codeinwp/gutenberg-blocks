/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;

const { Fragment } = wp.element;

const Button = ({
	index,
	attributes
}) => {
	const style = {
		fontSize: `${ attributes.fontSize }px`,
		fontFamily: attributes.fontFamily,
		fontWeight: attributes.fontVariant,
		fontStyle: attributes.fontStyle,
		textTransform: attributes.textTransform,
		lineHeight: attributes.lineHeight && `${ attributes.lineHeight }px`,
		borderWidth: `${ attributes.data[index].borderSize }px`,
		borderRadius: `${ attributes.data[index].borderRadius }px`,
		padding: `${ attributes.data[index].paddingTopBottom }px ${ attributes.data[index].paddingLeftRight }px `
	};

	return (
		<Fragment>
			<a
				href={ attributes.data[index].link }
				target={ attributes.data[index].newTab ? '_blank' : '_self' }
				className={ classnames(
					'wp-block-themeisle-blocks-button',
					`wp-block-themeisle-blocks-button-${ index }`
				) }
				style={ style }
				rel="noopener noreferrer"
			>
				{ ( 'left' === attributes.data[index].iconType || 'only' === attributes.data[index].iconType ) && (
					<i className={ classnames(
						attributes.data[index].prefix,
						'fa-fw',
						`fa-${ attributes.data[index].icon }`,
						{ 'margin-right': 'left' === attributes.data[index].iconType }
					) }>
					</i>
				) }

				{ 'only' !== attributes.data[index].iconType && (
					<RichText.Content
						tagName="span"
						value={ attributes.data[index].text }
					/>
				) }

				{ 'right' === attributes.data[index].iconType && (
					<i className={ `${ attributes.data[index].prefix } fa-fw fa-${ attributes.data[index].icon } margin-left` }></i>
				) }
			</a>
		</Fragment>
	);
};

export default Button;
