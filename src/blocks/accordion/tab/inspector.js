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
	RangeControl
} = wp.components;


const Inspector = ({
	attributes,
	setAttributes
}) => {

	const changeTitleColor = value => {
		setAttributes({ titleColor: value });
	};

	const changeTitleBackgroundColor = value => {
		setAttributes({ titleBackgroundColor: value });
	};

	const changeContentColor = value => {
		setAttributes({ contentColor: value });
	};

	const changeContentBackgroundColor = value => {
		setAttributes({ contentBackgroundColor: value });
	};

	const onTitleFontSizeChange = value => {
		setAttributes({ titleFontSize: value});
	};


	const onContentFontSizeChange = value => {
		setAttributes({ contentFontSize: value});
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Style' )}
				initialOpen={ true }
			>
				<RangeControl
					label={ __( 'Title Font Size' ) }
					help={ __( 'The font size of the title.' ) }
					value={ attributes.titleFontSize }
					onChange={ onTitleFontSizeChange }
					min={ 0 }
					max={ 60 }
				/>

				<RangeControl
					label={ __( 'Content Font Size' ) }
					help={ __( 'The font size of the content.' ) }
					value={ attributes.contentFontSize }
					onChange={ onContentFontSizeChange }
					min={ 0 }
					max={ 60 }
					initialValue={ 18 }
				/>

				<ColorGradientControl
					label={ __( 'Title Color' ) }
					colorValue={ attributes.titleColor }
					onColorChange={ changeTitleColor }
				/>

				<ColorGradientControl
					label={ __( 'Content Color' ) }
					colorValue={ attributes.contentColor }
					onColorChange={ changeContentColor }
				/>

				<ColorGradientControl
					label={ __( 'Title Background Color' ) }
					colorValue={ attributes.titleBackgroundColor }
					onColorChange={ changeTitleBackgroundColor }
				/>

				<ColorGradientControl
					label={ __( 'Content Background Color' ) }
					colorValue={ attributes.contentBackgroundColor }
					onColorChange={ changeContentBackgroundColor }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
