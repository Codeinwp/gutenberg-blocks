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
	setAttributes,
	onHeightChange,
	heightMode,
	setHeightMode
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

	const onBorderRadiusChange = value => {
		setAttributes({ borderRadius: value });
	};

	const selectTitleStyle = value => {
		setAttributes({ titleStyle: value });
	};

	const selectPercentagePosition = value => {
		if ( heightMode.isAutomatic ) {
			heightMode.percentagePosition = value;
			setHeightMode({
				...heightMode
			});
		}

		setAttributes({ percentagePosition: value });
	};

	const onBackgroundColorChange = value => {
		setAttributes({ backgroundColor: value });
	};

	const onBarBackgroundColorChange = value => {
		setAttributes({ barBackgroundColor: value });
	};

	const onDurationChange = value => {
		if ( value === undefined ) {
			return ;
		}
		value = clamp( value, 0, 3 );
		setAttributes({ duration: value });
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
							{ label: __( 'Highlight' ), value: 'highlight' },
							{ label: __( 'Outer' ), value: 'outer' }
						] }
						onChange={ selectTitleStyle }
					/>
				) }

				<SelectControl
					label={ __( 'Show Percentage' ) }
					value={ attributes.percentagePosition }
					options={ [
						{ label: __( 'Default' ), value: 'default' },
						{ label: __( 'Append' ), value: 'append' },
						{ label: __( 'Tooltip' ), value: 'tooltip' },
						{ label: __( 'Outer' ), value: 'outer' },
						{ label: __( 'Hide' ), value: 'hide' }
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
					initialPosition={ 5 }
					min={ 0 }
					max={ 35 }
				/>

				<ColorGradientControl
					label={ __( 'Progress Color' ) }
					colorValue={ attributes.barBackgroundColor }
					onColorChange={ onBarBackgroundColorChange }
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
