/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			className={ classnames(
				className,
				'wp-block-button'
			) }
		>
			<a
				href={ attributes.link }
				target={ attributes.newTab ? '_blank' : '_self' }
				rel="noopener noreferrer"
				className="wp-block-button__link"
			>
				{ ( 'left' === attributes.iconType || 'only' === attributes.iconType ) && (
					<i className={ classnames(
						attributes.prefix,
						'fa-fw',
						`fa-${ attributes.icon }`,
						{ 'margin-right': 'left' === attributes.iconType }
					) }>
					</i>
				) }

				{ 'only' !== attributes.iconType && (
					<RichText.Content
						tagName="span"
						value={ attributes.text }
					/>
				) }

				{ 'right' === attributes.iconType && (
					<i className={ `${ attributes.prefix } fa-fw fa-${ attributes.icon } margin-left` }></i>
				) }
			</a>
		</div>
	);
};

export default Save;
