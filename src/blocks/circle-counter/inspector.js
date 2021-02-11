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
	setAttributes,
	onHeightChange
}) => {

	const onPercentageChange = value => {
		if ( value === undefined ) {
			return ;
		}
		value = clamp( value, 0, 100 );
		setAttributes({ percentage: value });
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

	const onFontSizePercentChange = value => {
		setAttributes({ fontSizePercent: value });
	};

	const onFontSizeTitleChange = value => {
		setAttributes({ fontSizeTitle: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<RangeControl
					label={ __( 'Percentage' ) }
					help={ __( 'The value of the counter.' ) }
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
						{ label: __( 'Hide' ), value: 'hide' },
						{ label: __( 'Bottom' ), value: 'bottom' }
					] }
					onChange={ selectTitleStyle }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Style' ) }
			>
				<RangeControl
					label={ __( 'Height' ) }
					help={ __( 'The height of the circle counter.' ) }
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
					label={ __( 'Font Size Title' ) }
					help={ __( 'Change the font size of the title.' ) }
					value={ attributes.fontSizeTitle }
					onChange={ onFontSizeTitleChange }
					initialPosition={ 37 }
					min={ 0 }
					max={ Math.round( attributes.height  * 0.60 ) }
				/>

				<RangeControl
					label={ __( 'Font Size Percent' ) }
					help={ __( 'Change the font size of the inner text.' ) }
					value={ attributes.fontSizePercent }
					onChange={ onFontSizePercentChange }
					initialPosition={ 27 }
					min={ 0 }
					max={ Math.round( attributes.height  * 0.27 ) }
				/>

				{ ( 'hide' !== attributes.titleStyle ) && (
					<ColorGradientControl
						label={ __( 'Title Color' ) }
						colorValue={ attributes.titleColor }
						onColorChange={ onTitleColorChange }
					/>
				) }

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
