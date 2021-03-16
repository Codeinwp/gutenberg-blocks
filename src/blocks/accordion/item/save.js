/**
 * WordPress dependencies.
 */
const { InnerBlocks, RichText } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	return (
		<details
			className={ className }
			open={ attributes.initialOpen ? true : false }
		>
			<summary className="wp-block-themeisle-blocks-accordion-item__title">
				<RichText.Content
					tagName="div"
					value={ attributes.title }
				/>
			</summary>

			<div className="wp-block-themeisle-blocks-accordion-item__content">
				<InnerBlocks.Content />
			</div>
		</details>
	);
};

export default Save;
