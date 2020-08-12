
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;

import Inspector from './inspector.js';

const ProgressBar = ({ attributes, setAttributes }) => {

	const { text, value, progressColor, backgroundColor, borderRadius, height } = attributes;

	const setText = value => {
		setAttributes({ text: value });
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div className="wp-themeisle-block-progress-bar">
				<div className="wp-themeisle-block-progress-bar__content">
					<RichText
						tagName="p"
						className="wp-themeisle-block-progress-bar__title"
						placeholder={ __( 'Write a title…' ) }
						value={ text }
						onChange={ setText }
						multiline={ false }
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
