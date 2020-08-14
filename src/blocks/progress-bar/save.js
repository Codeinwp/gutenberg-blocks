import classname from 'classnames';


const { RichText } = wp.blockEditor;

const ProgressBar = ({ attributes }) => {

	return (
		<div className="wp-themeisle-block-progress-bar">
			<div className="wp-themeisle-block-progress-bar__content">
				<RichText.Content
					tagName="p"
					className="wp-themeisle-block-progress-bar__title"
					value={  attributes.text }
				/>
				<span className="wp-themeisle-block-progress-bar__value">
					{
						! attributes.hideValue && `${ attributes.value}%`
					}
				</span>
			</div>
			<div
				className='wp-themeisle-block-progress-bar__bar'
				style={{ backgroundColor: attributes.backgroundColor, borderRadius: `${attributes.borderRadius}px`, height: `${attributes.height}px` }}>
				<div
					className={
						classname( 'wp-themeisle-block-progress-bar__progress', { 'has-animation': attributes.animated }, { 'has-no-animation': ! attributes.animated })
					}
					style={{ backgroundColor: attributes.progressColor, '--width': `${attributes.value}%`, maxWidth: `${attributes.value}%`, borderRadius: `${attributes.borderRadius}px` }}>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
