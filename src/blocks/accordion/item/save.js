/**
 * WordPress dependencies.
 */
const { InnerBlocks, RichText } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	return (
		<details className={ className }>
			<RichText.Content
				tagName="summary"
				className="wp-block-themeisle-blocks-accordion-item__title"
				value={ attributes.title }
			/>

			<div className="wp-block-themeisle-blocks-accordion-item__content">
				<InnerBlocks.Content />
			</div>
		</details>
	);
};

export default Save;
