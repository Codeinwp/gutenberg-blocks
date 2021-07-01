/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const Save = ({ attributes }) => {
	return (
		<div
			id={ attributes.id }
			className="wp-block-themeisle-blocks-tabs"
		>
			{/* <div className="wp-block-themeisle-blocks-tabs__header">
				{ attributes.headers?.map( tabHeader => {
					return (
						<div className="wp-block-themeisle-blocks-tabs__header_item" data-tab-id={ tabHeader.id }>
							<div>{ tabHeader.title }</div>
						</div>
					);
				}) }
			</div> */}

			<div className="wp-block-themeisle-blocks-tabs__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
