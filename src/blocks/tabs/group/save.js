const { InnerBlocks } = wp.blockEditor;

const Save = ({ attributes }) => {
	return (
		<div id={ attributes.id } className="wp-block-themeisle-blocks-tabs">
			<div className="wp-block-themeisle-blocks-tabs-headers">
				{
					attributes.headers?.map( tabHeader => {
						return (
							<div className="wp-block-themeisle-blocks-tabs-header" data-tab-id={ tabHeader.id }>
								<div>{tabHeader.title}</div>
							</div>
						);
					})
				}
			</div>
			<div className="wp-block-themeisle-blocks-tabs-content">
				<InnerBlocks.Content
				/>
			</div>
		</div>
	);
};

export default Save;
