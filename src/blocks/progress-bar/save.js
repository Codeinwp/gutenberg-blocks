const { RichText } = wp.blockEditor;

const ProgressBar = ({ attributes }) => {

	return (
		<progress-bar { ...attributes }>
			<div className="wp-themeisle-block-progress-bar">
				<div className="wp-themeisle-block-progress-bar__content">
					<RichText.Content
						tagName="p"
						className="wp-themeisle-block-progress-bar__title"
						value={  attributes.text }
					/>
					<span id="value" className="wp-themeisle-block-progress-bar__value">
					</span>
				</div>
				<div id="container"/>
			</div>
		</progress-bar>
	);
};

export default ProgressBar;
