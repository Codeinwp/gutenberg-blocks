/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

/**
 * Internal dependencies
 */
import { BarType } from './constants.js';

const ProgressBar = ({ attributes }) => {

	return (
		<div className="wp-themeisle-block-progress-bar"
			data-type= { attributes.type }
			data-percentage={ attributes.percentage }
			data-progress-color={ attributes.progressColor }
			data-stroke-width={ attributes.strokeWidth }
			data-trail-color={ attributes.trailColor }
			data-trail-width={ attributes.trailWidth }
			data-border-radius={ attributes.borderRadius }
			data-height={ attributes.height }
			data-animated={ attributes.animated }
			data-hide-value={ attributes.hideValue }
			data-duration={ attributes.duration }
			data-colored-progress={ attributes.coloredProgress }
			data-start-color={ attributes.startColor }
			data-end-color={ attributes.endColor }
			data-stroke-animation={ attributes.strokeAnimation }
			data-easing={ attributes.easing }
			data-text-color={ attributes.textColor }
			data-warnings={ attributes.warnings }
		>
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
