/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InnerBlocks } = wp.blockEditor;

const Save = ({ className }) => {
	return (
		<div className={ className } >
			<InnerBlocks.Content/>
		</div>
	);
};

export default Save;
