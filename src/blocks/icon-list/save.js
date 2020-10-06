

const { InnerBlocks } = wp.blockEditor;

const Edit = ({
	attributes,
	className
}) => {

	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<div
				className="wp-block-themeisle-blocks-icon-list-items"
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Edit;