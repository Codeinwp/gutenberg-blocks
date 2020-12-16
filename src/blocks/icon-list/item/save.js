/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

/**
 * Internal dependencies
 */
import themeIsleIcons from './../../../helpers/themeisle-icons.js';

const Edit = ({
	attributes,
	className
}) => {
	const iconClassName =  `${ attributes.iconPrefix } fa-${ attributes.icon }`;
	const Icon = themeIsleIcons.icons[ attributes.icon ];

	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			{ 'themeisle-icons' === attributes.library && attributes.icon ? (
				<Icon
					className={ classnames(
						iconClassName,
						{ 'wp-block-themeisle-blocks-icon-list-item-icon': ! attributes.iconColor },
						{ 'wp-block-themeisle-blocks-icon-list-item-icon-custom': attributes.iconColor }
					) }
				/>
			) : (
				<i
					className={ classnames(
						iconClassName,
						{ 'wp-block-themeisle-blocks-icon-list-item-icon': ! attributes.iconColor },
						{ 'wp-block-themeisle-blocks-icon-list-item-icon-custom': attributes.iconColor }
					) }
				></i>
			) }

			<RichText.Content
				tagName="p"
				className={ classnames(
					{ 'wp-block-themeisle-blocks-icon-list-item-title': ! attributes.titleColor },
					{ 'wp-block-themeisle-blocks-icon-list-item-title-custom': attributes.titleColor }
				) }
				value={ attributes.title }
			/>
		</div>
	);
};

export default Edit;
