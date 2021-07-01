/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			id={ attributes.id }
			className={ className }
		>
			<div className="wp-block-themeisle-blocks-tabs__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
