import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	DateTimePicker
} from '@wordpress/components';
import {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';


const Inspector = ({
	attributes,
	setAttributes
}) => {


	const excludeComponent = ( value, componentName ) => {
		if ( value ) {
			setAttributes({
				exclude: attributes?.exclude?.filter( name => name !== componentName )
			});
		} else {
			setAttributes({
				exclude: attributes?.exclude ? [ ...attributes?.exclude, componentName ] : [ componentName ]
			});
		}
	};

	const onBackgroundColorChange = value => {
		setAttributes({ backgroundColor: value});
	};

	const onLabelColorChange = value => {
		setAttributes({ labelColor: value});
	};

	const onValueColorChange = value => {
		setAttributes({ valueColor: value});
	};

	const onGapChange = value => {
		setAttributes({ gap: Number( value )});
	};

	const onWidthChange = value => {
		setAttributes({ width: Number( value )});
	};

	const onHeightChange = value => {
		setAttributes({ height: Number( value )});
	};

	const onBorderRadiusChange = value => {
		setAttributes({ borderRadius: Number( value ) });
	};

	const onValueFontSizeChange = value => {
		setAttributes({ valueFontSize: Number( value ) });
	};

	const onLabelFontSizeChange = value => {
		setAttributes({ labelFontSize: Number( value ) });
	};

	const onBorderWidthChange = value => {
		setAttributes({ borderWidth: Number( value ) });
	};

	const onBorderColorChange = value => {
		setAttributes({ borderColor: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Time', 'otter-blocks' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( '12 Hours Format', 'otter-blocks' ) }
					checked={ attributes?.is12Hour }
					onChange={ value =>  setAttributes({ is12Hour: value})}
				/>
				<DateTimePicker
					currentDate={ attributes.date }
					onChange={ date => setAttributes({ date }) }
					is12Hour={ attributes?.is12Hour }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
				initialOpen={ true }
			>

				<ToggleControl
					label={ __( 'Display Days', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'day' ) }
					onChange={ value => excludeComponent( value, 'day' ) }
				/>
				<ToggleControl
					label={ __( 'Display Hours', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'hour' ) }
					onChange={ value => excludeComponent( value, 'hour' ) }
				/>
				<ToggleControl
					label={ __( 'Display Minutes', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'minute' ) }
					onChange={ value => excludeComponent( value, 'minute' ) }
				/>
				<ToggleControl
					label={ __( 'Display Seconds', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'second' ) }
					onChange={ value => excludeComponent( value, 'second' ) }
				/>

				<ToggleControl
					label={ __( 'Display Separators', 'otter-blocks' ) }
					checked={ attributes?.hasSeparators }
					onChange={ hasSeparators => setAttributes({ hasSeparators }) }
				/>

				<RangeControl
					label={ __( 'Box Spacing', 'otter-blocks' ) }
					value={ attributes.gap }
					onChange={ onGapChange }
					min={ 0 }
					max={ 100 }
				/>

				<RangeControl
					label={ __( 'Box Height', 'otter-blocks' ) }
					value={ attributes.height }
					onChange={ onHeightChange }
					min={ 40 }
					max={ 300 }
				/>

				<RangeControl
					label={ __( 'Box Width', 'otter-blocks' ) }
					value={ attributes.width }
					onChange={ onWidthChange }
					min={ 40 }
					max={ 300 }
				/>

				<RangeControl
					label={ __( 'Border Radius', 'otter-blocks' ) }
					value={ attributes.borderRadius }
					onChange={ onBorderRadiusChange }
					min={ 0 }
					max={ 15 }
				/>

				<RangeControl
					label={ __( 'Border Width', 'otter-blocks' ) }
					value={ attributes.borderWidth }
					onChange={ onBorderWidthChange }
					min={ 0 }
					max={ 50 }
				/>

				<RangeControl
					label={ __( 'Value Font Size', 'otter-blocks' ) }
					value={ attributes.valueFontSize }
					onChange={ onValueFontSizeChange }
					min={ 0 }
					max={ 64 }
				/>

				<RangeControl
					label={ __( 'Label Font Size', 'otter-blocks' ) }
					value={ attributes.labelFontSize }
					onChange={ onLabelFontSizeChange }
					min={ 0 }
					max={ 64 }
				/>

			</PanelBody>

			<PanelColorSettings
				title={ __( 'Color', 'otter-blocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.backgroundColor,
						onChange: onBackgroundColorChange,
						label: __( 'Background', 'otter-blocks' )
					},
					{
						value: attributes.labelColor,
						onChange: onLabelColorChange,
						label: __( 'Label', 'otter-blocks' )
					},
					{
						value: attributes.valueColor,
						onChange: onValueColorChange,
						label: __( 'Value', 'otter-blocks' )
					},
					{
						value: attributes.borderColor,
						onChange: onBorderColorChange,
						label: __( 'Border', 'otter-blocks' )
					}
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: attributes.backgroundColor,
						backgroundColor: attributes.valueColor
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
