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

	const changeTabsTitleColor = value => {
		setAttributes({ tabsTitleColor: value });
	};

	const changeTabsBorderColor = value => {
		setAttributes({ tabsBorderColor: value });
	};

	const onTabsBorderRadiusChange = value => {
		setAttributes({ tabsBorderRadius: value });
	};

	const onTabsTitleFontSizeChange = value => {
		setAttributes({ tabsTitleFontSize: value});
	};

	const onTabsBorderSizeChange = value => {
		setAttributes({ tabsBorderSize: value});
	};

	const onTabsGapChange = value => {
		setAttributes({ tabsGap: value });
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
					value={ attributes.tabsTitleFontSize }
					onChange={ onTabsTitleFontSizeChange }
					min={ 0 }
					max={ 60 }
					initialPosition={ 20 }
				/>

				<RangeControl
					label={ __( 'Border Size' ) }
					help={ __( 'The size of the border.' ) }
					value={ attributes.tabsBorderSize }
					onChange={ onTabsBorderSizeChange }
					min={ 0 }
					max={ 60 }
					initialPosition={ 2 }
				/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					help={ __( 'The size of the border radius.' ) }
					value={ attributes.tabsBorderRadius }
					onChange={ onTabsBorderRadiusChange }
					min={ 0 }
					max={ 60 }
					initialPosition={ 0 }
				/>

				<RangeControl
					label={ __( 'Tabs Gap' ) }
					help={ __( 'The size of the gap between tabs.' ) }
					value={ attributes.tabsGap }
					onChange={ onTabsGapChange }
					min={ 0 }
					max={ 60 }
					initialPosition={ 5 }
				/>

				<ColorGradientControl
					label={ __( 'Title Color' ) }
					colorValue={ attributes.tabsTitleColor }
					onColorChange={ changeTabsTitleColor }
				/>

				<ColorGradientControl
					label={ __( 'Border Color' ) }
					colorValue={ attributes.tabsBorderColor }
					onColorChange={ changeTabsBorderColor }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
