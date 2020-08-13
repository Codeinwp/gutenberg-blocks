
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
	ToggleControl
} = wp.components;

const Inspector = ({ attributes, setAttributes }) => {

	const onValueChange = value => {
		setAttributes({ value: value });
	};

	const onProgressColorChange = value => {
		setAttributes({ progressColor: value });
	};

	const onBackgroundColorChange = value => {
		setAttributes({ backgroundColor: value });
	};

	const onBorderRadiusChange = value => {
		setAttributes({ borderRadius: value });
	};

	const onHeigthChange = value => {
		setAttributes({ height: value });
	};

	const toggleAnimation = value => {
		setAttributes({ animated: value });
	};

	const toggleHideValue = value => {
		setAttributes({ hideValue: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Animated' ) }
					help={ __( 'Show animation.' ) }
					checked={ attributes.animated }
					onChange={ toggleAnimation }
				/>

				<ToggleControl
					label={ __( 'Hide Percentage' ) }
					help={ __( 'Hide the value of the percentage.' ) }
					checked={ attributes.hideValue }
					onChange={ toggleHideValue }
				/>

				<RangeControl
					label={ __( 'Value' ) }
					value={ attributes.value }
					onChange={ onValueChange }
					min={ 0 }
					max={ 100 }
				/>

				<ColorGradientControl
					label={ 'Progress Color' }
					colorValue={ attributes.progressColor }
					onColorChange={ onProgressColorChange }
				/>

				<ColorGradientControl
					label={ 'Background Color' }
					colorValue={ attributes.backgroundColor }
					onColorChange={ onBackgroundColorChange }
				/>

				<RangeControl
					label={ __( 'Height' ) }
					value={ attributes.height }
					onChange={ onHeigthChange }
					min={ 5 }
					max={ 20 }
				/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					value={ attributes.borderRadius }
					onChange={ onBorderRadiusChange }
					min={ 0 }
					max={ 20 }
				/>

			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
