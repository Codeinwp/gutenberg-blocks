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
	SelectControl,
	TextControl
} = wp.components;

const { clamp } = lodash;

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const onTitleChange = value => {
		setAttributes({ title: value });
	};

	const onPercentageChange = value => {
		if ( value === undefined ) {
			return ;
		}
		value = clamp( value, 0, 100 );
		setAttributes({ percentage: value });
	};

	const onHeightChange = value => {
		setAttributes({ height: value });
	};

	const selectTitleStyle = value => {
		setAttributes({ titleStyle: value });
	};

	const onStrokeWidthChange = value => {
		setAttributes({ strokeWidth: value });
	};

	const onBackgroundColorChange = value => {
		setAttributes({ backgroundColor: value });
	};

	const onProgressColorChange = value => {
		setAttributes({ progressColor: value });
	};

	const onDurationChange = value => {
		if ( value === undefined ) {
			return ;
		}
		value = clamp( value, 0, 3 );
		setAttributes({ duration: value });
	};

	const onTitleColorChange = value => {
		setAttributes({ titleColor: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'Title' ) }
					value={ attributes.title }
					onChange={ onTitleChange }
				/>

				<RangeControl
					label={ __( 'Percentage' ) }
					help={ __( 'The value of the progress bar.' ) }
					value={ attributes.percentage }
					onChange={ onPercentageChange }
					min={ 0 }
					max={ 100 }
				/>

				<RangeControl
					label={ __( 'Duration' ) }
					help={ __( 'The duration of the animation.' ) }
					value={ attributes.duration }
					onChange={ onDurationChange }
					min={ 0 }
					max={ 3 }
					step={ 0.1 }
				/>

				{ 30 <= attributes.height && (
					<SelectControl
						label={ __( 'Title Style' ) }
						value={ attributes.titleStyle }
						options={ [
							{ label: __( 'Default' ), value: 'default' },
							{ label: __( 'Hide' ), value: 'hide' }
						] }
						onChange={ selectTitleStyle }
					/>
				) }
		   		</PanelBody>

			<PanelBody
				title={ __( 'Style' ) }
			>
				<RangeControl
					label={ __( 'Height' ) }
					help={ __( 'The height of the progress bar.' ) }
					value={ attributes.height }
					onChange={ onHeightChange }
					min={ 0 }
					max={ 240 }
				/>

				<RangeControl
					label={ __( 'Circle Thickness' ) }
					help={ __( 'Change the thickness (stroke width) of the circle in the progress bar.' ) }
					value={ attributes.strokeWidth }
					onChange={ onStrokeWidthChange }
					initialPosition={ 10 }
					min={ 0 }
					max={ 20 }
				/>

				<ColorGradientControl
					label={ __( 'Progress Color' ) }
					colorValue={ attributes.progressColor }
					onColorChange={ onProgressColorChange }
				/>

				<ColorGradientControl
					label={ __( 'Title Color' ) }
					colorValue={ attributes.titleColor }
					onColorChange={ onTitleColorChange }
				/>

				<ColorGradientControl
					label={ __( 'Background Color' ) }
					colorValue={ attributes.backgroundColor }
					onColorChange={ onBackgroundColorChange }
				/>
			</PanelBody>
	   </InspectorControls>
	);
};

export default Inspector;
