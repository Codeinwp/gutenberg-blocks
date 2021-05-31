const { InnerBlocks, RichText } = wp.blockEditor;

const Save = ({ attributes }) => {
	return (
		<div id={attributes.id} className="wp-block-themeisle-blocks-tabs-item">
			<div className="wp-block-themeisle-blocks-tabs-item-header">
				<RichText.Content
					tagName="div"
					value={ attributes.title }
				/>
			</div>
			<div  className="wp-block-themeisle-blocks-tabs-item-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
