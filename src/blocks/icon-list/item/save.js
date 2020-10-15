import classnames from 'classnames';

const { RichText } = wp.blockEditor;


const Edit = ({
	attributes,
	className
}) => {

	const iconClassName =  `${ attributes.iconPrefix } fa-${ attributes.icon }`;

	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<i
				className={
					classnames(
						iconClassName,
						{ 'wp-block-themeisle-blocks-icon-list-item-icon': ! attributes.iconColor },
						{ 'wp-block-themeisle-blocks-icon-list-item-icon-custom': attributes.iconColor }
					)
				}
			></i>
			<RichText.Content
				tagName="p"
				className={
					classnames(
						{ 'wp-block-themeisle-blocks-icon-list-item-title': ! attributes.titleColor },
						{ 'wp-block-themeisle-blocks-icon-list-item-title-custom': attributes.titleColor }
					)
				}
				value={ attributes.title }
			/>
		</div>
	);
};

export default Edit;
