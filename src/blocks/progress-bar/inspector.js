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

const { Fragment } = wp.element;


const Inspector = ({
	attributes,
	setAttributes,
	onHeightChange,
	heightMode,
	setHeightMode
}) => {

	const onTitleChange = value => {
		setAttributes({ title: value});
	};

	const onPercentageChange = value => {
		setAttributes({ percentage: value});
	};

	const onBorderRadiusChange = value => {
		setAttributes({ borderRadius: value});
	};

	const selectTitleStyle = value => {
		setAttributes({ titleStyle: value});
	};

	const selectPercentagePosition = value => {
		if ( heightMode.isAutomatic ) {
			heightMode.percentagePosition = value;
			setHeightMode({
				...heightMode
			});
		}

		setAttributes({ percentagePosition: value});
	};

	const onBackgroundColorChange = value => {
		setAttributes({ backgroundColor: value});
	};

	const onBarBackgroundColorChange = value => {
		setAttributes({ barBackgroundColor: value});
	};

	const onDurationChange = value => {
		setAttributes({ duration: value });
	};

	return (
		<InspectorControls>
			<Fragment>
				<PanelBody
					title={ __( 'Settings' ) }
					initialOpen={ true }
				>
					<TextControl
						label="Title"
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

					{
						( 35 <= attributes.height ) && (
							<SelectControl
								label="Title Style"
								value={ attributes.titleStyle }
								options={ [
									{ label: 'Default', value: 'default' },
									{ label: 'Simple', value: 'simple' },
									{ label: 'Outer', value: 'outer' }
								] }
								onChange={ selectTitleStyle }
							/>
						)
					}

					<SelectControl
						label="Show Percentage"
						value={ attributes.percentagePosition }
						options={ [
							{ label: 'Inline', value: 'inline' },
							{ label: 'Tooltip', value: 'tooltip' },
							{ label: 'Outer', value: 'outer' },
							{ label: 'Hide', value: 'hide' }
						] }
						onChange={ selectPercentagePosition }
					/>
		   		</PanelBody>

				<PanelBody
					title={ __( 'Style' ) }
				>
					<RangeControl
						label={ __( 'Height' ) }
						help={ __( 'The height of the progress bar.' ) }
						value={ attributes.height }
						onChange={ onHeightChange }
						min={ 10 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Border Radius' ) }
						help={ __( 'Round the corners of the progress bar.' ) }
						value={ attributes.borderRadius }
						onChange={ onBorderRadiusChange }
						min={ 0 }
						max={ 35 }
					/>

					<ColorGradientControl
						label={ 'Progress Color' }
						colorValue={ attributes.barBackgroundColor }
						onColorChange={ onBarBackgroundColorChange }
					/>

					<ColorGradientControl
						label={ 'Background Color' }
						colorValue={ attributes.backgroundColor }
						onColorChange={ onBackgroundColorChange }
					/>
				</PanelBody>
			</Fragment>
	   </InspectorControls>
	);
};

export default Inspector;
