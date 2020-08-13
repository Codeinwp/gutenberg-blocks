import classname from 'classnames';


const { RichText } = wp.blockEditor;

const ProgressBar = ({  attributes }) => {

	const { text, value, progressColor, backgroundColor, borderRadius, height, animated, hideValue } = attributes;

	return (
		<div className="wp-themeisle-block-progress-bar">
			<div className="wp-themeisle-block-progress-bar__content">
				<RichText.Content
					tagName="p"
					className="wp-themeisle-block-progress-bar__title"
					value={ text }
				/>
				<span className="wp-themeisle-block-progress-bar__value">
					{
						hideValue && `${value}%`
					}
				</span>
			</div>
			<div
				className='wp-themeisle-block-progress-bar__bar'
				style={{ backgroundColor, borderRadius: `${borderRadius}px`, height: `${height}px` }}>
				<div
					className={
						classname( 'wp-themeisle-block-progress-bar__progress', { 'has-animation': animated }, { 'has-no-animation': ! animated })
					}
					style={{ backgroundColor: progressColor, '--width': `${value}%`, maxWidth: `${value}%`, borderRadius: `${borderRadius}px` }}>

				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
