/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

const Edit = ({ attributes, className }) => {
	return (
		<div className={className} id={attributes.id}>
			<InnerBlocks.Content />
		</div>
	);
};

export default Edit;
