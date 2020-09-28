/**
 * WordPress dependencies.
 */

const { InnerBlocks } = wp.blockEditor;

const Save = () => {

	return (
		<div
			className="wp-block-themeisle-blocks-accordion-block"
		>
			<div
				className="wp-block-themeisle-blocks-accordion-block-tabs"
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
