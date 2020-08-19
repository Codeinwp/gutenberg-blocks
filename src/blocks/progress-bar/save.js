const { RichText } = wp.blockEditor;

const ProgressBar = ({ attributes }) => {

	return (
		<div className="wp-themeisle-block-progress-bar">
			<progress-bar { ...attributes }>
				<div className="wp-themeisle-block-progress-bar__content">
					<RichText.Content
						tagName="p"
						className="wp-themeisle-block-progress-bar__title"
						value={  attributes.text }
					/>
					<span id="value" className="wp-themeisle-block-progress-bar__value">
					</span>
				</div>
				<div style={{ height: `${attributes.height}px` }}>
					<div id="container" className="wp-themeisle-block-progress-bar__bar"/>
				</div>
			</progress-bar>
		</div>
	);
};

export default ProgressBar;
