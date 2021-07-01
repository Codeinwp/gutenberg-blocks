/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	InnerBlocks,
	RichText
} = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			className={ className }
			data-title={ attributes.title }
		>
			<RichText.Content
				tagName="div"
				className="wp-block-themeisle-blocks-tabs-item__header"
				value={ attributes.title || __( 'Untitled Tab' ) }
				tabIndex="0"
			/>

			<div className="wp-block-themeisle-blocks-tabs-item__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
