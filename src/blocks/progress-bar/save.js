import classnames from 'classnames';

import { fontRatio } from './constants.js';


const Save = ({ attributes }) => {
	return (
		<div
			className="wp-themeisle-progress-bar-block"
			data-percent={ attributes.percentage }
			data-duration={ attributes.duration }
			data-height={ attributes.height }
		>

			<div className="wp-themeisle-progress-bar-outer-content">
				{'outer' === attributes.titleStyle && (
					<h3 className="wp-themeisle-block-progress-bar-outer-content__title">
						{`${ attributes.title }`}
					</h3>
				)}
				{ 'outer' === attributes.percentagePosition && (
					<div
						id="percentage"
						className={ classnames( 'wp-themeisle-progress-bar-skill-bar-percent', 'wp-themeisle-block-progress-bar-outer-content__value' )} >
						style={{ visibility: 'hidden' }}
						{ `${ attributes.percentage }%` }
					</div>
				)}
			</div>


			<div
				className="wp-themeisle-progress-bar-skillbar"
				style={{background: attributes.backgroundColor, borderRadius: `${ attributes.borderRadius }px`, height: `${ attributes.height }px` }}
			>
				{
					( 'default' === attributes.titleStyle || 'simple' === attributes.titleStyle ) && (
						<div
							className={
								classnames( 'wp-themeisle-progress-bar-skillbar-title', { 'transparent': 'simple' === attributes.titleStyle})
							}
							style={
								{
									fontSize: `${ attributes.height * fontRatio }px`,
									background: attributes.barBackgroundColor,
									height: `${ attributes.height }px`,
									borderRadius: `${ attributes.borderRadius }px`
								}
							}
						>
							<span style={{height: `${ attributes.height }px`, borderRadius: `${ attributes.borderRadius }px 0px 0px ${ attributes.borderRadius }px`}}>
								{`${ attributes.title }`}
							</span>
						</div>
					)
				}

				<div
					className="wp-themeisle-progress-bar-skillbar-bar"
					style={{background: attributes.barBackgroundColor, borderRadius: `${ attributes.borderRadius }px`, height: `${ attributes.height }px`}}
				>
					{ 'tooltip' === attributes.percentagePosition  && (
						<span
							id="percentage"
							className="wp-themeisle-progress-bar-skillbar-tooltip"
							style={{ visibility: 'hidden' }}
						>
							{ `${ attributes.percentage }%` }
							 <span className="wp-themeisle-progress-bar-skillbar-arrow"></span>
						</span>
					)}
				</div>
				{ 'inline' === attributes.percentagePosition && (
					<div
						id="percentage"
						className="wp-themeisle-progress-bar-skill-bar-percent"
						style={{fontSize: `${ attributes.height * fontRatio }px`, height: `${ attributes.height }px`, visibility: 'hidden' }}
					>
						{ `${ attributes.percentage }%` }
					</div>
				)}
			</div>
		</div>
	);
};

export default Save;
