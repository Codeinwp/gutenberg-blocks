const { RichText } = wp.blockEditor;
import classnames from 'classnames';
import { BarType } from './edit.js';

const ProgressBar = ({ attributes }) => {

	attributes.animated = attributes.animated && 'true';
	attributes.coloredProgress = attributes.coloredProgress && 'true';
	attributes.strokeAnimation = attributes.strokeAnimation && 'true';
	attributes.hideValue = attributes.hideValue && 'true';

	return (
		<div className="wp-themeisle-block-progress-bar" { ...attributes }>
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
				<div
					id="container"
					className={ classnames ( 'wp-themeisle-block-progress-bar__bar', { 'is-bar': attributes.type === BarType.BAR }) }
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
