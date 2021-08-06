/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder
} = wp.blockEditor;

const {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl
} = wp.components;

const { useState } = wp.element;


const Inspector = ({
	attributes,
	setAttributes
}) => {

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
			>
				<TextControl
					label={ __( 'Title' ) }
					type="text"
					placeholder={ __( 'Name of your product…' ) }
					value={ attributes.title }
					onChange={ title => setAttributes({ title }) }
				/>

				<RangeControl
					label={ __( 'Number' ) }
					value={ attributes.number }
					onChange={ value => setAttributes({ number: Number( value )}) }
					min={ 1 }
					max={ 10 }
				/>

				<ToggleControl
					label={ 'Switch' }
					checked={ attributes.toggle }
					onChange={ toggle => setAttributes({ toggle }) }
				/>

				<SelectControl
					label={ __( 'Options' ) }
					value={ attributes.select }
					options={ [
						{ label: __( 'Option 1' ), value: 'option-1' },
						{ label: __( 'Option 2' ), value: 'option-2' }
					] }
					onChange={ select => setAttributes({ select }) }
				/>
			</PanelBody>


			<PanelColorSettings
				title={ __( 'Color' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.backgroundColor,
						onChange: value => setAttributes({ backgroundColor: value }),
						label: __( 'Background' )
					},
					{
						value: attributes.textColor,
						onChange: value => setAttributes({ textColor: value }),
						label: __( 'Text' )
					}
				] }
			>

				<ContrastChecker
					{ ...{
						textColor: attributes.textColor,
						backgroundColor: attributes.backgroundColor
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
