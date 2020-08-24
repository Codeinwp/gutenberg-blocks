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
			{
				attributes.type === BarType.BAR && (
					<div className="wp-themeisle-block-progress-bar-content-top">
						<RichText.Content
							tagName="p"
							className="wp-themeisle-block-progress-bar__title"
							value={  attributes.text }
						/>
					</div>
				)
			}
			<div style={{ height: `${attributes.height}px` }}>
				<div
					id="container"
					className={ classnames ( 'wp-themeisle-block-progress-bar__bar', { 'is-bar': attributes.type === BarType.BAR }) }
				></div>
			</div>
			{
				attributes.type !== BarType.BAR && (
					<div className="wp-themeisle-block-progress-bar-content-bottom">
						<RichText.Content
							tagName="p"
							value={  attributes.text }
						/>
					</div>
				)
			}
		</div>
	);
};

export default ProgressBar;
