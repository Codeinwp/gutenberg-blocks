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
	SelectControl
} = wp.components;

const { clamp } = lodash;

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const onPercentageChange = value => {
		if ( value === undefined ) {
			return ;
		}
		value = clamp( value, 0, 100 );
		setAttributes({ percentage: value });
	};

	const onHeightChange = value => {
		const innerTextFontSizeRatio = attributes.fontSize / attributes.height;
		setAttributes({ height: value, fontSize: value * innerTextFontSizeRatio });
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

	const onFontSizeChange = value => {
		setAttributes({ fontSize: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<RangeControl
					label={ __( 'Percentage' ) }
					help={ __( 'The value of the circular progress bar.' ) }
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

				<SelectControl
					label={ __( 'Title Style' ) }
					value={ attributes.titleStyle }
					options={ [
						{ label: __( 'Default' ), value: 'default' },
						{ label: __( 'Hide' ), value: 'hide' }
					] }
					onChange={ selectTitleStyle }
				/>

		   		</PanelBody>

			<PanelBody
				title={ __( 'Style' ) }
			>
				<RangeControl
					label={ __( 'Height' ) }
					help={ __( 'The height of the circular progress bar.' ) }
					value={ attributes.height }
					onChange={ onHeightChange }
					min={ 0 }
					max={ 240 }
				/>

				<RangeControl
					label={ __( 'Circle Thickness' ) }
					help={ __( 'Change the thickness (stroke width) of the circle.' ) }
					value={ attributes.strokeWidth }
					onChange={ onStrokeWidthChange }
					initialPosition={ 10 }
					min={ 0 }
					max={ 20 }
				/>

				<RangeControl
					label={ __( 'Font Size' ) }
					help={ __( 'Change the font size of the inner text.' ) }
					value={ attributes.fontSize }
					onChange={ onFontSizeChange }
					initialPosition={ 40 }
					min={ 0 }
					max={ Math.round( attributes.height  * 0.375 ) }
				/>

				{
					( 'hide' !== attributes.titleStyle ) && (
						<ColorGradientControl
							label={ __( 'Title Color' ) }
							colorValue={ attributes.titleColor }
							onColorChange={ onTitleColorChange }
						/>
					)
				}


				<ColorGradientControl
					label={ __( 'Progress Color' ) }
					colorValue={ attributes.progressColor }
					onColorChange={ onProgressColorChange }
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