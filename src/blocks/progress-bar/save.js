/**
 * External dependencies
 */
import classnames from 'classnames';

const Save = ({ attributes }) => {
	const fontRatio = 0.342;

	return (
		<div
			className={ attributes.className }
			data-percent={ attributes.percentage }
			data-duration={ attributes.duration }
		>
			{ ( 'outer' === attributes.titleStyle || 'outer' === attributes.percentagePosition ) && (
				<div className="wp-block-themeisle-blocks-progress-bar__outer">
					{ 'outer' === attributes.titleStyle && (
						<span className="wp-block-themeisle-blocks-progress-bar__outer__title">
							{ attributes.title }
						</span>
					) }

					{ 'outer' === attributes.percentagePosition && (
						<div className="wp-block-themeisle-blocks-progress-bar__outer__value wp-block-themeisle-blocks-progress-bar__number">
							{ attributes.percentage }
						</div>
					)}
				</div>
			) }

			<div
				className="wp-block-themeisle-blocks-progress-bar__area"
				style={ {
					background: attributes.backgroundColor,
					borderRadius: `${ attributes.borderRadius }px`,
					height: `${ attributes.height }px`
				} }
			>
				{ ( 'default' === attributes.titleStyle || 'simple' === attributes.titleStyle ) && (
					<div
						className={ classnames(
							'wp-block-themeisle-blocks-progress-bar__area__title',
							{ 'transparent': 'simple' === attributes.titleStyle }
						) }
						style={ {
							fontSize: `${ attributes.height * fontRatio }px`,
							background: attributes.barBackgroundColor,
							height: `${ attributes.height }px`,
							borderRadius: `${ attributes.borderRadius }px`
						} }
					>
						<span
							style={ {
								height: `${ attributes.height }px`,
								borderRadius: `${ attributes.borderRadius }px 0px 0px ${ attributes.borderRadius }px`
							} }
						>
							{ attributes.title }
						</span>
					</div>
				) }

				<div
					className="wp-block-themeisle-blocks-progress-bar__area__bar"
					style={ {
						background: attributes.barBackgroundColor,
						borderRadius: `${ attributes.borderRadius }px`,
						height: `${ attributes.height }px`
					} }
				>
					{ 'tooltip' === attributes.percentagePosition && (
						<span className="wp-block-themeisle-blocks-progress-bar__area__tooltip">
							<span className="wp-block-themeisle-blocks-progress-bar__number">
								{ attributes.percentage }
							</span>
							 <span className="wp-block-themeisle-blocks-progress-bar__area__arrow"></span>
						</span>
					)}
				</div>

				{ 'inline' === attributes.percentagePosition && (
					<div
						className="wp-block-themeisle-blocks-progress-bar__progress wp-block-themeisle-blocks-progress-bar__number"
						style={ {
							fontSize: `${ attributes.height * fontRatio }px`,
							height: `${ attributes.height }px`
						} }
					>
						{ attributes.percentage }
					</div>
				) }
			</div>
		</div>
	);
};

export default Save;
