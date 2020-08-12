
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

	const setValue = value => {
		setAttributes({ value: value });
	};

	const setProgressColor = value => {
		setAttributes({ progressColor: value });
	};

	const setBackgroundColor = value => {
		setAttributes({ backgroundColor: value });
	};

	const setBorderRadius = value => {
		setAttributes({ borderRadius: value });

	};

	const setHeight = value => {
		setAttributes({ height: value });
	};

	const setAnimated = value => {
		setAttributes({ animated: value });
	};

	const setHideValue = value => {
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
					onChange={ setAnimated }
				/>

				<ToggleControl
					label={ __( 'Hide Percentage' ) }
					help={ __( 'Hide the value of the percentage.' ) }
					checked={ attributes.hideValue }
					onChange={ setHideValue }
				/>

				<RangeControl
					label={ __( 'Value' ) }
					value={ attributes.value }
					onChange={ setValue }
					min={ 0 }
					max={ 100 }
				/>

				<ColorGradientControl
					label={ 'Progress Color' }
					colorValue={ attributes.progressColor }
					onColorChange={ setProgressColor }
				/>

				<ColorGradientControl
					label={ 'Background Color' }
					colorValue={ attributes.backgroundColor }
					onColorChange={ setBackgroundColor }
				/>

				<RangeControl
					label={ __( 'Height' ) }
					value={ attributes.height }
					onChange={ setHeight }
					min={ 5 }
					max={ 20 }
				/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					value={ attributes.borderRadius }
					onChange={ setBorderRadius }
					min={ 0 }
					max={ 20 }
				/>

			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
