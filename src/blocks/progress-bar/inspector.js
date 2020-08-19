
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl
} = wp.components;

const { Fragment } = wp.element;

import { BarType } from './edit.js';

const Inspector = ({ attributes, setAttributes }) => {

	const onTypeChange = value => {
		setAttributes({ type: value});
	};

	const onPercentageChange = value => {
		setAttributes({ percentage: value });
	};

	const onProgressColorChange = value => {
		setAttributes({ progressColor: value });
	};

	const onTrailColorChange = value => {
		setAttributes({ trailColor: value });
	};

	const onStrokeWidthChange = value => {
		setAttributes({ strokeWidth: value });
	};

	const onTrailStrokeWidthChange = value => {
		setAttributes({ trailWidth: value });
	};

	const toggleAnimation = value => {
		setAttributes({ animated: value });
	};

	const toggleHideValue = value => {
		setAttributes({ hideValue: value });
	};

	const onDurationChange = value => {
		setAttributes({ duration: value });
	};

	const onAnimationChange = value => {
		setAttributes({ easing: value });
	};

	const toggleColoredProgress = value => {
		setAttributes({ coloredProgress: value });
	};

	const onStartColorChange = value => {
		setAttributes({ startColor: value });
	};

	const onEndColorChange = value => {
		setAttributes({ endColor: value });
	};

	const toggleStrokeAnimaton = value => {
		setAttributes({ strokeAnimation: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<SelectControl
					label="Bar Type"
					value={ attributes.type}
					options={ [
						{ label: 'Bar', value: BarType.BAR },
						{ label: 'Circle', value: BarType.CIRCLE },
						{ label: 'Semicircle', value: BarType.SEMICIRCLE }
					] }
					onChange={ onTypeChange }
				/>


				<ToggleControl
					label={ __( 'Hide Percentage' ) }
					help={ __( 'Hide the value of the percentage.' ) }
					checked={ attributes.hideValue }
					onChange={ toggleHideValue }
				/>

				<RangeControl
					label={ __( 'Percentage' ) }
					value={ attributes.percentage }
					onChange={ onPercentageChange }
					min={ 0 }
					max={ 100 }
				/>


				<ColorGradientControl
					label={ 'Progress Color' }
					colorValue={ attributes.progressColor }
					onColorChange={ onProgressColorChange }
				/>

				{ attributes.type !== BarType.BAR && (
					<RangeControl
						label={ __( 'Stroke Width' ) }
						value={ attributes.strokeWidth }
						onChange={ onStrokeWidthChange }
						min={ 0 }
						step={ 0.1 }
						max={ 5 }
					/>
				)}

				<ColorGradientControl
					label={ 'Trail Color' }
					colorValue={ attributes.backgroundColor }
					onColorChange={ onTrailColorChange }
				/>

				<RangeControl
					label={ __( 'Trail Stroke Width' ) }
					value={ attributes.trailWidth}
					onChange={ onTrailStrokeWidthChange }
					min={ 0 }
					step={ 0.1 }
					max={ attributes.strokeWidth }
				/>

				<ToggleControl
					label={ __( 'Animated' ) }
					help={ __( 'Show animation.' ) }
					checked={ attributes.animated }
					onChange={ toggleAnimation }
				/>
				{ attributes.animated && (

					<Fragment>
						<RangeControl
							label={ __( 'Duration' ) }
							value={ attributes.duration }
							onChange={ onDurationChange }
							min={ 0.5 }
							step={ 0.1 }
							max={ 5 }
						/>

						<SelectControl
							label="Animation"
							value={ attributes.easing }
							options={ [
								{ label: 'Linear', value: 'linear' },
								{ label: 'Ease In', value: 'easeIn' },
								{ label: 'Ease In Quad', value: 'easeInQuad' },
								{ label: 'Ease In Cubic', value: 'easeInCubic' },
								{ label: 'Ease Out', value: 'easeOut' },
								{ label: 'Ease Out Quad', value: 'easeOutQuad' },
								{ label: 'Ease Out Cubic', value: 'easeOutCubic' },
								{ label: 'Ease In Out', value: 'easeInOut' },
								{ label: 'Ease Out', value: 'easeOut' },
								{ label: 'Ease Out', value: 'easeOut' }

							] }
							onChange={ onAnimationChange }
						/>

						<ToggleControl
							label={ __( 'Animated Progress' ) }
							help={ __( 'Show animation on the progress bar.' ) }
							checked={ attributes.coloredProgress }
							onChange={ toggleColoredProgress }
						/>

						{ attributes.coloredProgress && (
							<Fragment>
								<ColorGradientControl
									label={ 'Start Color' }
									colorValue={ attributes.startColor }
									onColorChange={ onStartColorChange }
								/>

								<ColorGradientControl
									label={ 'End Color' }
									colorValue={ attributes.endColor }
									onColorChange={ onEndColorChange }
								/>
							</Fragment>
						)}

						<ToggleControl
							label={ __( 'Animated Stroke' ) }
							help={ __( 'Show stroke animation on the progress bar.' ) }
							checked={ attributes.strokeAnimation }
							onChange={ toggleStrokeAnimaton }
						/>
					</Fragment>
				)}

			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
