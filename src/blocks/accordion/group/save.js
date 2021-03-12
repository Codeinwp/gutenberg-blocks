/**
 * WordPress dependencies.
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
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
