/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	const Tag = attributes.columnsHTMLTag;

	return (
		<Tag
			className={ className }
			id={ attributes.id }
		>
			<InnerBlocks.Content />
		</Tag>
	);
};

export default Save;
