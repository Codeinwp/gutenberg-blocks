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
	CheckboxControl
} = wp.components;


const Inspector = ({
	attributes,
	setAttributes
}) => {

	const changeTabsTitleColor = value => {
		setAttributes({ tabsTitleColor: value });
	};

	const changeTabsContentColor = value => {
		setAttributes({ tabsContentColor: value });
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

	const onTabsContentFontSizeChange = value => {
		setAttributes({ tabsContentFontSize: value});
	};

	const onTabsBorderSizeChange = value => {
		setAttributes({ tabsBorderSize: value});
	};

	const onTabsGapChange = value => {
		setAttributes({ tabsGap: value });
	};

	const selectIconStyle = value => {
		setAttributes({ iconStyle: value });
	};

	const checkShadows = value => {
		setAttributes({ hasShadows: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' )}
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Icons Style' ) }
					value={ attributes.iconStyle }
					options={ [
						{ label: __( 'Default' ), value: 'default' },
						{ label: __( 'Start' ), value: 'start' },
						{ label: __( 'Hide' ), value: 'hide' }
					] }
					onChange={ selectIconStyle }
				/>

				<CheckboxControl
					label={ __( 'Add shadow' ) }
					checked={ attributes.hasShadows }
					onChange={ checkShadows }
				/>

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
					label={ __( 'Content Font Size' ) }
					help={ __( 'The font size of the content.' ) }
					value={ attributes.tabsContentFontSize }
					onChange={ onTabsContentFontSizeChange }
					min={ 0 }
					max={ attributes.tabsTitleFontSize }
					initialPosition={ 16 }
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
					label={ __( 'Content Color' ) }
					colorValue={ attributes.tabsContentColor }
					onColorChange={ changeTabsContentColor }
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
