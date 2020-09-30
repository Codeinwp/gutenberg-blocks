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
			className={ className }
			id={ attributes.id }
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
