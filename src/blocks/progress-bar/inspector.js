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
	SelectControl,
	TextControl
} = wp.components;

const { Fragment } = wp.element;


const Inspector = ({ attributes, setAttributes }) => {

	const onTitleChange = value => {
		setAttributes({ title: value});
	};

	const onPercentageChange = value => {
		setAttributes({ percentage: value});
	};

	const onBorderRadiusChange = value => {
		setAttributes({ borderRadius: value});
	};

	const toggleHighlightTitle = value => {
		setAttributes({ highlightTitle: value});
	};

	const selectTitlePosition = value => {
		setAttributes({ titlePosition: value});
	};

	const selectPercentagePosition = value => {
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

					<ToggleControl
						label={ __( 'Highligth Title' ) }
						help={ __( 'Make the title to stand out.' ) }
						checked={ attributes.highlightTitle }
						onChange={ toggleHighlightTitle }
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
						label="Title Position"
						value={ attributes.titlePosition }
						options={ [
							{ label: 'Inline', value: 'inline' },
							{ label: 'Outer', value: 'outer' }
						] }
						onChange={ selectTitlePosition }
					/>

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
