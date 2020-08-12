const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;

const ProgressBar = ({  attributes }) => {

	const { text, value, progressColor, backgroundColor, borderRadius, height } = attributes;

	return (
		<Fragment>
			<div className="wp-themeisle-block-progress-bar">
				<div className="wp-themeisle-block-progress-bar__content">
					<RichText.Content
						tagName="p"
						className="wp-themeisle-block-progress-bar__title"
						value={ text }
					/>
					<span className="wp-themeisle-block-progress-bar__value">
						{value}%
					</span>
				</div>
				<div className="wp-themeisle-block-progress-bar__bar" style={{ backgroundColor, borderRadius: `${borderRadius}px`, height: `${height}px` }}>
					<div className="wp-themeisle-block-progress-bar__progress" style={{ backgroundColor: progressColor, width: `${value}%`, borderRadius: `${borderRadius}px` }}>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProgressBar;
