/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const Save = ({ className }) => {
	return (
		<div className={ className } >
			<InnerBlocks.Content/>
		</div>
	);
};

export default Save;
